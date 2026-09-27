import estilos from "./RegistrarMovimento.module.css";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { type StatusTipo } from "../../types/StatusTipo";
import { useProdutos } from "../../contexts/ProdutosContexto";
import { useHistorico } from "../../contexts/HistoricoContexto";

type movimentoFormValues = {
    codigoProduto: number;
    quantidade: number;
    entrasai: string;
    preco?: number;
    unitot?: string;
}

const registroSchema = z.object({
    codigoProduto: z.number().min(1, {
        message: "Informe o produto.",
    }),

    quantidade: z.number().min(1, {
        message: "Informe uma quantidade válida.",
    }),

    entrasai: z.string().min(1, {
        message: "Informe se entrou ou saiu.",
    }),

    unitot: z.string().optional(),

    preco: z.number().min(1, {
        message: "Informe um preço válido.",
    }).optional()
});

const RegistrarMovimento = () => {

    const { produtos, editarProduto } = useProdutos();
    const { guardarMovimento } = useHistorico();

    const registroForm = useForm<movimentoFormValues>({
        resolver: zodResolver(registroSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = registroForm;

    const registrarMovimento = (data: movimentoFormValues) => {

        //PROCURAR PRODUTO ESCOLHIDO
        const produto = produtos.find(
            (p) => p.codigo === data.codigoProduto
        );

        if (!produto) {
            alert("Produto não encontrado!");
            return;
        }

        //EDITAR AS INFORMAÇÕES DO PRODUTO
        let novoEstoque = produto.estoque;

        if (data.entrasai === "entrada") {
            novoEstoque += data.quantidade;
        }

        if (data.entrasai === "saida") {
            if (data.quantidade > produto.estoque) {
                alert("Não é possível retirar uma quantidade maior que o estoque.");
                return;
            }

            novoEstoque -= data.quantidade;
        }

        let status: StatusTipo;
            
        if (novoEstoque === 0) {
            status = "Esgotado";
        } else if (novoEstoque <= produto.qtdMin) {
            status = "Baixo";
        } else if (novoEstoque >= produto.qtdMax) {
            status = "Cheio";
        } else {
            status = "Normal";
        }
        
        editarProduto({
            ...produto,
            estoque: novoEstoque,
            status: status
        });

        /*GUARDAR MOVIMENTAÇÃO NO HISTÓRICO*/

        const valorUnidade = data.entrasai == 'saida' ? produto.precoVenda : produto.precoCusto

        const movimento = {
            codigoProduto: data.codigoProduto,
            quantidade: data.quantidade,
            entrasai: data.entrasai,
            data: new Date(),
            precoUnidade: valorUnidade,
            precoTotal: valorUnidade * data.quantidade,
        }

        guardarMovimento(movimento)

        alert("Movimento registrado com sucesso!");
    };

    return (
        <div className={estilos.container}>
            <div className={estilos.conteudo}>
                <form
                    className={estilos.formRegistrar}
                    onSubmit={handleSubmit(registrarMovimento)}
                >
                    <div className={estilos.registrar}>
                        <h1>Registrar movimento</h1>

                        <div className={estilos.campo}>
                            <label htmlFor="produto">Produto</label>

                            <select {...register("codigoProduto", {valueAsNumber: true})}>
                                <option disabled>
                                    Selecione um produto
                                </option>

                                {produtos.map((p) => (
                                    <option
                                        key={p.codigo}
                                        value={p.codigo}
                                    >
                                        {p.nome}
                                    </option>
                                ))}
                            </select>

                            {errors.codigoProduto && (
                                <p className={estilos.mensagem}>
                                    {errors.codigoProduto.message}
                                </p>
                            )}
                        </div>

                        <div className={estilos.campo}>
                            <label htmlFor="quantidade">
                                Quantidade
                            </label>

                            <input
                                id="quantidade"
                                placeholder="Quantidade"
                                type="number"
                                {...register("quantidade", {
                                    valueAsNumber: true,
                                })}
                            />

                            {errors.quantidade && (
                                <p className={estilos.mensagem}>
                                    {errors.quantidade.message}
                                </p>
                            )}
                        </div>

                        
                        <div className={estilos.campo}>
                            <label htmlFor="entrasai">
                                Entrada ou saída
                            </label>

                            <select {...register("entrasai")}>
                                <option value="" disabled>
                                    Selecionar
                                </option>

                                <option value="entrada">
                                    Entrada
                                </option>

                                <option value="saida">
                                    Saída
                                </option>
                            </select>

                            {errors.entrasai && (
                                <p className={estilos.mensagem}>
                                    {errors.entrasai.message}
                                </p>
                            )}
                        </div>

                        <div className={estilos.campo}>
                            <label
                                htmlFor="preco"
                                className={estilos.unitotLabel}
                            >
                                Preço
                            </label>

                            <p className={estilos.alerta}>
                                *Esse campo é opcional e só deve ser
                                preenchido caso o preço do produto seja
                                diferente do cadastrado*
                            </p>

                            <input
                                id="preco"
                                placeholder="Preço"
                                type="number"
                                {...register("preco", {
                                    setValueAs: (valor) => valor === "" ? undefined : Number(valor),
                                })}
                            />

                            <select
                                className={estilos.unitot}
                                {...register("unitot")}
                            >
                                <option disabled>
                                    Selecionar
                                </option>

                                <option value="uni">
                                    Unidade
                                </option>

                                <option value="tot">
                                    Total
                                </option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className={estilos.buttonEnviar}
                        >
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrarMovimento;