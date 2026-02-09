"use client";

import { Claim, ClaimStatus, useClaims } from "../claims-context";

export default function AdminPage() {
  const { claims, updateStatus } = useClaims();

  if (claims.length === 0) {
    return (
      <section className="section-card max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-1">Gestão de sinistros</h2>
        <p className="text-sm text-slate-600">
          Ainda não existem sinistros para gerir. Assim que um condutor submeter
          um registo, ele aparecerá aqui.
        </p>
      </section>
    );
  }

  return (
    <section className="section-card max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">Gestão de sinistros</h2>
          <p className="text-xs text-slate-600">
            Altere o estado de cada sinistro de forma rápida. Use isto como
            apoio à análise interna da seguradora.
          </p>
        </div>
        <span className="text-[11px] text-slate-500">
          {claims.length} registo(s)
        </span>
      </div>

      <div className="overflow-x-auto text-xs">
        <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-slate-700">
                Nº
              </th>
              <th className="px-3 py-2 text-left font-semibold text-slate-700">
                Data / Local
              </th>
              <th className="px-3 py-2 text-left font-semibold text-slate-700">
                Veículo
              </th>
              <th className="px-3 py-2 text-left font-semibold text-slate-700">
                Seguradora
              </th>
              <th className="px-3 py-2 text-left font-semibold text-slate-700">
                Feridos
              </th>
              <th className="px-3 py-2 text-left font-semibold text-slate-700">
                Estado
              </th>
              <th className="px-3 py-2 text-left font-semibold text-slate-700">
                Criado em
              </th>
            </tr>
          </thead>
          <tbody>
            {claims.map(function (c, index) {
              const zebra = index % 2 === 0 ? "bg-white" : "bg-slate-50/60";
              return (
                <tr key={c.id} className={zebra + " border-t border-slate-200"}>
                  <td className="px-3 py-2 font-semibold text-slate-900">
                    #{c.id}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col">
                      <span>{c.dataAcidente}</span>
                      <span className="text-[11px] text-slate-500">
                        {c.local}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-[11px]">
                      {c.matricula || "—"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-[11px]">
                      {c.seguradora || "—"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] " +
                        (c.temFeridos === "sim"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100")
                      }
                    >
                      {c.temFeridos === "sim" ? "Com feridos" : "Sem feridos"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={c.status}
                      onChange={function (e) {
                        updateStatus(c.id, e.target.value as ClaimStatus);
                      }}
                      className="border border-slate-300 rounded-md px-2 py-1 text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Em análise">Em análise</option>
                      <option value="Aprovado">Aprovado</option>
                      <option value="Recusado">Recusado</option>
                      <option value="Concluído">Concluído</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 text-[11px] text-slate-500">
                    {c.criadoEm}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

