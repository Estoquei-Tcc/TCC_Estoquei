import estilos from "./ModalCategoria.module.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Categoria = {
    nome: string;
};

const categoriaSchema = z.object({
    nome: z.string().min(1, {
        message: "Informe a categoria."
    })
});

type Props = {
    exibir: boolean;
    ocultar: () => void;
    criarCategoria: (categoria: string) => void;
};

export function ModalCategoria({exibir, ocultar, criarCategoria}: Props) {

    const categoriaForm = useForm<Categoria>({
        resolver: zodResolver(categoriaSchema)
    });

    const {
        register: registerCategoria,
        handleSubmit: handleSubmitCategoria,
        formState: { errors: errorsCategoria }
    } = categoriaForm;

    const cadastrarCategoria = (data: Categoria) => {
        criarCategoria(data.nome);
    };

    if (!exibir) {
        return null;
    }

    return (
        <div className={estilos.modal}>
            <div className={estilos.sobrepor}></div>

            <form
                className={estilos.container}
                onSubmit={handleSubmitCategoria(cadastrarCategoria)}
            >
                <h1>Cadastro de Categoria</h1>

                <div className={estilos.secaoCadastro}>
                    <div className={estilos.campo}>

                        <label htmlFor="nome">
                            Nome da categoria
                        </label>

                        <input
                            id="nome"
                            placeholder="Nome"
                            type="text"
                            {...registerCategoria("nome")}
                        />

                        {errorsCategoria.nome && (
                            <p className={estilos.mensagem}>
                                {errorsCategoria.nome.message}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        className={estilos.buttonEnviar}
                    >
                        Criar
                    </button>

                    <button
                        type="button"
                        className={estilos.buttonEnviar}
                        onClick={ocultar}
                    >
                        Fechar
                    </button>
                </div>
            </form>
        </div>
    );
}

