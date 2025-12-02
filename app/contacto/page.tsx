export default function ContactoPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Contacto</h1>

      <p className="mb-6 text-gray-300">
        ¿Tienes alguna pregunta o necesitas ayuda? Escríbenos al correo{' '}
        <a href="mailto:contacto@example.com" className="text-red-500 underline">
          Medallowear@gmail.com
        </a>{' '}
        o completa el formulario abajo.
      </p>

      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-700">
        <form className="grid gap-4">
          <label className="block text-sm">
            Nombre
            <input
              name="name"
              className="w-full mt-1 p-2 bg-zinc-800 rounded border border-zinc-700"
              placeholder="Tu nombre"
            />
          </label>

          <label className="block text-sm">
            Email
            <input
              name="email"
              type="email"
              className="w-full mt-1 p-2 bg-zinc-800 rounded border border-zinc-700"
              placeholder="tu@correo.com"
            />
          </label>

          <label className="block text-sm">
            Mensaje
            <textarea
              name="message"
              className="w-full mt-1 p-2 bg-zinc-800 rounded border border-zinc-700 h-32"
              placeholder="Escribe tu mensaje aquí"
            />
          </label>

          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-red-600 rounded">
              Enviar
            </button>
            <a
              href="mailto:contacto@example.com"
              className="px-4 py-2 border rounded border-zinc-700 text-gray-200"
            >
              Enviar por email
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
