"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, LogOut } from "lucide-react";
import { getOrdersByUser, getProductById, Order } from "@/services/orderService";
import { getProductById as fetchProductById } from "@/services/productService";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOutUser } = useAuth();

  const [activeTab, setActiveTab] = useState("info");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    department: "",
    avatar: "/default-avatar.png",
  });

  const [orders, setOrders] = useState<Order[]>([]);

  // =========================================================
  // CARGAR DATOS DEL USUARIO
  // =========================================================
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`https://6929b1f99d311cddf34ae56d.mockapi.io/usuarios/${user.uid}`);
        if (!res.ok) throw new Error("Usuario no encontrado en MockAPI");
        const data = await res.json();

        setUserData({
          name: data.name || user.displayName || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          department: data.department || "",
          avatar: data.avatar || user.photoURL || "/default-avatar.png",
        });
      } catch {
        // fallback a Firebase
        setUserData({
          name: user.displayName || "",
          email: user.email || "",
          phone: "",
          address: "",
          city: "",
          department: "",
          avatar: user.photoURL || "/default-avatar.png",
        });
      }
    };

    fetchUserData();
  }, [user]);

  // =========================================================
  // CARGAR PEDIDOS DEL USUARIO
  // =========================================================
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const rawOrders = await getOrdersByUser(user.uid);

      const ordersWithProducts = await Promise.all(
        rawOrders.map(async (order: Order) => {
          const itemsDetailed = await Promise.all(
            order.items.map(async (item) => {
              const product = await getProductById(item.productId);
              return {
                ...item,
                name: product?.name || "Producto eliminado",
                price: product?.price || 0,
              };
            })
          );
          return { ...order, items: itemsDetailed };
        })
      );

      setOrders(ordersWithProducts.reverse());
    };

    fetchOrders();
  }, [user]);

  // =========================================================
  // CARGAR FAVORITOS DEL USUARIO
  // =========================================================
  const handleLogout = async () => {
    if (!window.confirm("¿Deseas cerrar sesión?")) return;
    await signOutUser();
    router.push("/login");
  };

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`https://6929b1f99d311cddf34ae56d.mockapi.io/usuarios/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      alert("Información actualizada correctamente");
    } catch {
      alert("Error actualizando información");
    }
  };

  if (!user)
    return (
      <main className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-white text-lg">No has iniciado sesión.</p>
      </main>
    );

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HEADER */}
      <section className="relative h-[40vh] bg-gradient-to-br from-red-900 to-black flex items-center justify-center">
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 flex items-center gap-2 bg-black/30 hover:bg-red-600 px-4 py-2 rounded-lg cursor-pointer transition"
        >
          <LogOut size={18} className="text-gray-300" />
          <span className="text-sm text-gray-300 hidden sm:block">Cerrar Sesión</span>
        </button>

        <div className="text-center">
          <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-red-600 shadow-xl overflow-hidden bg-zinc-800">
            <img src={userData.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>

          <h1 className="text-4xl font-bold mb-2">{userData.name || "Usuario"}</h1>
          <p className="text-gray-300">{userData.email}</p>
          {userData.city && userData.department && (
            <p className="text-gray-400 flex items-center justify-center gap-2 mt-2">
              <MapPin size={16} />
              {userData.city}, {userData.department}
            </p>
          )}
        </div>
      </section>

      {/* NAV */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-4 mb-8 border-b border-zinc-800 pb-4 justify-center">
          {[
            { tab: "info", label: "Mi Información", icon: User },
            { tab: "orders", label: "Mis Pedidos", icon: Package },
          ].map(({ tab, label, icon: Icon }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 cursor-pointer transition ${
                activeTab === tab ? "bg-red-600 text-white" : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
              }`}
            >
              <Icon size={20} /> {label}
            </button>
          ))}
        </div>

        {/* TAB INFO */}
        {activeTab === "info" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Información Personal */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">Información Personal</h3>
              <form onSubmit={handleUpdateInfo} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-gray-400 text-sm">Nombre</label>
                  <input
                    id="name"
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-400 text-sm">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-gray-400 text-sm">Teléfono</label>
                  <input
                    id="phone"
                    type="text"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold cursor-pointer transition">
                  Actualizar Información
                </button>
              </form>
            </div>

            {/* Dirección de Envío */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                <MapPin size={24} /> Dirección de Envío
              </h3>
              <form onSubmit={handleUpdateInfo} className="space-y-4">
                <div>
                  <label htmlFor="address" className="text-gray-400 text-sm">Dirección</label>
                  <input
                    id="address"
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="text-gray-400 text-sm">Ciudad</label>
                  <input
                    id="city"
                    type="text"
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="text-gray-400 text-sm">Departamento</label>
                  <input
                    id="department"
                    type="text"
                    value={userData.department}
                    onChange={(e) => setUserData({ ...userData, department: e.target.value })}
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold cursor-pointer transition">
                  Guardar Dirección
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB PEDIDOS */}
        {activeTab === "orders" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <Package size={24} /> Mis Pedidos
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-10">
                <Package size={64} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">No tienes pedidos aún</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-black border border-zinc-800 rounded-xl p-6">
                    <p className="text-gray-400 text-sm">
                      Pedido ID: <span className="text-white">{order.id}</span>
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                      Fecha: <span className="text-white">{order.date}</span>
                    </p>
                    <h4 className="text-lg font-semibold mb-2">Productos:</h4>
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li key={item.productId} className="flex justify-between border-b border-zinc-700 pb-2">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="text-red-600 font-bold">${item.price.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-right mt-4 text-xl font-bold">Total: ${order.total.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
