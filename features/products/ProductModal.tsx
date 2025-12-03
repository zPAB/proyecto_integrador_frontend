
"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function ProductModal({
  productId,
  onClose,
}: {
  productId: string;
  onClose: () => void;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

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
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={24} />
        </button>

        {loading ? (
          <p>Cargando producto...</p>
        ) : product ? (
          <>
            <img
              src={
                product.img?.startsWith("http")
                  ? product.img
                  : `/images/${product.img}`
              }
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

            {/* ✅ Selector de cantidad */}
            <div className="mt-4">
              <label htmlFor="quantity" className="text-sm">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border p-2 bg-zinc-800 text-white rounded w-full mt-2"
                min="1"
              />
            </div>

            {/* ✅ Botón Agregar al carrito */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  if (!user) {
                    router.push("/login");
                    return;
                  }
                  if (product) {
                    addToCart(product, quantity);
                    onClose();
                  }
                }}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 w-full cursor-pointer transition font-semibold"
              >
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
