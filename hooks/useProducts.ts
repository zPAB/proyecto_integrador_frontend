// src/hooks/useProducts.ts
import { useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";

export function useProducts() {
  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [fetchProducts, products.length]);

  return { products, loading };
}
