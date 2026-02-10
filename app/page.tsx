"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="space-y-8">

      {/* Hero Banner */}
      <section className="section-card bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-blue-300 shadow-lg">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">
            Bem-vindo à Sinistra
          </h1>
          <p className="text-lg text-blue-800 mb-4">
            A plataforma completa para registar e acompanhar sinistros automóvel
            com transparência e simplicidade.
          </p>
          <p className="text-sm text-blue-700">
            Desenvolvida para criar uma ligação clara entre condutores e seguradoras.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {isLoggedIn ? (
            <>
              <PrimaryLink href="/registrar" label="🚗 Registar novo sinistro" />
              <SecondaryLink href="/meus" label="Ver meus sinistros" />
            </>
          ) : (
            <>
              <PrimaryLink href="/login" label="🔓 Entrar na plataforma" />
              <SecondaryLink href="#features" label="Saber mais" />
            </>
          )}
        </div>
      </section>

      {/* Main Value Propositions */}
      <section id="features">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Para quem é a Sinistra?
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            icone="🚗"
            titulo="Para condutores"
            texto="Registe um sinistro em poucos passos."
            features={["Registo rápido", "Acompanhamento em tempo real", "Documentos organizados"]}
          />
          <InfoCard
            icone="🏢"
            titulo="Para seguradoras"
            texto="Gestão centralizada de sinistros."
            features={["Dashboard completo", "Atualização ágil", "Relatórios"]}
          />
          <InfoCard
            icone="🔒"
            titulo="Segurança"
            texto="Dados protegidos e transparentes."
            features={["Encriptação", "Histórico completo", "Privacidade"]}
          />
        </div>
      </section>

      {/* Features */}
      <section className="section-card bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">O que oferecemos</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureItem titulo="Registo simples" descricao="Processo rápido em 3 passos." />
          <FeatureItem titulo="Histórico completo" descricao="Todos os seus sinistros num só lugar." />
          <FeatureItem titulo="Comunicação direta" descricao="Contacto claro entre partes." />
          <FeatureItem titulo="Estados rastreáveis" descricao="Acompanhe cada fase do processo." />
          <FeatureItem titulo="Documentos seguros" descricao="Upload seguro de ficheiros." />
          <FeatureItem titulo="Mobile-friendly" descricao="Use em qualquer dispositivo." />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section-card border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          {isLoggedIn ? "Comece agora" : "Como funciona"}
        </h2>

        <div className="grid gap-3 md:grid-cols-3 text-sm">
          {isLoggedIn ? (
            <>
              <ActionCard href="/registrar" titulo="Novo sinistro" descricao="Criar novo registo" icone="📋" />
              <ActionCard href="/meus" titulo="Meus sinistros" descricao="Acompanhar processos" icone="📊" />
              {isAdmin && (
                <ActionCard href="/admin" titulo="Área admin" descricao="Gestão geral" icone="⚙️" />
              )}
            </>
          ) : (
            <>
              <ActionCard href="/login" titulo="Entrar" descricao="Aceda à conta" icone="🔐" />
              <ActionCard href="/registrar" titulo="Registar sinistro" descricao="Sem conta" icone="📋" />
              <ActionCard href="/" titulo="Contacto" descricao="Fale connosco" icone="📞" />
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Perguntas frequentes
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <FAQItem
            pergunta="Como começo?"
            resposta="Clique em Registar novo sinistro."
          />
          <FAQItem
            pergunta="Posso enviar documentos?"
            resposta="Sim, vários formatos são aceites."
          />
          <FAQItem
            pergunta="Os dados estão seguros?"
            resposta="Sim, usamos encriptação."
          />
          <FAQItem
            pergunta="Quanto tempo demora?"
            resposta="Depende do caso."
          />
        </div>
      </section>
    </div>
  );
}

/* ================= COMPONENTES ================= */

function InfoCard({
  icone,
  titulo,
  texto,
  features = [],
}: {
  icone: string;
  titulo: string;
  texto: string;
  features?: string[];
}) {
  return (
    <div className="section-card">
      <div className="text-3xl mb-3">{icone}</div>
      <p className="font-semibold mb-1">{titulo}</p>
      <p className="text-sm mb-3">{texto}</p>
      {features.length > 0 && (
        <ul className="text-sm space-y-1">
          {features.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FeatureItem({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-blue-500">✓</span>
      <div>
        <p className="font-semibold">{titulo}</p>
        <p className="text-sm">{descricao}</p>
      </div>
    </div>
  );
}

function ActionCard({
  href,
  titulo,
  descricao,
  icone,
}: {
  href: string;
  titulo: string;
  descricao: string;
  icone: string;
}) {
  return (
    <Link href={href} className="section-card block hover:shadow-md">
      <div className="text-4xl mb-2">{icone}</div>
      <p className="font-semibold">{titulo}</p>
      <p className="text-xs">{descricao}</p>
    </Link>
  );
}

function FAQItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  return (
    <div className="section-card">
      <p className="font-semibold mb-2">{pergunta}</p>
      <p className="text-sm">{resposta}</p>
    </div>
  );
}

function PrimaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm">
      {label}
    </Link>
  );
}

function SecondaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="border px-5 py-2 rounded-full text-sm">
      {label}
    </Link>
  );
}
