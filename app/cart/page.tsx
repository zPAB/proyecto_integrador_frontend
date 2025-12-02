"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { createOrder } from "@/services/orderService";
import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: user?.displayName || "",
    email: user?.email || "",
    direccion: "",
    metodoPago: "tarjeta",
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10 text-white">
        <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-bold mb-3">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-6">Comienza a agregar productos para ver tu compra aquí</p>
            <button
              onClick={() => router.push("/products")}
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Ir a productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("Debes iniciar sesión para comprar");
      router.push("/login");
      return;
    }

    if (!formData.nombre || !formData.email || !formData.direccion) {
      alert("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    const order = {
      userId: user.uid,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      total: total,
      date: new Date().toISOString(),
      shipping: {
        nombre: formData.nombre,
        email: formData.email,
        direccion: formData.direccion,
      },
      metodoPago: formData.metodoPago,
    };

    const created = await createOrder(order);

    if (!created) {
      alert("Error al procesar la compra");
      setLoading(false);
      return;
    }

    alert("Compra realizada con éxito!");
    clearCart();
    setShowCheckoutForm(false);
    setLoading(false);
    router.push("/profile");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LISTA DE PRODUCTOS */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold">Productos</h2>
            </div>
            
            <div className="divide-y divide-zinc-800">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-black transition-colors"
                >
                  <div className="flex gap-6">
                    <img
                      src={
                        item.img?.startsWith("http")
                          ? item.img
                          : item.image?.startsWith("http")
                          ? item.image
                          : `/images/${item.image || item.img || ""}`
                      }
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-gray-400 mb-2">Cantidad: <span className="text-white font-semibold">{item.quantity}</span></p>
                      <p className="text-gray-400 mb-3">Precio unitario: <span className="text-red-600 font-bold">${item.price.toLocaleString()}</span></p>
                      <p className="text-lg font-bold">Subtotal: <span className="text-red-600">${(item.price * item.quantity).toLocaleString()}</span></p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors h-fit"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-zinc-800">
              <button
                onClick={clearCart}
                className="w-full bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>

        {/* RESUMEN DE COMPRA */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden sticky top-6">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold">Resumen de Compra</h2>
            </div>

            <div className="p-6 space-y-4 border-b border-zinc-800">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Envío:</span>
                <span className="text-green-400">Gratis</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Impuestos:</span>
                <span>Calculado al confirmar</span>
              </div>
            </div>

            <div className="p-6 border-b border-zinc-800">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-red-600">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-6">
              <button
                onClick={() => setShowCheckoutForm(true)}
                className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold transition-colors text-lg"
              >
                Realizar compra
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL FORMULARIO DE CHECKOUT */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-lg p-8 max-w-md w-full mx-4 border border-zinc-800">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Finalizar compra</h2>
              <button
                onClick={() => setShowCheckoutForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Resumen */}
            <div className="bg-black rounded p-4 mb-6">
              <p className="text-gray-400 text-sm">Total a pagar</p>
              <p className="text-2xl font-bold text-red-600">${total.toLocaleString()}</p>
            </div>

            {/* Formulario */}
            <form onSubmit={handlePurchase} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="text-gray-400 text-sm">Nombre Completo</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full mt-1 bg-black border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-red-600"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-400 text-sm">Correo Electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 bg-black border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-red-600"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Dirección */}
              <div>
                <label className="text-gray-400 text-sm">Dirección de Envío</label>
                <textarea
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  className="w-full mt-1 bg-black border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-red-600 resize-none"
                  placeholder="Calle, número, ciudad"
                  rows={3}
                />
              </div>

              {/* Método de Pago */}
              <div>
                <label className="text-gray-400 text-sm">Método de Pago</label>
                <select
                  value={formData.metodoPago}
                  onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
                  className="w-full mt-1 bg-black border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-red-600"
                >
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                  <option value="paypal">PayPal</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="efectivo">Contra Entrega</option>
                </select>
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded font-semibold"
                >
                  {loading ? "Procesando..." : "Confirmar Compra"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
