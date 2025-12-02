
"use client";

import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="text-center text-white mt-20">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <button
          onClick={() => router.push("/products")}
          className="bg-red-600 px-6 py-3 rounded hover:bg-red-700"
        >
          Ir a productos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

      {/* Lista de productos */}
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-zinc-800 p-4 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={`/images/${item.image}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-400">Cantidad: {item.quantity}</p>
                <p className="text-red-600 font-bold">
                  ${item.price.toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {/* Total y acciones */}
      <div className="mt-8 text-right">
        <p className="text-xl font-bold">Total: ${total.toLocaleString()}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={clearCart}
            className="bg-zinc-700 px-6 py-2 rounded hover:bg-zinc-600"
          >
            Vaciar carrito
          </button>
          <button
            onClick={() => {
              alert("Compra realizada con éxito!");
              clearCart();
              router.push("/profile"); // ✅ Redirige a perfil
            }}
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
          >
            Realizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
