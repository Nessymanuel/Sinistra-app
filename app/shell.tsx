 "use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClaims } from "./claims-context";

type ShellProps = {
  children: React.ReactNode;
};

export default function AppShell(props: ShellProps) {
  const pathname = usePathname();
  const { claims } = useClaims();

  const total = claims.length;

  return (
    <div className="bg-white-500 min-h-screen text-slate-900">
      <header className="border-b bg-white-100 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/LOGO-SINISTRA.svg"
                alt="Logo Sinistra"
                width={72}
                height={40}
                priority
              />
            </Link>
            <div className="hidden sm:block">
              <p className="text-[11px] font-semibold tracking-wide text-cyan-400 uppercase">
                Sinistra
              </p>
              <h1 className="text-base md:text-lg font-semibold">
                Portal de Sinistros Automóvel
              </h1>
              <p className="text-[11px] text-slate-300">
                Registo e acompanhamento simples de sinistros entre condutores e
                seguradoras.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <nav className="flex flex-wrap gap-2 text-sm">
              <NavLink href="/" label="Início" activePath={pathname} />
              <NavLink
                href="/registrar"
                label="Registar sinistro"
                activePath={pathname}
              />
              <NavLink
                href="/meus"
                label="Meus sinistros"
                activePath={pathname}
              />
              <NavLink
                href="/admin"
                label="Área admin"
                activePath={pathname}
              />
            </nav>
            <p className="text-[11px] text-slate-300">
              {total === 0
                ? "Nenhum sinistro registado nesta sessão."
                : total === 1
                ? "1 sinistro registado nesta sessão."
                : total + " sinistros registados nesta sessão."}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">{props.children}</main>

      <style>{`
        .input {
          @apply w-full border border-slate-300 rounded-md px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white;
        }
        .label {
          @apply text-xs font-medium text-slate-700;
        }
        .section-card {
          @apply bg-white rounded-xl shadow-sm border border-slate-100 p-5 md:p-6;
        }
      `}</style>
    </div>
  );
}

type NavLinkProps = {
  href: string;
  label: string;
  activePath: string;
};

function NavLink(props: NavLinkProps) {
  const active = props.activePath === props.href;

  return (
    <Link
      href={props.href}
      className={
        "px-3 py-1.5 rounded-full border text-xs md:text-sm transition-colors " +
        (active
          ? "bg-cyan-400 text-black border-cyan-300"
          : "bg-black text-slate-100 border-slate-700 hover:bg-slate-900")
      }
    >
      {props.label}
    </Link>
  );
}


