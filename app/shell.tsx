 "use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClaims } from "./claims-context";
import { useSession, signOut } from "next-auth/react";

type ShellProps = {
  children: React.ReactNode;
};

export default function AppShell(props: ShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { claims } = useClaims();
  const { data: session, status } = useSession();

  const total = claims.length;
  const isLoggedIn = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 flex flex-col">
      <header className="border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-500 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Image
                src="/LOGO-SINISTRA.svg"
                alt="Logo Sinistra"
                width={72}
                height={40}
                priority
              />
            </Link>
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold tracking-widest text-blue-100 uppercase">
                Sinistra
              </p>
              <h1 className="text-base md:text-lg font-bold text-white">
                Portal de Sinistros
              </h1>
              <p className="text-[10px] text-blue-100">
                Simples, transparente, seguro
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <nav className="flex flex-wrap gap-1 text-sm">
              <NavLink href="/" label="Início" activePath={pathname} />
              {isLoggedIn && (
                <>
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
                  {isAdmin && (
                    <NavLink
                      href="/admin"
                      label="⚙️ Admin"
                      activePath={pathname}
                    />
                  )}
                </>
              )}
            </nav>

            {/* User Info & Auth Section */}
            <div className="border-l border-blue-400 pl-3 md:pl-6 flex items-center justify-between md:justify-end gap-3">
              {isLoggedIn ? (
                <>
                  <div className="hidden md:block text-right">
                    <p className="text-[11px] text-blue-100 font-medium">
                      {session?.user?.name}
                    </p>
                    <p className="text-[10px] text-blue-200">
                      {session?.user?.role === "admin"
                        ? "Administrador"
                        : session?.user?.role === "driver"
                        ? "Condutor"
                        : "Gestor Seguradora"}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs md:text-sm font-medium rounded-lg transition-colors"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-1.5 bg-blue-100 hover:bg-white text-blue-600 text-xs md:text-sm font-medium rounded-lg transition-colors"
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Info bar */}
        {isLoggedIn && (
          <div className="bg-blue-700 border-t border-blue-500 px-4 py-2">
            <div className="max-w-6xl mx-auto text-[11px] text-blue-100">
              {total === 0
                ? "Nenhum sinistro registado nesta sessão"
                : total === 1
                ? "1 sinistro registado nesta sessão"
                : total + " sinistros registados nesta sessão"}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">{props.children}</main>

      <footer className="border-t border-slate-200 bg-slate-50 mt-12 py-6 text-sm text-slate-600 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2026 Sinistra - Portal de Sinistros Automóvel</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/" className="hover:text-slate-900">Sobre</Link>
              <Link href="/" className="hover:text-slate-900">Contacto</Link>
              <Link href="/" className="hover:text-slate-900">Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>

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
        "px-3 py-1.5 rounded-lg border text-xs md:text-sm font-medium transition-all " +
        (active
          ? "bg-blue-700 text-white border-blue-700 shadow-sm"
          : "text-blue-100 border-blue-400 hover:bg-blue-600 hover:border-blue-500")
      }
    >
      {props.label}
    </Link>
  );
}


