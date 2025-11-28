"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

interface AuthContextProps {
  user: any;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✔ Google siempre muestra selección de cuenta
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });

  // 🔥 Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await syncUserWithMockAPI(currentUser);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Sincronizar usuarios con MockAPI
  const syncUserWithMockAPI = async (firebaseUser: any) => {
    try {
      const res = await fetch(
        `https://66f86ad2b5d85f31a34102d3.mockapi.io/usuarios/${firebaseUser.uid}`
      );

      if (!res.ok) {
        // Crear usuario si no existe
        await fetch(
          "https://66f86ad2b5d85f31a34102d3.mockapi.io/usuarios",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: firebaseUser.uid,
              name: firebaseUser.displayName ?? "",
              email: firebaseUser.email,
              avatar: firebaseUser.photoURL ?? "",
              phone: "",
              address: "",
              city: "",
              department: "",
            }),
          }
        );
      }
    } catch (err) {
      console.log("Error sincronizando MockAPI", err);
    }
  };

  // ✔ Login con email
  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // ✔ Register con email
  const registerWithEmail = async (
    email: string,
    password: string,
    name: string
  ) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (result.user) {
      await updateProfile(result.user, { displayName: name });
      await syncUserWithMockAPI(result.user);
    }
  };

  // ✔ Google login con selección de cuenta
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await syncUserWithMockAPI(result.user);
  };

  // ✔ Logout real
  const signOutUser = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        registerWithEmail,
        signInWithGoogle,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
