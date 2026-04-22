import { NextRequest, NextResponse } from "next/server";
import {
  orderFromWebhookPayload,
  verifyWebhookSignature,
} from "@/lib/shopify-admin/orders";

export async function POST(request: NextRequest) {
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
  const rawBody = await request.text();

  if (!verifyWebhookSignature(rawBody, hmacHeader)) {
    return NextResponse.json({ error: "Firma de webhook inválida" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const order = orderFromWebhookPayload(payload);
  if (!order) {
    return NextResponse.json({ error: "Webhook sin datos de pedido" }, { status: 422 });
  }

  // Punto de integración de observabilidad o forward a tu herramienta de analítica.
  console.info("[orders-paid webhook]", order);
  return NextResponse.json({ ok: true });
}
