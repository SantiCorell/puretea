import { createHmac, timingSafeEqual } from "node:crypto";

const domain =
  process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || "";
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-01";
const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET || "";

interface AdminOrderLineItem {
  quantity: number;
}

interface AdminOrder {
  id: number;
  order_number: number;
  total_price: string;
  currency: string;
  line_items: AdminOrderLineItem[];
}

export interface OrderSummary {
  orderId: string;
  orderNumber: string;
  value: number;
  currency: string;
  numItems: number;
}

export function isAdminOrderApiConfigured(): boolean {
  return Boolean(domain && adminToken);
}

function toSummary(order: AdminOrder): OrderSummary {
  return {
    orderId: String(order.id),
    orderNumber: String(order.order_number),
    value: Number(order.total_price || 0),
    currency: order.currency || "EUR",
    numItems: (order.line_items || []).reduce((sum, item) => sum + (item.quantity || 0), 0),
  };
}

export async function getOrderSummaryById(orderId: string): Promise<OrderSummary | null> {
  if (!isAdminOrderApiConfigured()) return null;

  const url = `https://${domain}/admin/api/${apiVersion}/orders/${encodeURIComponent(
    orderId
  )}.json?fields=id,order_number,total_price,currency,line_items`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": adminToken,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { order?: AdminOrder };
  if (!data.order) return null;
  return toSummary(data.order);
}

export function verifyWebhookSignature(rawBody: string, hmacHeader: string | null): boolean {
  if (!webhookSecret || !hmacHeader) return false;
  const digest = createHmac("sha256", webhookSecret).update(rawBody, "utf8").digest("base64");
  try {
    return timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
  } catch {
    return false;
  }
}

export function orderFromWebhookPayload(payload: unknown): OrderSummary | null {
  if (!payload || typeof payload !== "object") return null;

  const order = payload as {
    id?: number | string;
    order_number?: number | string;
    total_price?: string | number;
    currency?: string;
    line_items?: { quantity?: number }[];
  };

  if (!order.id) return null;
  return {
    orderId: String(order.id),
    orderNumber: String(order.order_number ?? order.id),
    value: Number(order.total_price || 0),
    currency: order.currency || "EUR",
    numItems: (order.line_items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0),
  };
}
