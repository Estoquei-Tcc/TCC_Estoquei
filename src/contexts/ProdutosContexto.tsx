import { createContext, useContext, useState, type ReactNode } from "react";
import { type ProdutoTipo } from "../types/ProdutoTipo";

type ProdutoContextoTipo = {
    produtos: ProdutoTipo[];
    adicionarProduto: (produto: ProdutoTipo) => void;
    editarProduto: (produto: ProdutoTipo) => void;
    categorias: string[];
    adicionarCategoria: (categoria: string) => void;
};

const ProdutoContexto = createContext<ProdutoContextoTipo | undefined>(
    undefined
);

type ProdutoProviderProps = {
    children: ReactNode;
};

export const ProdutoProvider = ({ children }: ProdutoProviderProps) => {

    const produto1: ProdutoTipo = {nome: 'Arroz', codigo: 1, descricao: 'Pacote 5kg', categoria: 'Alimentos', marca: 'Camil', precoCusto: 10, precoVenda: 20, fornecedor: 'Claudinho', estoque: 10, qtdMin: 15, qtdMax: 50, status: 'Baixo'  }

    const produto2: ProdutoTipo = {nome: 'Calça', codigo: 2, descricao: 'jeans', categoria: 'Roupas', marca: 'C&A', precoCusto: 100, precoVenda: 200, fornecedor: 'Hering', estoque: 20, qtdMin: 5, qtdMax: 20, status: 'Cheio'  }

    const produto3: ProdutoTipo = {nome: 'Celular', codigo: 3, descricao: 'S23', categoria: 'Eletrônicos', marca: 'Samsung', precoCusto: 3000, precoVenda: 4000, fornecedor: 'Samsung', estoque: 0, qtdMin: 3, qtdMax: 10, status: 'Esgotado'  }


    const [produtos, setProdutos] = useState<ProdutoTipo[]>([produto1, produto2, produto3]); 

    const [categorias, setCategorias] = useState<string[]>([ "Eletrônicos", "Roupas", "Alimentos"]);

    const adicionarProduto = (produto: ProdutoTipo) => {
        setProdutos((produtosAtuais) => [...produtosAtuais, produto]);
    };

    const adicionarCategoria = (categoria: string) => {
        setCategorias((categoriasAtuais) => [...categoriasAtuais, categoria]);
    };

    const editarProduto = (produtoEditado: ProdutoTipo) => {
        setProdutos((produtosAtuais) =>
            produtosAtuais.map((produto) =>
                produto.codigo === produtoEditado.codigo
                    ? produtoEditado
                    : produto
            )
        );
    };    

    return (
        <ProdutoContexto.Provider value={{ produtos, adicionarProduto, editarProduto, categorias,adicionarCategoria }}>
            {children}
        </ProdutoContexto.Provider>
    );
};

export const useProdutos = () => {
    const contexto = useContext(ProdutoContexto);

    if (!contexto) {
        throw new Error(
            "useProdutos deve ser utilizado dentro de ProdutoProvider"
        );
    }

    return contexto;
};
