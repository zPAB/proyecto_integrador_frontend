// src/app/(content)/products/layout.tsx
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <section className="text-white min-h-screen">{children}</section>;
}
