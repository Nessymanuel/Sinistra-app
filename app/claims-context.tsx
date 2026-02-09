"use client";

import { createContext, useContext, useState } from "react";

export type ClaimStatus = "Em análise" | "Aprovado" | "Recusado" | "Concluído";

export type Claim = {
  id: number;
  dataAcidente: string;
  local: string;
  temFeridos: "sim" | "nao";
  descricao: string;
  matricula: string;
  seguradora: string;
  status: ClaimStatus;
  criadoEm: string;
};

type ClaimsContextValue = {
  claims: Claim[];
  createClaim: (data: Omit<Claim, "id" | "status" | "criadoEm">) => void;
  updateStatus: (id: number, status: ClaimStatus) => void;
};

const ClaimsContext = createContext<ClaimsContextValue | undefined>(undefined);

export function ClaimsProvider(props: { children: React.ReactNode }) {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [nextId, setNextId] = useState(1);

  function createClaim(data: Omit<Claim, "id" | "status" | "criadoEm">) {
    const novo: Claim = {
      id: nextId,
      status: "Em análise",
      criadoEm: new Date().toLocaleString(),
      ...data,
    };

    setClaims(function (old) {
      return [...old, novo];
    });
    setNextId(function (old) {
      return old + 1;
    });
  }

  function updateStatus(id: number, status: ClaimStatus) {
    setClaims(function (old) {
      return old.map(function (c) {
        if (c.id === id) {
          return { ...c, status: status };
        }
        return c;
      });
    });
  }

  return (
    <ClaimsContext.Provider
      value={{
        claims: claims,
        createClaim: createClaim,
        updateStatus: updateStatus,
      }}
    >
      {props.children}
    </ClaimsContext.Provider>
  );
}

export function useClaims() {
  const ctx = useContext(ClaimsContext);
  if (!ctx) {
    throw new Error("useClaims deve ser usado dentro de ClaimsProvider");
  }
  return ctx;
}

