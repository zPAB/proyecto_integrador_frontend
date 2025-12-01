"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideFooter =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/profile" ||
    pathname === "/contacto" ||
    // ocultar footer en detalle de producto: /products/[id]
    pathname.startsWith("/products/");
  const disableScroll = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (disableScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [disableScroll]);

  return (
    <>
      <Navbar />

      <main className="w-full">
        {children}
      </main>

      {!hideFooter && <Footer />}
    </>
  );
}
