"use client";

import { useState } from "react";
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    department: ""
  });

  // Función para cerrar sesión
  const handleLogout = () => {
    const confirm = window.confirm("¿Estás seguro que deseas cerrar sesión?");
    if (confirm) {
      console.log("Cerrando sesión...");
      // Aquí iría tu lógica: signOut(), router.push('/login'), etc.
    }
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    console.log("Información actualizada:", userData);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HEADER DEL PERFIL */}
      <section className="relative h-[40vh] bg-gradient-to-br from-red-900 to-black flex items-center justify-center">
        
        {/* BOTÓN FLOTANTE CERRAR SESIÓN (Arriba derecha) */}
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
          <div className="w-32 h-32 bg-zinc-800 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-red-600 shadow-xl shadow-red-900/20">
            <User size={64} className="text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {userData.name || "Usuario"}
          </h1>
          <p className="text-gray-300">{userData.email || "email@ejemplo.com"}</p>
          {userData.city && userData.department && (
            <p className="text-gray-400 flex items-center justify-center gap-2 mt-2">
              <MapPin size={16} />
              {userData.city}, {userData.department}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* NAVEGACIÓN DE PESTAÑAS */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
              activeTab === "info"
                ? "bg-red-600 text-white"
                : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
            }`}
          >
            <User size={20} />
            Mi Información
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-red-600 text-white"
                : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
            }`}
          >
            <Package size={20} />
            Mis Pedidos
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
              activeTab === "favorites"
                ? "bg-red-600 text-white"
                : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
            }`}
          >
            <Heart size={20} />
            Favoritos
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
              activeTab === "settings"
                ? "bg-red-600 text-white"
                : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
            }`}
          >
            <Settings size={20} />
            Configuración
          </button>
        </div>

        {/* CONTENIDO DE MI INFORMACIÓN */}
        {activeTab === "info" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                Información Personal
              </h3>
              <form onSubmit={handleUpdateInfo} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Nombre completo</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    placeholder="Ingresa tu nombre"
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    placeholder="tu@email.com"
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Teléfono</label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    placeholder="+57 300 123 4567"
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
                >
                  Actualizar información
                </button>
              </form>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                <MapPin size={24} />
                Dirección de Envío
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Dirección</label>
                  <input
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({...userData, address: e.target.value})}
                    placeholder="Calle 10 # 43-25"
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Ciudad</label>
                  <input
                    type="text"
                    value={userData.city}
                    onChange={(e) => setUserData({...userData, city: e.target.value})}
                    placeholder="Medellín"
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Departamento</label>
                  <input
                    type="text"
                    value={userData.department}
                    onChange={(e) => setUserData({...userData, department: e.target.value})}
                    placeholder="Antioquia"
                    className="w-full mt-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition"
                  />
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition">
                  Guardar dirección
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONTENIDO DE MIS PEDIDOS */}
        {activeTab === "orders" && (
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-6">
              Historial de Pedidos
            </h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <Package size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No tienes pedidos aún</p>
              <p className="text-gray-500 mt-2">Tus compras aparecerán aquí</p>
            </div>
          </div>
        )}

        {/* CONTENIDO DE FAVORITOS */}
        {activeTab === "favorites" && (
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-6">
              Mis Favoritos
            </h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <Heart size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No tienes favoritos guardados</p>
              <p className="text-gray-500 mt-2">Guarda productos para verlos aquí</p>
            </div>
          </div>
        )}

        {/* CONTENIDO DE CONFIGURACIÓN */}
        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-red-600 mb-6">
              Configuración de Cuenta
            </h3>
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <CreditCard size={20} className="text-red-600" />
                  Métodos de Pago
                </h4>
                <p className="text-gray-400 mb-4">
                  Gestiona tus tarjetas y métodos de pago guardados
                </p>
                <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition">
                  Administrar pagos
                </button>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-2">Notificaciones</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-red-600" />
                    <span className="text-gray-300">
                      Recibir ofertas y promociones
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-red-600" />
                    <span className="text-gray-300">
                      Actualizaciones de pedidos
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 accent-red-600" />
                    <span className="text-gray-300">Newsletter semanal</span>
                  </label>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-2 text-red-600">
                  Seguridad
                </h4>
                <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold transition">
                  Cambiar contraseña
                </button>
              </div>

              {/* Botón de cerrar sesión existente conectado a la función */}
              <div className="bg-zinc-900 border border-red-900 rounded-xl p-6">
                <button 
                  onClick={handleLogout}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <LogOut size={20} />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}