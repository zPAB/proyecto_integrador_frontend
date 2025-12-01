
"use client";

import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "@/stores/useProductStore";
import ProductCard from "@/features/products/ProductCard";
import ProductModal from "@/features/products/ProductModal";

export default function ProductsPage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [fetchProducts, products.length]);

  const filtered = useMemo(() => {
    return products; // Aquí puedes mantener tu lógica de filtros si la necesitas
  }, [products]);

  return (
    <main className="text-white w-full mt-1">
      {/* Aquí mantienes tu buscador y filtros */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onView={() => setSelectedProductId(item.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedProductId && (
        <ProductModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </main>
  );
}
