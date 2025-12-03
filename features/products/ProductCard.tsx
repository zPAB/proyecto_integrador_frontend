"use client";

import { Product } from "@/types/product";

export default function ProductCard({
  product,
  onView,
}: {
  product: Product;
  onView?: () => void;
}) {
  // Resolver imagen (URL completa o nombre de archivo)
  const resolveImageSrc = () => {
    const imgName = product.img || product.image || "";
    if (imgName.startsWith("http")) {
      return imgName;
    }
    return `/images/${imgName}`;
  };

  return (
    <div className="bg-zinc-900 text-white rounded-lg overflow-hidden border border-zinc-800 hover:border-red-600 transition-colors">
      {/* Imagen */}
      <div className="relative">
        <img
          src={resolveImageSrc()}
          alt={product.name}
          className="w-full h-[500px] object-contain bg-white"
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-red-600 font-bold mb-4">${product.price.toLocaleString()}</p>

        {/* Botón Ver Producto */}
        <button
          onClick={onView}
          className="w-full text-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition-colors cursor-pointer"
        >
          Ver producto
        </button>
      </div>
    </div>
  );
}
