import estilos from "./CadastroProdutos.module.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ModalCategoria } from "../../components/ModalCategoria";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProdutos } from "../../contexts/ProdutosContexto";
import { type StatusTipo } from "../../types/StatusTipo";

type cadastroFormValues = {
    nome: string;
    codigo: number;
    descricao: string;
    categoria: string;
    marca: string;
    precoCusto: number;
    precoVenda: number;
    fornecedor: string;
    estoque: number;
    qtdMin: number;
    qtdMax: number;
}

const cadastroSchema = z.object({
    nome: z.string().min(1),
    codigo: z.number().min(1),
    descricao: z.string().min(1),
    categoria: z.string().min(1),
    marca: z.string().min(1),
    precoCusto: z.number().min(1),
    precoVenda: z.number().min(1),
    fornecedor: z.string().min(1),
    estoque: z.number().min(1),
    qtdMin: z.number().min(1),
    qtdMax: z.number().min(1)
});

const CadastroProdutos = () => {

    const cadastroForm = useForm<cadastroFormValues>({
        resolver: zodResolver(cadastroSchema)
    });

    const {
        register,
        handleSubmit,
        setValue
    } = cadastroForm;

    const { adicionarProduto, adicionarCategoria, categorias } = useProdutos();

    const navigation = useNavigate();

    const [modalVisivel, setModalVisivel] = useState(false);


    const cadastrarProduto = (data: cadastroFormValues) => {

        let status: StatusTipo;

        if (data.estoque === 0) {
            status = "Esgotado";
        } else if (data.estoque <= data.qtdMin) {
            status = "Baixo";
        } else if (data.estoque >= data.qtdMax) {
            status = "Cheio";
        } else {
            status = "Normal";
        }

        const produto = {
            codigo: data.codigo,
            nome: data.nome,
            descricao: data.descricao,
            categoria: data.categoria,
            marca: data.marca,
            precoCusto: data.precoCusto,
            precoVenda: data.precoVenda,
            fornecedor: data.fornecedor,
            estoque: data.estoque,
            qtdMin: data.qtdMin,
            qtdMax: data.qtdMax,
            status: status
        };
 

        adicionarProduto(produto);

        navigation("/principal/listaProdutos");
    };

    const handleChange = (opcao: string) => {

        if (opcao === "adicionar") {
            setModalVisivel(true);
        }
    };

    const ocultarModal = () => {
        setModalVisivel(false);
    };

    const cadastrarCategoria = (categoria: string) => {

        adicionarCategoria(categoria)

        setValue("categoria", categoria);

        setModalVisivel(false);
    };

    return (
        <div className={estilos.container}>

            <h2 className={estilos.titulo}>
                Cadastro de Produto
            </h2>

            <p className={estilos.descricao}>
                Preencha as informações abaixo para cadastrar um novo produto.
            </p>

            <form
                className={estilos.formProduto}
                onSubmit={handleSubmit(cadastrarProduto)}
            >

                {/* ------------- SEÇÃO DE INFORMAÇÕES BÁSICAS ------------- */}

                <section className={estilos.secaoCadastro}>

                    <div className={estilos.campo}>

                        <label htmlFor="nome">
                            Nome do produto
                        </label>

                        <input
                            id="nome"
                            type="text"
                            placeholder="Digite o nome do produto"
                            {...register("nome")}
                        />

                    </div>

                    <div className={estilos.campo}>

                        <label htmlFor="codigo">
                            Código
                        </label>

                        <input
                            id="codigo"
                            type="number"
                            placeholder="Digite o código do produto"
                            {...register("codigo", {
                                valueAsNumber: true
                            })}
                        />

                    </div>

                    <div className={estilos.campo}>

                        <label htmlFor="descricao">
                            Descrição
                        </label>

                        <textarea
                            id="descricao"
                            placeholder="Digite a descrição do produto..."
                            {...register("descricao")}
                        />

                    </div>

                </section>


                {/* ------------- SEÇÃO DE CATEGORIAS E MARCAS ------------- */}

                <section className={estilos.secaoCadastro}>

                    <div className={estilos.campo}>

                        <label htmlFor="categoria">
                            Categoria
                        </label>

                        <select
                            id="categoria"
                            {...register("categoria")}
                            onChange={(e) => handleChange(e.target.value)}
                        >

                            <option selected disabled>
                                Selecione uma categoria
                            </option>

                            {categorias.map((categoria) => (
                                <option
                                    key={categoria}
                                    value={categoria}
                                >
                                    {categoria}
                                </option>
                            ))}

                            <option value="adicionar">
                                Adicionar
                            </option>
                        </select>

                    </div>


                    <div className={estilos.campo}>

                        <label htmlFor="marca">
                            Marca
                        </label>

                        <input
                            id="marca"
                            type="text"
                            placeholder="Digite a marca"
                            {...register("marca")}
                        />

                    </div>

                </section>


                {/* --------- SEÇÃO DE ESTOQUE E LIMITES ------------ */}

                <section
                    className={`${estilos.secaoCadastro} ${estilos.secao3}`}
                >

                    <div className={estilos.campo}>

                        <label htmlFor="estoque">
                            Estoque
                        </label>

                        <input
                            id="estoque"
                            type="number"
                            placeholder="0"
                            {...register("estoque", {
                                valueAsNumber: true
                            })}
                        />

                    </div>

                    <div className={estilos.campo}>

                        <label htmlFor="qtdMin">
                            Quantidade mínima:
                        </label>

                        <input
                            id="qtdMin"
                            type="number"
                            placeholder="0"
                            {...register("qtdMin", {
                                valueAsNumber: true
                            })}
                        />

                    </div>

                    <div className={estilos.campo}>

                        <label htmlFor="qtdMax">
                            Quantidade máxima:
                        </label>

                        <input
                            id="qtdMax"
                            type="number"
                            placeholder="0"
                            {...register("qtdMax", {
                                valueAsNumber: true
                            })}
                        />

                    </div>

                </section>


                {/* ------------- SEÇÃO DE VALORES E FORNECEDOR ------------- */}

                <section
                    className={`${estilos.secaoCadastro} ${estilos.secao3}`}
                >

                    <div className={estilos.campo}>

                        <label htmlFor="precoCusto">
                            Preço de custo
                        </label>

                        <input
                            id="precoCusto"
                            type="number"
                            placeholder="0,00"
                            {...register("precoCusto", {
                                valueAsNumber: true
                            })}
                        />

                    </div>

                    <div className={estilos.campo}>

                        <label htmlFor="precoVenda">
                            Preço de venda
                        </label>

                        <input
                            id="precoVenda"
                            type="number"
                            placeholder="0,00"
                            {...register("precoVenda", {
                                valueAsNumber: true
                            })}
                        />

                    </div>

                    <div className={estilos.campo}>

                        <label htmlFor="fornecedor">
                            Fornecedor
                        </label>

                        <input
                            id="fornecedor"
                            type="text"
                            placeholder="Digite o fornecedor"
                            {...register("fornecedor")}
                        />

                    </div>

                </section>


                {/* ------------- SEÇÃO BOTÃO CADASTRAR ------------- */}

                <section className={estilos.secaoCadastro}>
                    <button type="submit">
                        Cadastrar produto
                    </button>

                </section>

            </form>


            <ModalCategoria
                exibir={modalVisivel}
                ocultar={ocultarModal}
                criarCategoria={cadastrarCategoria}
            />

        </div>
    );
};

export default CadastroProdutos;

