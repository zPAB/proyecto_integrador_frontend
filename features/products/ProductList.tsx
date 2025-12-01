
"use client";

import ProductCard from "@/features/products/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import ProductModal from "@/features/products/ProductModal";

export default function ProductList() {
  const { products, loading } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  if (loading) return <p className="text-center py-12">Cargando productos...</p>;

  if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-center py-12 text-gray-400">No hay productos.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onView={() => setSelectedProductId(p.id)}
          />
        ))}
      </div>

      {selectedProductId && (
        <ProductModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </>
  );
}
