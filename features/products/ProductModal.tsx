
"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
  description: string;
  category: string;
  color: string;
  tipo: string;
}

export default function ProductModal({
  productId,
  onClose,
}: {
  productId: string;
  onClose: () => void;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://692b3daf7615a15ff24f1bd4.mockapi.io/products/${productId}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg max-w-lg w-full text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {loading ? (
          <p>Cargando producto...</p>
        ) : product ? (
          <>
            <img
              src={`/images/${product.img}`}
              alt={product.name}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
            <p className="text-red-600 text-xl font-bold mt-2">
              ${product.price.toLocaleString()}
            </p>
            <p className="mt-4">{product.description}</p>
            <div className="mt-4 text-gray-400">
              <p>Categoría: {product.category}</p>
              <p>Color: {product.color}</p>
              <p>Tipo: {product.tipo}</p>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
                Agregar al carrito
              </button>
            </div>
          </>
        ) : (
          <p>Producto no encontrado</p>
        )}
      </div>
    </div>
  );
}
