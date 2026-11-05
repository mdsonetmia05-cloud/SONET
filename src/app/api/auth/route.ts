import { auth } from "@/lib/auth/server";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ path: string[] }> };

function notConfigured() {
  return NextResponse.json({ error: "Neon Auth: Not Configured" }, { status: 503 });
}

export async function GET(request: Request, context: RouteContext) {
  const handler = auth?.handler();
  return handler ? handler.GET(request, context) : notConfigured();
}

export async function POST(request: Request, context: RouteContext) {
  const handler = auth?.handler();
  return handler ? handler.POST(request, context) : notConfigured();
}

export async function PUT(request: Request, context: RouteContext) {
  const handler = auth?.handler();
  return handler ? handler.PUT(request, context) : notConfigured();
}

export async function DELETE(request: Request, context: RouteContext) {
  const handler = auth?.handler();
  return handler ? handler.DELETE(request, context) : notConfigured();
}

export async function PATCH(request: Request, context: RouteContext) {
  const handler = auth?.handler();
  return handler ? handler.PATCH(request, context) : notConfigured();
}
