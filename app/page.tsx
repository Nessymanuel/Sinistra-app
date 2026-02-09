import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">

      <section className="section-card">
        <h2 className="text-lg font-semibold mb-2">Bem-vindo à Sinistra</h2>
        <p className="text-sm text-slate-600 mb-4">
          A Sinistra é um portal simples para registar e acompanhar sinistros
          de automóvel entre condutores e seguradoras.
        </p>

        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <InfoCard
            titulo="Para condutores"
            texto="Registe um sinistro em poucos passos e acompanhe o estado em tempo real."
          />
          <InfoCard
            titulo="Para seguradoras"
            texto="Gestão centralizada de sinistros, com atualização rápida de estados."
          />
          <InfoCard
            titulo="Transparência"
            texto="Informação clara e linguagem simples."
          />
        </div>
      </section>

      <section className="section-card">
        <h3 className="text-sm font-semibold mb-3">Comece por aqui</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <PrimaryLink href="/registrar" label="Registar novo sinistro" />
          <SecondaryLink href="/meus" label="Ver meus sinistros" />
          <SecondaryLink href="/admin" label="Área admin (seguradora)" />
        </div>
      </section>

    </div>
  );
}

function InfoCard({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <p className="font-semibold text-slate-800 mb-1">{titulo}</p>
      <p className="text-slate-600">{texto}</p>
    </div>
  );
}

function PrimaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full bg-blue-600 text-white px-4 py-2 text-xs font-medium hover:bg-blue-700"
    >
      {label}
    </Link>
  );
}

function SecondaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-slate-200 text-slate-700 px-4 py-2 text-xs font-medium hover:bg-slate-50"
    >
      {label}
    </Link>
  );
}
