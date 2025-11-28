import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-red-600">
            Medallo<span className="text-white">Wear</span>
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Moda urbana hecha en Medellín. Calidad, estilo y cultura.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-red-500 mb-3">Enlaces</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/" className="hover:text-red-500">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-red-500">
                Productos
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-red-500">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-500">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="text-lg font-semibold text-red-500 mb-3">Síguenos</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#" className="hover:text-red-500">Instagram</a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">TikTok</a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">Facebook</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Línea final */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MedalloWear — Hecho en Medellín 🇨🇴
      </div>
    </footer>
  );
}
