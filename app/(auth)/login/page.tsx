"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmail(email, password);
      router.push("/");
    } catch (error) {
      alert("Correo o contraseña incorrectos");
    }

    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);

    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      alert("Error al iniciar sesión con Google");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-xl border border-neutral-200">
        
        <h2 className="text-3xl font-bold text-center mb-8">Iniciar sesión</h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="text-gray-700 font-medium text-sm">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full mt-1 p-4 rounded-xl bg-gray-100 border border-neutral-300 focus:border-red-500 focus:ring-1"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium text-sm">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 p-4 rounded-xl bg-gray-100 border border-neutral-300 focus:border-red-500 focus:ring-1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold text-lg hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-neutral-300 bg-white hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
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
