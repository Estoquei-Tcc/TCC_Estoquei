import { createContext, useContext, useState, type ReactNode } from "react";
import type { MovimentoTipo } from "../types/MovimentoTipo";

type HistoricoContextoTipo = {
    movimentacoes: MovimentoTipo[];
    guardarMovimento: (movimento: MovimentoTipo) => void;
};

const HistoricoContexto = createContext<HistoricoContextoTipo | undefined>(
    undefined
);

type HistoricoProviderProps = {
    children: ReactNode;
};

export const HistoricoProvider = ({ children }: HistoricoProviderProps) => {

    const movimento1: MovimentoTipo = {codigoProduto: 1, quantidade: 2, data: new Date('2026-09-27'), entrasai: 'saida', precoUnidade: 10, precoTotal: 20}
    const movimento2: MovimentoTipo = {codigoProduto: 2, quantidade: 3, data: new Date('2026-09-27'), entrasai: 'entrada', precoUnidade: 200, precoTotal:600}
    const movimento3: MovimentoTipo = {codigoProduto: 3, quantidade: 1, data: new Date('2026-09-27'), entrasai: 'saida', precoUnidade: 4000, precoTotal: 20}


    const [movimentacoes, setMovimentacoes] = useState<MovimentoTipo[]>([movimento1, movimento2, movimento3]); 

    const guardarMovimento = (movimento: MovimentoTipo) => {
        setMovimentacoes((todasMovimentacoes) => [...todasMovimentacoes, movimento]);
    };


    return (
        <HistoricoContexto.Provider value={{ movimentacoes, guardarMovimento }}>
            {children}
        </HistoricoContexto.Provider>
    );
};

export const useHistorico = () => {
    const contexto = useContext(HistoricoContexto);

    if (!contexto) {
        throw new Error(
            "useProdutos deve ser utilizado dentro de ProdutoProvider"
        );
    }

    return contexto;
};
