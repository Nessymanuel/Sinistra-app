"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowRight,
  ShieldCheck,
  Timer,
  FileText,
  Bell,
  UploadCloud,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Users,
  BarChart3,
  Lock,
  ClipboardCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin";

  return (
    <main className="bg-white">
      {/* HERO (dark) */}
      <section className="relative overflow-hidden bg-white text-white">

        <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 md:pt-20 md:pb-20 relative">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Sparkles className="h-4 w-4" />
                Portal de sinistros com rastreio e evidências
              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Registe e acompanhe sinistros{" "}
                <span className="text-blue-300">de forma simples</span>, clara e segura.
              </h1>

              <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
                Um fluxo completo: registo → evidências → estados → comunicação → auditoria.
                Ideal para condutores, seguradoras e admins.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {isLoggedIn ? (
                  <>
                    <PrimaryLink href="/registrar">
                      Registar novo sinistro <ArrowRight className="h-4 w-4" />
                    </PrimaryLink>
                    <SecondaryLink href="/meus">Ver meus sinistros</SecondaryLink>
                    {isAdmin && (
                      <SecondaryLink href="/admin">Área Admin</SecondaryLink>
                    )}
                  </>
                ) : (
                  <>
                    <PrimaryLink href="/login">
                      Entrar <ArrowRight className="h-4 w-4" />
                    </PrimaryLink>
                    <SecondaryLink href="#como-funciona">Ver como funciona</SecondaryLink>
                  </>
                )}
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-white/70">
                <MiniPill icon={<ShieldCheck className="h-4 w-4" />}>Controlo de acesso</MiniPill>
                <MiniPill icon={<UploadCloud className="h-4 w-4" />}>Uploads & evidências</MiniPill>
                <MiniPill icon={<Bell className="h-4 w-4" />}>Estados e notificações</MiniPill>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Para Condutor • Seguradora • Admin
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Dados consistentes e auditáveis
                </div>
              </div>
            </div>

            {/* “preview” column */}
            <div className="lg:justify-self-end">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
                <div className="rounded-2xl bg-gradient-to-b from-white/95 to-white/80 p-4 text-slate-900">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-700">Painel do Sinistro</p>
                    <span className="text-[11px] rounded-full bg-blue-600/10 text-blue-700 px-2 py-0.5 font-semibold">
                      Em análise
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <MockStat label="Tempo médio" value="2d" />
                    <MockStat label="Evidências" value="7" />
                    <MockStat label="Atualizações" value="12" />
                  </div>

                  <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold text-slate-700">Timeline</p>
                    <div className="mt-3 space-y-2 text-xs">
                      <MockLine ok title="Registo submetido" subtitle="Hoje • 10:12" />
                      <MockLine ok title="Documentos anexados" subtitle="Hoje • 10:18" />
                      <MockLine title="Aguardando seguradora" subtitle="Em progresso" />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold text-slate-700">Checklist</p>
                      <ul className="mt-2 space-y-1 text-xs text-slate-600">
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Identificação</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Fotos</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Declaração</li>
                      </ul>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="text-xs font-semibold text-slate-700">Ação rápida</p>
                      <button className="mt-3 w-full rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition">
                        Anexar evidência
                      </button>
                      <p className="mt-2 text-[11px] text-slate-500">
                        PDF, JPG, PNG, DOCX…
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* trust strip */}
              <div className="mt-5 text-center text-xs text-white/55">
                Fluxo pensado para reduzir retrabalho e aumentar rastreabilidade.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / LOGOS (like UI Academy strip) */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-3">
            <TrustCard
              icon={<Timer className="h-5 w-5" />}
              title="Mais rápido"
              desc="Registo guiado + checklist para diminuir erros e voltas."
            />
            <TrustCard
              icon={<ClipboardCheck className="h-5 w-5" />}
              title="Mais claro"
              desc="Estados padronizados e histórico para auditoria."
            />
            <TrustCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Mais seguro"
              desc="Acesso por perfil e dados consistentes no processo."
            />
          </div>
        </div>
      </section>

      {/* FEATURES (rich) */}
      <section id="features" className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-widest text-blue-700 uppercase">Recursos</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Tudo o que precisas para gerir sinistros end-to-end
            </h2>
            <p className="max-w-2xl text-slate-600">
              Estrutura feita para “muita informação” sem ficar confusa: blocos, cartões, passos e social proof.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Registo guiado"
              desc="Formulário claro, seções bem definidas e validação."
              bullets={[
                "Dados do condutor e viatura",
                "Detalhes do incidente",
                "Checklist de campos obrigatórios",
              ]}
            />
            <FeatureCard
              icon={<UploadCloud className="h-5 w-5" />}
              title="Evidências e documentos"
              desc="Uploads para anexos e provas do sinistro."
              bullets={[
                "Fotos e PDFs",
                "Organização por tipo",
                "Histórico e rastreio",
              ]}
            />
            <FeatureCard
              icon={<Bell className="h-5 w-5" />}
              title="Estados & comunicação"
              desc="Estados claros para reduzir ruído e retrabalho."
              bullets={[
                "Em análise / Aprovado / Rejeitado",
                "Observações e histórico",
                "Notificações por evento",
              ]}
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Visibilidade"
              desc="Listagens e filtros para encontrar rápido."
              bullets={["Pesquisa por status", "Ordenação", "Visão do progresso"]}
            />
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="Perfis"
              desc="Condutor, seguradora e admin com permissões."
              bullets={["Menus por role", "Acesso restrito", "Operação segura"]}
            />
            <FeatureCard
              icon={<Lock className="h-5 w-5" />}
              title="Auditoria"
              desc="Pensado para consistência, revisão e controlo."
              bullets={["Histórico de mudanças", "Responsável por ação", "Evidências anexadas"]}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (UI Academy style: steps + preview) */}
      <section id="como-funciona" className="py-14 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <p className="text-xs font-bold tracking-widest text-blue-700 uppercase">Como funciona</p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                Um fluxo claro do início ao fim
              </h3>
              <p className="mt-3 text-slate-600 max-w-xl">
                Menos “ida e volta” entre pessoas. Mais clareza e rastreabilidade.
              </p>

              <div className="mt-7 space-y-4">
                <Step
                  n="1"
                  title="Regista o sinistro"
                  desc="Preenche o formulário com dados essenciais e validação."
                />
                <Step
                  n="2"
                  title="Anexa evidências"
                  desc="Fotos, PDFs e documentos ficam organizados no processo."
                />
                <Step
                  n="3"
                  title="Acompanha o estado"
                  desc="Timeline, observações e decisões ficam registadas."
                />
                <Step
                  n="4"
                  title="Conclui com auditoria"
                  desc="Resultado final + histórico para consulta e revisão."
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {isLoggedIn ? (
                  <PrimaryLink href="/registrar">
                    Começar agora <ArrowRight className="h-4 w-4" />
                  </PrimaryLink>
                ) : (
                  <>
                    <PrimaryLink href="/login">
                      Entrar <ArrowRight className="h-4 w-4" />
                    </PrimaryLink>
                    <SecondaryLink href="#precos">Ver planos</SecondaryLink>
                  </>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">O que muda na prática</p>
                <p className="mt-2 text-sm text-slate-600">
                  Em vez de mensagens soltas, tudo fica centralizado no processo do sinistro.
                </p>
                <div className="mt-4 grid gap-3">
                  <BenefitLine title="Menos retrabalho" desc="Campos e checklist evitam informação incompleta." />
                  <BenefitLine title="Decisões mais rápidas" desc="Evidências e histórico à mão." />
                  <BenefitLine title="Rastreabilidade" desc="Quem fez o quê e quando." />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Perfeito para:</p>
                <div className="mt-3 grid gap-2 text-sm text-slate-700">
                  <Tag>Condutores</Tag>
                  <Tag>Gestores de Seguradora</Tag>
                  <Tag>Administradores</Tag>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-950 p-5 text-white shadow-sm">
                <p className="text-sm font-semibold">Dica</p>
                <p className="mt-2 text-sm text-white/75">
                  Repetir CTAs ao longo da página aumenta conversão (layout tipo UI Academy).
                </p>
                <div className="mt-4">
                  <SecondaryLink href={isLoggedIn ? "/meus" : "/login"} className="border-white/20 text-white hover:bg-white/10">
                    {isLoggedIn ? "Ver meus sinistros" : "Entrar agora"}
                  </SecondaryLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-xs font-bold tracking-widest text-blue-700 uppercase">Feedback</p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                Experiência mais simples para todos
              </h3>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Testemunhos (podes trocar por reais depois).
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Testimonial
              name="Condutor"
              role="Utilizador"
              text="“Antes era confuso. Agora sei exatamente o que falta e em que estado está.”"
            />
            <Testimonial
              name="Gestor"
              role="Seguradora"
              text="“Ter evidências e histórico num só lugar acelera a análise.”"
            />
            <Testimonial
              name="Admin"
              role="Operações"
              text="“A rastreabilidade facilita auditorias e reduz reclamações.”"
            />
          </div>
        </div>
      </section>

      {/* PRICING (optional style, but UI Academy-like section) */}
      <section id="precos" className="py-14 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold tracking-widest text-blue-700 uppercase">Planos</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Começa simples e cresce quando precisares
          </h3>
          <p className="mt-2 text-slate-600 max-w-2xl">
            (Se não vais vender planos, podes chamar “Perfis” ou “Níveis de acesso”.)
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <PricingCard
              title="Condutor"
              price="Grátis"
              highlight={false}
              items={[
                "Registar sinistro",
                "Anexar evidências",
                "Acompanhar estados",
              ]}
              ctaHref={isLoggedIn ? "/registrar" : "/login"}
              ctaLabel="Começar"
            />
            <PricingCard
              title="Seguradora"
              price="Pro"
              highlight
              items={[
                "Análise de sinistros",
                "Observações e decisões",
                "Histórico e auditoria",
                "Gestão de estados",
              ]}
              ctaHref={isLoggedIn ? "/meus" : "/login"}
              ctaLabel="Explorar"
            />
            <PricingCard
              title="Admin"
              price="Enterprise"
              highlight={false}
              items={[
                "Gestão de utilizadores",
                "Permissões por role",
                "Relatórios e controlo",
              ]}
              ctaHref={isAdmin ? "/admin" : "/login"}
              ctaLabel="Aceder"
            />
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Perguntas frequentes
          </h3>

          <div className="flex flex-col gap-4 mt-6">
            <FAQ
              q="Quais credenciais uso?"
              a="Só funciona com utilizadores existentes na base de dados. Cria um utilizador e garante que a senha está com hash (bcrypt) se o login usa compare."
            />
            <FAQ
              q="Posso anexar documentos?"
              a="Sim. O ideal é aceitar imagens e PDFs e guardar o histórico de uploads no sinistro."
            />
            <FAQ
              q="Quem vê o quê?"
              a="Depende do role. Condutor vê os próprios sinistros; seguradora vê os atribuídos; admin vê gestão geral."
            />
            <FAQ
              q="Como manter consistência?"
              a="Com estados padronizados, checklist, e histórico/timeline por ação."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-900 p-10 text-white overflow-hidden relative">
            <div className="pointer-events-none absolute -top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-blue-600/25 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight">
                  Pronta para gerir sinistros com clareza?
                </h3>
                <p className="mt-3 text-white/75 max-w-xl">
                  Cria o teu primeiro registo e acompanha o processo com rastreabilidade e segurança.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {isLoggedIn ? (
                  <>
                    <PrimaryLink href="/registrar">
                      Registar agora <ArrowRight className="h-4 w-4" />
                    </PrimaryLink>
                    <SecondaryLink href="/meus" className="border-white/20 text-white hover:bg-white/10">
                      Ver meus sinistros
                    </SecondaryLink>
                  </>
                ) : (
                  <>
                    <PrimaryLink href="/login">
                      Entrar <ArrowRight className="h-4 w-4" />
                    </PrimaryLink>
                    <SecondaryLink href="#features" className="border-white/20 text-white hover:bg-white/10">
                      Ver recursos
                    </SecondaryLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (dark like UI Academy) */}
      <footer className="bg-slate-950 text-white/70 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="text-white font-extrabold text-lg">Sinistra</p>
              <p className="mt-2 text-sm text-white/60 max-w-md">
                Portal de Sinistros Automóvel — layout longo e informativo com UX clara.
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs text-white/60">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Seguro</span>
                <span className="inline-flex items-center gap-2"><Timer className="h-4 w-4" /> Eficiente</span>
                <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4" /> Rastreável</span>
              </div>
            </div>

            <FooterCol title="Produto" items={["Registo", "Evidências", "Estados", "Auditoria"]} />
            <FooterCol title="Empresa" items={["Sobre", "Contacto", "Privacidade", "FAQ"]} />
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50">
            <p>&copy; 2026 Sinistra. Todos os direitos reservados.</p>
            <p>Feito para processos claros e rastreáveis.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =================== UI COMPONENTS =================== */

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={
        "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition " +
        className
      }
    >
      {children}
    </Link>
  );
}

function MiniPill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-white/80">{icon}</span>
      <span className="text-white/70">{children}</span>
    </div>
  );
}

function MockStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-slate-900">{value}</p>
    </div>
  );
}

function MockLine({ title, subtitle, ok }: { title: string; subtitle: string; ok?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <span className={"mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full " + (ok ? "bg-green-600/10" : "bg-slate-200")}>
        {ok ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <span className="h-2 w-2 rounded-full bg-slate-400" />}
      </span>
      <div>
        <p className="text-slate-700 font-semibold">{title}</p>
        <p className="text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function TrustCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700">
        {icon}
      </div>
      <p className="mt-4 font-extrabold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  bullets,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700">
        {icon}
      </div>
      <p className="mt-4 font-extrabold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center">
        {n}
      </div>
      <div>
        <p className="font-extrabold text-slate-900">{title}</p>
        <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function BenefitLine({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700">
        <CheckCircle2 className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-extrabold text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  );
}

function Testimonial({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-extrabold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  title,
  price,
  items,
  ctaHref,
  ctaLabel,
  highlight,
}: {
  title: string;
  price: string;
  items: string[];
  ctaHref: string;
  ctaLabel: string;
  highlight: boolean;
}) {
  return (
    <div
      className={
        "rounded-3xl border p-7 shadow-sm transition " +
        (highlight
          ? "border-blue-600 bg-white shadow-md"
          : "border-slate-200 bg-white hover:shadow-md")
      }
    >
      <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">{title}</p>
      <p className="mt-3 text-3xl font-extrabold text-slate-900">{price}</p>

      <div className="mt-5 space-y-3">
        {items.map((i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
            <span>{i}</span>
          </div>
        ))}
      </div>

      <Link
        href={ctaHref}
        className={
          "mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-extrabold transition " +
          (highlight
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-slate-900 text-white hover:bg-slate-800")
        }
      >
        {ctaLabel} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="text-left rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-extrabold text-slate-900">{q}</p>
        <ChevronDown className={"h-5 w-5 text-slate-500 transition " + (open ? "rotate-180" : "")} />
      </div>
      {open && <p className="mt-3 text-sm text-slate-600 leading-relaxed">{a}</p>}
    </button>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-white font-extrabold">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-white/60">
        {items.map((i) => (
          <li key={i} className="hover:text-white/85 transition">{i}</li>
        ))}
      </ul>
    </div>
  );
}
