"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

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
    avatar: "",
  });

  // 🔥 Carga automática desde Firebase + MockAPI
  useEffect(() => {
    if (!user) return;

    const fetchUserFromMockAPI = async () => {
      try {
        const res = await fetch(
          `https://66f86ad2b5d85f31a34102d3.mockapi.io/usuarios/${user.uid}`
        );

        if (res.ok) {
          const data = await res.json();
          setUserData({
            name: data.name ?? user.displayName ?? "",
            email: data.email ?? user.email ?? "",
            phone: data.phone ?? "",
            address: data.address ?? "",
            city: data.city ?? "",
            department: data.department ?? "",
            avatar: data.avatar ?? user.photoURL ?? "",
          });
        }
      } catch (err) {
        console.log("Error cargando MockAPI", err);
      }
    };

    fetchUserFromMockAPI();
  }, [user]);

  // 🚪 Logout real
  const handleLogout = async () => {
    const confirm = window.confirm("¿Estás seguro que deseas cerrar sesión?");
    if (!confirm) return;

    await signOutUser();
    router.push("/login");
  };

  // 💾 Guardar datos
  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(
        `https://66f86ad2b5d85f31a34102d3.mockapi.io/usuarios/${user.uid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      alert("Información actualizada correctamente");
    } catch (err) {
      alert("Hubo un error guardando la información");
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
          className="absolute top-6 right-6 flex items-center gap-2 bg-black/30 hover:bg-red-600 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg transition-all duration-300 group"
        >
          <LogOut size={18} className="text-gray-300 group-hover:text-white" />
          <span className="text-sm font-medium text-gray-300 group-hover:text-white hidden sm:block">
            Cerrar Sesión
          </span>
        </button>

        <div className="text-center">
          <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-red-600 shadow-xl shadow-red-900/20 overflow-hidden bg-zinc-800">
            <img
              src={userData.avatar || "/default-avatar.png"}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-4xl font-bold mb-2">
            {userData.name || user.displayName || "Usuario"}
          </h1>
          <p className="text-gray-300">{userData.email || user.email}</p>

          {userData.city && userData.department && (
            <p className="text-gray-400 flex items-center justify-center gap-2 mt-2">
              <MapPin size={16} />
              {userData.city}, {userData.department}
            </p>
          )}
        </div>
      </section>

      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* 🔥 NAV BAR DEL PERFIL (CENTRADO) */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-zinc-800 pb-4 justify-center text-center mx-auto">
          {[
            { tab: "info", label: "Mi Información", icon: User },
            { tab: "orders", label: "Mis Pedidos", icon: Package },
            { tab: "favorites", label: "Favoritos", icon: Heart },
            { tab: "settings", label: "Configuración", icon: Settings },
          ].map(({ tab, label, icon: Icon }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                activeTab === tab
                  ? "bg-red-600 text-white"
                  : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>

        {/* TAB: INFO */}
        {activeTab === "info" && (
          <div className="grid md:grid-cols-2 gap-6">

            {/* Información personal */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                Información Personal
              </h3>

              <form onSubmit={handleUpdateInfo} className="space-y-4">
                {[
                  { label: "Nombre completo", field: "name" },
                  { label: "Email", field: "email", type: "email" },
                  { label: "Teléfono", field: "phone" },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <label className="text-gray-400 text-sm">{label}</label>
                    <input
                      type={type || "text"}
                      value={userData[field]}
                      onChange={(e) =>
                        setUserData({ ...userData, [field]: e.target.value })
                      }
                      className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                ))}

                <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold">
                  Actualizar información
                </button>
              </form>
            </div>

            {/* Dirección */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                <MapPin size={24} />
                Dirección de Envío
              </h3>

              <div className="space-y-4">
                {[
                  { label: "Dirección", field: "address" },
                  { label: "Ciudad", field: "city" },
                  { label: "Departamento", field: "department" },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="text-gray-400 text-sm">{label}</label>
                    <input
                      value={userData[field]}
                      onChange={(e) =>
                        setUserData({ ...userData, [field]: e.target.value })
                      }
                      className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                ))}

                <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold">
                  Guardar dirección
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PEDIDOS */}
        {activeTab === "orders" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <Package size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No tienes pedidos aún</p>
            <p className="text-gray-500 mt-2">Tus compras aparecerán aquí</p>
          </div>
        )}

        {/* TAB: FAVORITOS */}
        {activeTab === "favorites" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <Heart size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No has guardado productos</p>
            <p className="text-gray-500 mt-2">
              Agrega productos a tu lista de favoritos
            </p>
          </div>
        )}

        {/* TAB: CONFIGURACIÓN */}
        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-red-600 mb-6">
              Configuración de Cuenta
            </h3>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-lg text-red-600 mb-2">Seguridad</h4>
              <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold">
                Cambiar contraseña
              </button>
            </div>

            <div className="bg-zinc-900 border border-red-900 rounded-xl p-6">
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
