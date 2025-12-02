// src/services/productService.ts
import { Product } from "@/types/product";

const API_URL = "https://692b3daf7615a15ff24f1bd4.mockapi.io/products";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}?limit=20`, { cache: "no-store" });
    if (!res.ok) throw new Error("Error fetching products");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("getProducts error:", err);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Product;
  } catch (err) {
    console.error("getProductById error:", err);
    return null;
  }
}
