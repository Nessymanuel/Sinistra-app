import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "./db"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email?: string | null
      name?: string | null
      role: string
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sinistra Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const isValid = await compare(credentials.password, user.hashedPassword)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = (user as any).role
        // @ts-ignore
        token.id = (user as any).id
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id as string,
          email: session.user?.email ?? null,
          name: session.user?.name ?? null,
          role: token.role as string,
        },
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "sua-chave-secreta-aqui-mudar-em-producao",
}

const handler = NextAuth(authOptions)

export default handler
