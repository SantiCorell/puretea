import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Contacto",
    description: "Contacta con PureTea. Atención al cliente, pedidos y colaboraciones.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
        Contacto
      </h1>
      <p className="mt-4 text-puretea-dark/80">
        Para consultas sobre pedidos, envíos o colaboraciones, escríbenos. Respondemos en menos de 24 horas.
      </p>
      <p className="mt-6 text-puretea-dark/80">
        Email: <a href="mailto:hola@puretea.com" className="text-puretea-organic hover:underline">hola@puretea.com</a>
      </p>
    </div>
  );
}
