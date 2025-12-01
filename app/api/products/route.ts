// src/app/api/products/route.ts
import { NextResponse } from "next/server";

const API_URL = "https://692b3daf7615a15ff24f1bd4.mockapi.io/products";

export async function GET() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error proxying to MockAPI" }, { status: 500 });
  }
}
