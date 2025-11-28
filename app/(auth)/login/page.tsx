"use client";

import Link from "next/link";
import { googlePopup, auth } from "@/lib/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN TRADICIONAL
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // ← REDIRECCIÓN AL HOME
    } catch (error) {
      console.error(error);
      alert("Correo o contraseña incorrectos");
    }
  };

  // LOGIN CON GOOGLE
  const handleGoogle = async () => {
    try {
      await googlePopup();
      router.push("/"); // ← REDIRECCIÓN AL HOME
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión con Google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-xl border border-neutral-200">
        
        {/* TÍTULO */}
        <h2 className="text-3xl font-bold text-center mb-8">Iniciar sesión</h2>

        <form className="space-y-6" onSubmit={handleLogin}>

          {/* EMAIL */}
          <div>
            <label className="text-gray-700 font-medium text-sm">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full mt-1 p-4 rounded-xl bg-gray-100 border border-neutral-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>

          {/* CONTRASEÑA */}
          <div>
            <label className="text-gray-700 font-medium text-sm">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 p-4 rounded-xl bg-gray-100 border border-neutral-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>

          {/* BOTÓN LOGIN */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold text-lg shadow-md hover:bg-red-700 transition cursor-pointer"
          >
            Entrar
          </button>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-neutral-300 bg-white hover:bg-gray-100 transition text-black font-semibold cursor-pointer"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className="w-5 h-5"
            />
            Continuar con Google
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-red-600 hover:underline cursor-pointer">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
