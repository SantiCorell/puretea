import { shopifyFetch } from "./client";

// Tipos normalizados para el carrito en el frontend

export interface CartMoney {
  amount: string;
  currencyCode: string;
}

export interface CartLineProduct {
  id: string;
  handle: string;
  title: string;
  imageUrl: string | null;
  imageAlt: string | null;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandiseId: string;
  product: CartLineProduct;
  price: CartMoney;
}

export interface CartCost {
  subtotalAmount: CartMoney;
  totalAmount: CartMoney;
  totalTaxAmount: CartMoney | null;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
  cost: CartCost;
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

type CartFragmentResult = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: CartMoney;
    totalAmount: CartMoney;
    totalTaxAmount: CartMoney | null;
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: {
            id: string;
            title: string;
            handle: string;
          };
          image: {
            url: string;
            altText: string | null;
          } | null;
          price: CartMoney;
        };
      };
    }[];
  };
};

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              image { url altText }
              product {
                id
                handle
                title
              }
            }
          }
        }
      }
    }
  }
`;

function normalizeCheckoutUrl(rawUrl: string): string {
  const preferredHost =
    process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN?.trim() || "checkout.puretea.es";

  if (!rawUrl) return rawUrl;

  try {
    const parsed = new URL(rawUrl);
    parsed.host = preferredHost;
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

function normalizeCart(cart: CartFragmentResult): Cart {
  return {
    id: cart.id,
    checkoutUrl: normalizeCheckoutUrl(cart.checkoutUrl),
    cost: {
      subtotalAmount: cart.cost.subtotalAmount,
      totalAmount: cart.cost.totalAmount,
      totalTaxAmount: cart.cost.totalTaxAmount,
    },
    lines: cart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      merchandiseId: node.merchandise.id,
      product: {
        id: node.merchandise.product.id,
        handle: node.merchandise.product.handle,
        title: node.merchandise.product.title,
        imageUrl: node.merchandise.image?.url ?? null,
        imageAlt: node.merchandise.image?.altText ?? null,
      },
      price: node.merchandise.price,
    })),
  };
}

// ——— Queries & mutations ———

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch<{
      cart: CartFragmentResult | null;
    }>(
      `
    ${CART_FRAGMENT}
    query GetCart($id: ID!) {
      cart(id: $id) {
        ...CartFields
      }
    }
  `,
      { id: cartId }
    );
    if (!data.cart) return null;
    return normalizeCart(data.cart);
  } catch {
    // Carrito expirado, ID de otra tienda, o fallo temporal de API
    return null;
  }
}

export async function createCartWithLines(lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: CartFragmentResult | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(
    `
    ${CART_FRAGMENT}
    mutation CreateCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
    { lines }
  );

  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
  }
  if (!data.cartCreate.cart) {
    throw new Error("No se ha podido crear el carrito.");
  }
  return normalizeCart(data.cartCreate.cart);
}

export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  return createCartWithLines([
    {
      quantity,
      merchandiseId: variantId,
    },
  ]);
}

export async function addLinesToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: CartFragmentResult | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(
    `
    ${CART_FRAGMENT}
    mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
    {
      cartId,
      lines: [
        {
          quantity,
          merchandiseId: variantId,
        },
      ],
    }
  );

  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join(", "));
  }
  if (!data.cartLinesAdd.cart) {
    throw new Error("No se ha podido actualizar el carrito.");
  }
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: CartFragmentResult | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(
    `
    ${CART_FRAGMENT}
    mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
    {
      cartId,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    }
  );

  if (data.cartLinesUpdate.userErrors?.length) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join(", "));
  }
  if (!data.cartLinesUpdate.cart) {
    throw new Error("No se ha podido actualizar el carrito.");
  }
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: CartFragmentResult | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(
    `
    ${CART_FRAGMENT}
    mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
    {
      cartId,
      lineIds: [lineId],
    }
  );

  if (data.cartLinesRemove.userErrors?.length) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join(", "));
  }
  if (!data.cartLinesRemove.cart) {
    throw new Error("No se ha podido actualizar el carrito.");
  }
  return normalizeCart(data.cartLinesRemove.cart);
}

