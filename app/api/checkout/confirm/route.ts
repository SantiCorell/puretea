import { NextRequest, NextResponse } from "next/server";
import { getOrderSummaryById, isAdminOrderApiConfigured } from "@/lib/shopify-admin/orders";

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("order_id")?.trim();

  if (!orderId) {
    return NextResponse.json({ error: "order_id es obligatorio" }, { status: 400 });
  }

  if (!isAdminOrderApiConfigured()) {
    return NextResponse.json(
      {
        error: "Admin API no configurada para confirmar el pedido",
      },
      { status: 503 }
    );
  }

  const summary = await getOrderSummaryById(orderId);
  if (!summary) {
    return NextResponse.json({ error: "No se pudo confirmar el pedido" }, { status: 404 });
  }

  return NextResponse.json({ order: summary });
}
