"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClaims } from "../claims-context";

export default function RegistrarPage() {
  const { createClaim } = useClaims();
  const router = useRouter();

  function handleCreate(data: {
    dataAcidente: string;
    local: string;
    temFeridos: "sim" | "nao";
    descricao: string;
    matricula: string;
    seguradora: string;
  }) {
    createClaim({
      dataAcidente: data.dataAcidente,
      local: data.local,
      temFeridos: data.temFeridos,
      descricao: data.descricao,
      matricula: data.matricula,
      seguradora: data.seguradora,
    });
    router.push("/meus");
  }

  return <RegisterScreen onCreate={handleCreate} />;
}

type RegisterScreenProps = {
  onCreate: (data: {
    dataAcidente: string;
    local: string;
    temFeridos: "sim" | "nao";
    descricao: string;
    matricula: string;
    seguradora: string;
  }) => void;
};

function RegisterScreen(props: RegisterScreenProps) {
  const [step, setStep] = useState(1);

  const [dataAcidente, setDataAcidente] = useState("");
  const [horaAcidente, setHoraAcidente] = useState("");
  const [local, setLocal] = useState("");
  const [temFeridos, setTemFeridos] = useState<"sim" | "nao">("nao");
  const [matricula, setMatricula] = useState("");
  const [seguradora, setSeguradora] = useState("");
  const [descricao, setDescricao] = useState("");

  const passo1Valido = dataAcidente.trim() !== "" && local.trim() !== "";
  const passo2Valido =
    matricula.trim().length >= 4 && seguradora.trim().length >= 3;
  const passo3Valido = descricao.trim().length >= 10;

  function irParaProximoPasso() {
    if (step === 1 && !passo1Valido) {
      return;
    }
    if (step === 2 && !passo2Valido) {
      return;
    }
    setStep(function (old) {
      return old + 1;
    });
  }

  function irParaPassoAnterior() {
    setStep(function (old) {
      return Math.max(1, old - 1);
    });
  }

  function submeter() {
    if (!passo1Valido || !passo2Valido || !passo3Valido) {
      return;
    }
    props.onCreate({
      dataAcidente: dataAcidente + (horaAcidente ? " " + horaAcidente : ""),
      local: local,
      temFeridos: temFeridos,
      descricao: descricao,
      matricula: matricula,
      seguradora: seguradora,
    });
  }

  return (
    <section className="section-card max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">
            Registar novo sinistro de automóvel
          </h2>
          <p className="text-xs text-slate-600">
            Preencha os passos com calma. As perguntas mais importantes vêm
            primeiro.
          </p>
        </div>
        <StepIndicator atual={step} total={3} />
      </div>

      <div className="flex gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
        <StepChip numero={1} atual={step} label="Dados do acidente" />
        <StepChip numero={2} atual={step} label="Veículo e seguro" />
        <StepChip numero={3} atual={step} label="Descrição e confirmação" />
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="label">Data do acidente *</label>
            <input
              type="date"
              className="input"
              value={dataAcidente}
              onChange={function (e) {
                setDataAcidente(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label">Hora (opcional)</label>
            <input
              type="time"
              className="input"
              value={horaAcidente}
              onChange={function (e) {
                setHoraAcidente(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label">Local do acidente *</label>
            <input
              type="text"
              className="input"
              placeholder="Ex: Av. da Liberdade, Lisboa"
              value={local}
              onChange={function (e) {
                setLocal(e.target.value);
              }}
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Indique rua, cidade e, se possível, pontos de referência.
            </p>
          </div>
          <div>
            <label className="label">Houve feridos? *</label>
            <div className="flex gap-4 mt-1 text-sm">
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="feridos"
                  value="nao"
                  checked={temFeridos === "nao"}
                  onChange={function () {
                    setTemFeridos("nao");
                  }}
                />
                Não
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="feridos"
                  value="sim"
                  checked={temFeridos === "sim"}
                  onChange={function () {
                    setTemFeridos("sim");
                  }}
                />
                Sim, mesmo ligeiros
              </label>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="label">Matrícula do veículo *</label>
            <input
              type="text"
              className="input"
              placeholder="Ex: AA-00-AA"
              value={matricula}
              onChange={function (e) {
                setMatricula(e.target.value.toUpperCase());
              }}
            />
          </div>
          <div>
            <label className="label">Seguradora *</label>
            <input
              type="text"
              className="input"
              placeholder="Ex: Seguradora XPTO"
              value={seguradora}
              onChange={function (e) {
                setSeguradora(e.target.value);
              }}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Estes dados ajudam a seguradora a localizar a apólice correta e
            acelerar a análise.
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="label">
              Descrição resumida do que aconteceu *
            </label>
            <textarea
              className="input h-28 resize-none"
              placeholder="Explique, em linguagem simples, como ocorreu o acidente."
              value={descricao}
              onChange={function (e) {
                setDescricao(e.target.value);
              }}
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Seja objetivo, mas inclua detalhes como sentido de marcha, sinais
              de trânsito e manobras.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1">
            <p className="font-semibold text-slate-800">
              Confirme os dados antes de enviar
            </p>
            <p>Data: {dataAcidente || "—"}</p>
            <p>Hora: {horaAcidente || "—"}</p>
            <p>Local: {local || "—"}</p>
            <p>Feridos: {temFeridos === "sim" ? "Sim" : "Não"}</p>
            <p>Matrícula: {matricula || "—"}</p>
            <p>Seguradora: {seguradora || "—"}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          type="button"
          disabled={step === 1}
          onClick={irParaPassoAnterior}
          className={
            "text-xs px-3 py-2 rounded-md border " +
            (step === 1
              ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
              : "border-slate-200 text-slate-700 hover:bg-slate-50")
          }
        >
          Voltar
        </button>

        <div className="flex gap-2">
          {step < 3 && (
            <button
              type="button"
              onClick={irParaProximoPasso}
              disabled={
                (step === 1 && !passo1Valido) || (step === 2 && !passo2Valido)
              }
              className={
                "text-xs px-4 py-2 rounded-md font-medium " +
                ((step === 1 && !passo1Valido) || (step === 2 && !passo2Valido)
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700")
              }
            >
              Próximo passo
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={submeter}
              disabled={!passo3Valido}
              className={
                "text-xs px-4 py-2 rounded-md font-medium " +
                (!passo3Valido
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700")
              }
            >
              Submeter sinistro
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function StepIndicator(props: { atual: number; total: number }) {
  return (
    <div className="text-right text-[11px] text-slate-500">
      <p>
        Passo {props.atual} de {props.total}
      </p>
    </div>
  );
}

function StepChip(props: { numero: number; atual: number; label: string }) {
  const ativo = props.numero === props.atual;
  const concluido = props.numero < props.atual;

  return (
    <div
      className={
        "flex items-center gap-1 rounded-full px-3 py-1 border " +
        (ativo
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : concluido
          ? "border-emerald-400 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white")
      }
    >
      <span
        className={
          "w-4 h-4 flex items-center justify-center rounded-full text-[10px] " +
          (ativo
            ? "bg-blue-600 text-white"
            : concluido
            ? "bg-emerald-500 text-white"
            : "bg-slate-200 text-slate-700")
        }
      >
        {props.numero}
      </span>
      <span className="hidden sm:inline">{props.label}</span>
    </div>
  );
}

