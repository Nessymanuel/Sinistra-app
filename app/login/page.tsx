"use client"

import { signIn } from "next-auth/react"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Email ou senha inválidos")
      } else if (result?.ok) {
        router.push("/")
        router.refresh()
      }
    } catch {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/LOGO-SINISTRA.svg"
              alt="Logo Sinistra"
              width={80}
              height={45}
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Sinistra</h1>
          <p className="text-slate-600">Portal de Sinistros Automóvel</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Entrar</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-lg transition-colors mt-6"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-600 font-semibold mb-3">
              DEMO - Credenciais para teste:
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="bg-slate-50 p-2 rounded">
                <p className="font-semibold">Condutor:</p>
                <p>Email: condutor@sinistra.pt</p>
                <p>Senha: condutor123</p>
              </div>
              <div className="bg-slate-50 p-2 rounded">
                <p className="font-semibold">Admin:</p>
                <p>Email: admin@sinistra.pt</p>
                <p>Senha: admin123</p>
              </div>
              <div className="bg-slate-50 p-2 rounded">
                <p className="font-semibold">Seguradora:</p>
                <p>Email: seguradora@sinistra.pt</p>
                <p>Senha: seguradora123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Link para home */}
        <p className="text-center text-sm text-slate-600 mt-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Voltar à página inicial
          </Link>
        </p>
      </div>
    </div>
  )
}
