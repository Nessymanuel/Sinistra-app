import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Demo data - substituir por consulta real à BD
  const demo = [
    { id: "1", claimant: "João", status: "Em análise" },
    { id: "2", claimant: "Maria", status: "Aprovado" },
  ]

  return NextResponse.json({ claims: demo })
}
