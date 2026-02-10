"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useClaims } from "./claims-context";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  Home,
  FilePlus2,
  ListChecks,
  Shield,
  LogOut,
  User2,
  ChevronDown,
} from "lucide-react";

type ShellProps = { children: React.ReactNode };

export default function AppShell({ children }: ShellProps) {
  const pathname = usePathname();
  const { claims } = useClaims();
  const { data: session, status } = useSession();

  const total = claims.length;
  const isLoggedIn = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const roleLabel =
    session?.user?.role === "admin"
      ? "Administrador"
      : session?.user?.role === "driver"
      ? "Condutor"
      : "Gestor Seguradora";

  const links = [
    { href: "/", label: "Início", icon: Home, show: true },
    { href: "/registrar", label: "Registar", icon: FilePlus2, show: isLoggedIn },
    { href: "/meus", label: "Meus sinistros", icon: ListChecks, show: isLoggedIn },
    { href: "/admin", label: "Admin", icon: Shield, show: isLoggedIn && isAdmin },
  ].filter((l) => l.show);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <header className={[
        "sticky top-0 z-50",
        pathname === "/" ? "header-transparent border-b-0" : "border-b border-slate-200 bg-white/85 backdrop-blur-xl",
      ].join(" ")}
>
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-3">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Image src="/LOGO-SINISTRA.svg" alt="Logo Sinistra" width={72} height={40} priority />
              </Link>

              <div className="hidden sm:block leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold tracking-tight">Sinistra</span>
                  {isLoggedIn && (
                    <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 text-[11px] font-semibold">
                      {total === 0 ? "0" : total} na sessão
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">Portal de Sinistros Automóvel</p>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
              {links.map((l) => (
                <NavPill key={l.href} href={l.href} active={pathname === l.href} icon={l.icon}>
                  {l.label}
                </NavPill>
              ))}
            </nav>

            {/* Right area */}
            <div className="flex items-center gap-2">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                aria-label="Abrir menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              {/* Auth / User */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserOpen((v) => !v)}
                    className="inline-flex items-center gap-2 h-10 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                  >
                    <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <User2 className="h-4 w-4" />
                    </div>
                    <div className="hidden sm:flex flex-col items-start leading-tight">
                      <span className="text-xs font-semibold text-slate-900 max-w-[180px] truncate">
                        {session?.user?.name ?? "Utilizador"}
                      </span>
                      <span className="text-[11px] text-slate-500">{roleLabel}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </button>

                  {userOpen && (
                    <>
                      <button
                        className="fixed inset-0 z-40 cursor-default"
                        aria-label="Fechar menu"
                        onClick={() => setUserOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 z-50 w-56 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-xs font-semibold truncate">{session?.user?.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{session?.user?.email}</p>
                        </div>

                        <div className="p-2">
                          <button
                            onClick={handleLogout}
                            className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-sm font-medium"
                          >
                            <LogOut className="h-4 w-4 text-slate-600" />
                            Sair
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="h-10 inline-flex items-center px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>

          {/* Mobile nav drawer */}
          {mobileOpen && (
            <div className="md:hidden pb-4">
              <div className="mt-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="p-2">
                  {links.map((l) => (
                    <MobileLink
                      key={l.href}
                      href={l.href}
                      active={pathname === l.href}
                      icon={l.icon}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </MobileLink>
                  ))}
                </div>

                {isLoggedIn && (
                  <div className="border-t border-slate-100 p-3 flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{session?.user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{roleLabel}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">{children}</main>

      <footer className="border-t border-slate-200 bg-slate-50 py-6 text-sm text-slate-600 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p>&copy; 2026 Sinistra - Portal de Sinistros Automóvel</p>
            <div className="flex gap-4">
              <Link href="/" className="hover:text-slate-900">Sobre</Link>
              <Link href="/" className="hover:text-slate-900">Contacto</Link>
              <Link href="/" className="hover:text-slate-900">Privacidade</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* classes utilitárias (mantive as tuas) */}
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

function NavPill({
  href,
  active,
  icon: Icon,
  children,
}: {
  href: string;
  active: boolean;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition",
        active
          ? "bg-white text-slate-900 shadow-sm border border-slate-200"
          : "text-slate-600 hover:text-slate-900 hover:bg-white/70",
      ].join(" ")}
    >
      <Icon className="h-4 w-4" />
      <span className="whitespace-nowrap">{children}</span>
    </Link>
  );
}

function MobileLink({
  href,
  active,
  icon: Icon,
  children,
  onClick,
}: {
  href: string;
  active: boolean;
  icon: any;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-sm font-semibold",
        active ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50 text-slate-700",
      ].join(" ")}
    >
      <Icon className={["h-4 w-4", active ? "text-blue-700" : "text-slate-500"].join(" ")} />
      {children}
    </Link>
  );
}
