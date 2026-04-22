import { test, expect, type Route } from "@playwright/test";

type MockCart = {
  id: string;
  checkoutUrl: string;
  lines: Array<{
    id: string;
    quantity: number;
    merchandiseId: string;
    product: {
      id: string;
      handle: string;
      title: string;
      imageUrl: string | null;
      imageAlt: string | null;
    };
    price: { amount: string; currencyCode: string };
  }>;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
    totalTaxAmount: { amount: string; currencyCode: string } | null;
  };
};

const successUrl =
  "http://127.0.0.1:3100/checkout/success?order_id=987654321&order_number=1009";

function cartFixture(): MockCart {
  return {
    id: "gid://shopify/Cart/mock-cart",
    checkoutUrl: successUrl,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0.00", currencyCode: "EUR" },
      totalAmount: { amount: "0.00", currencyCode: "EUR" },
      totalTaxAmount: null,
    },
  };
}

test("flujo add -> cart -> checkout -> success", async ({ page }) => {
  let cart = cartFixture();

  await page.route("**/api/cart", async (route: Route) => {
    const request = route.request();
    const method = request.method();

    if (method === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ cart }),
      });
      return;
    }

    if (method === "DELETE") {
      cart = cartFixture();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
      return;
    }

    const body = request.postDataJSON() as
      | { action?: string; variantId?: string; quantity?: number; lineId?: string }
      | undefined;

    if (method === "POST" && body?.action === "ensure-checkout") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ cart }),
      });
      return;
    }

    if (method === "POST" && body?.variantId) {
      cart.lines = [
        {
          id: "line-1",
          quantity: body.quantity ?? 1,
          merchandiseId: body.variantId,
          product: {
            id: "prod-1",
            handle: "mock-product",
            title: "Mock Product",
            imageUrl: null,
            imageAlt: null,
          },
          price: { amount: "19.90", currencyCode: "EUR" },
        },
      ];
      cart.cost = {
        subtotalAmount: { amount: "19.90", currencyCode: "EUR" },
        totalAmount: { amount: "19.90", currencyCode: "EUR" },
        totalTaxAmount: null,
      };

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ cart }),
      });
      return;
    }

    if (method === "PATCH" && body?.lineId) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ cart }),
      });
      return;
    }

    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({ error: "Mock no contemplado" }),
    });
  });

  await page.route("**/api/checkout/confirm**", async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        order: {
          orderId: "987654321",
          orderNumber: "1009",
          value: 19.9,
          currency: "EUR",
          numItems: 1,
        },
      }),
    });
  });

  await page.goto("/shop");

  const addButton = page.getByRole("button", { name: /Añadir al carrito|Añadir al Ritual/i }).first();
  await expect(addButton).toBeVisible();
  await addButton.click();

  await expect(page.getByText("Tu Ritual")).toBeVisible();
  await page.getByRole("button", { name: "Finalizar Pedido" }).first().click();

  await expect(page).toHaveURL(/\/checkout\/success/);
  await expect(page.getByText("¡Pedido completado!")).toBeVisible();
  await expect(page.getByText(/Total:/)).toBeVisible();
});
