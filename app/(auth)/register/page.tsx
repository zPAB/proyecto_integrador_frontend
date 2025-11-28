"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { googlePopup, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // REGISTRO NORMAL
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Guardar el nombre del usuario
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("Cuenta creada. Ahora inicia sesión.");
      router.push("/login"); // REDIRECCIÓN AL LOGIN
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // REGISTRO CON GOOGLE
  const handleGoogle = async () => {
    try {
      await googlePopup();
      router.push("/"); // SI ES GOOGLE, PASA DIRECTO AL HOME
    } catch (err) {
      console.error(err);
      alert("Error al registrarse con Google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-xl border border-neutral-200">
        
        {/* TÍTULO */}
        <h2 className="text-3xl font-bold text-center mb-8">Crear cuenta</h2>

        <form className="space-y-6" onSubmit={handleRegister}>

          {/* NOMBRE */}
          <div>
            <label className="text-gray-700 font-medium text-sm">Nombre completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full mt-1 p-4 rounded-xl bg-gray-100 border border-neutral-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>

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

          {/* BOTÓN REGISTER */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold text-lg shadow-md hover:bg-red-700 transition cursor-pointer"
          >
            Registrarse
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
            Registrarse con Google
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-red-600 hover:underline cursor-pointer">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
