import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Política de devoluciones",
    description:
      "Condiciones de devolución y reembolso en PureTea: plazos, productos sellados, defectos y cómo contactarnos.",
    path: "/legal/returns",
  });
}

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
        Política de devoluciones
      </h1>
      <p className="mt-4 text-sm text-puretea-dark/60">
        Última actualización: abril de 2026
      </p>

      <div className="mt-10 space-y-10 text-puretea-dark/85 leading-relaxed">
        <section>
          <h2 className="font-canela text-xl text-puretea-dark mb-3">
            1. Objetivo
          </h2>
          <p>
            En PureTea queremos que estés satisfecho con tu compra. Esta política explica cuándo
            puedes devolver un producto, cómo hacerlo y cómo gestionamos los reembolsos.
          </p>
        </section>

        <section>
          <h2 className="font-canela text-xl text-puretea-dark mb-3">
            2. Plazo y productos admitidos
          </h2>
          <p className="mb-3">
            Para artículos en perfecto estado, sin abrir y con el embalaje original intacto, puedes
            solicitar la devolución en un plazo de{" "}
            <strong className="text-puretea-dark">30 días naturales</strong> desde la recepción del
            pedido.
          </p>
          <p>
            Los productos alimentarios e higiénicos (té, matcha, infusiones, etc.) pierden el
            derecho a devolución por desistimiento cuando han sido abiertos o manipulados, salvo
            defecto de fabricación o error en el pedido atribuible a PureTea, conforme a la normativa
            aplicable al comercio a distancia.
          </p>
        </section>

        <section>
          <h2 className="font-canela text-xl text-puretea-dark mb-3">
            3. Productos defectuosos o pedido incorrecto
          </h2>
          <p>
            Si recibes un artículo dañado, en mal estado o distinto al contratado, contáctanos lo
            antes posible indicando tu número de pedido y, si es posible, fotos del problema.
            Revisaremos el caso y te propondremos sustitución, reenvío o reembolso sin coste
            adicional para ti cuando corresponda.
          </p>
        </section>

        <section>
          <h2 className="font-canela text-xl text-puretea-dark mb-3">
            4. Cómo iniciar una devolución
          </h2>
          <ol className="list-decimal list-inside space-y-2 pl-1">
            <li>
              Escríbenos desde la página de{" "}
              <Link href="/contact" className="text-puretea-organic font-medium underline-offset-2 hover:underline">
                contacto
              </Link>{" "}
              o al correo que te hayamos indicado en la confirmación del pedido.
            </li>
            <li>
              Indica el número de pedido, el producto o productos que deseas devolver y el motivo.
            </li>
            <li>
              Te responderemos con los pasos concretos (dirección de envío de devolución, plazos y,
              si aplica, etiqueta o acuerdo con el transportista).
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-canela text-xl text-puretea-dark mb-3">
            5. Estado del producto y embalaje
          </h2>
          <p>
            Los artículos deben devolverse en las mismas condiciones en las que los recibiste,
            preferentemente con su embalaje original. Nos reservamos el derecho a rechazar
            devoluciones que no cumplan estas condiciones o que presenten un uso indebido.
          </p>
        </section>

        <section>
          <h2 className="font-canela text-xl text-puretea-dark mb-3">
            6. Gastos de envío en devoluciones
          </h2>
          <p>
            Si la devolución se debe a un error nuestro o a un producto defectuoso, los gastos de
            envío asociados serán por nuestra cuenta cuando así lo acordemos por escrito. En
            desistimientos voluntarios dentro de plazo sobre productos admitidos, los gastos de
            envío de la devolución pueden ser a tu cargo, salvo que la ley aplicable disponga lo
            contrario; te lo indicaremos claramente antes de que envíes el paquete.
          </p>
        </section>

        <section>
          <h2 className="font-canela text-xl text-puretea-dark mb-3">
            7. Reembolsos
          </h2>
          <p>
            Una vez recibamos el producto y comprobemos que cumple las condiciones, procederemos al
            reembolso por el mismo medio de pago empleado en la compra, salvo acuerdo distinto. El
            plazo habitual de tramitación es de{" "}
            <strong className="text-puretea-dark">5 a 7 días laborables</strong> desde la
            aprobación de la devolución; el abono en tu cuenta puede depender además de tu entidad
            bancaria o de la pasarela de pago.
          </p>
        </section>

        <section>
          <h2 className="font-canela text-xl text-puretea-dark mb-3">
            8. Cambios
          </h2>
          <p>
            Si deseas cambiar un producto por otro, contáctanos: según disponibilidad podremos
            gestionarlo como devolución y nuevo pedido o indicarte la opción más sencilla.
          </p>
        </section>

        <section>
          <h2 className="font-canela text-xl text-puretea-dark mb-3">
            9. Legislación y contacto
          </h2>
          <p>
            Esta política se interpreta de acuerdo con la legislación española y europea aplicable al
            consumo y al comercio electrónico. Para cualquier consulta o reclamación relacionada
            con devoluciones, utiliza nuestro{" "}
            <Link href="/contact" className="text-puretea-organic font-medium underline-offset-2 hover:underline">
              formulario de contacto
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
