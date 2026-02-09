"use client";

import { Claim, useClaims } from "../claims-context";

export default function MeusSinistrosPage() {
  const { claims } = useClaims();

  if (claims.length === 0) {
    return (
      <section className="section-card max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold mb-1">Meus sinistros</h2>
        <p className="text-sm text-slate-600">
          Ainda não existem sinistros registados nesta sessão. Utilize a opção
          &quot;Registar sinistro&quot; no topo para criar o primeiro registo.
        </p>
      </section>
    );
  }

  return (
    <section className="section-card max-w-4xl mx-auto space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">Meus sinistros</h2>
          <p className="text-xs text-slate-600">
            Veja rapidamente o estado de cada sinistro submetido.
          </p>
        </div>
        <span className="text-[11px] text-slate-500">
          {claims.length} sinistro(s) nesta sessão
        </span>
      </div>

      <ul className="space-y-2 text-sm">
        {claims.map(function (c) {
          return (
            <li
              key={c.id}
              className="border border-slate-200 rounded-lg bg-white px-3 py-2.5 flex flex-col gap-1 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  Sinistro #{c.id} · {c.matricula || "Matrícula não indicada"}
                </p>
                <p className="text-xs text-slate-600">
                  {c.dataAcidente} · {c.local}
                </p>
                {c.descricao && (
                  <p className="text-xs text-slate-700 mt-1 line-clamp-2">
                    {c.descricao}
                  </p>
                )}
              </div>
              <div className="text-right text-xs mt-1 md:mt-0">
                <p className="text-slate-500 mb-0.5">Estado</p>
                <StatusBadge status={c.status} />
                <p className="text-[11px] text-slate-400 mt-1">
                  Registado em {c.criadoEm}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function StatusBadge(props: { status: Claim["status"] }) {
  var classes = "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] ";
  if (props.status === "Em análise") {
    classes += "bg-blue-50 text-blue-700 border border-blue-100";
  } else if (props.status === "Aprovado") {
    classes += "bg-emerald-50 text-emerald-700 border border-emerald-100";
  } else if (props.status === "Recusado") {
    classes += "bg-rose-50 text-rose-700 border border-rose-100";
  } else {
    classes += "bg-slate-100 text-slate-700 border border-slate-200";
  }

  return <span className={classes}>{props.status}</span>;
}

