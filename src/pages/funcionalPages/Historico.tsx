import estilos from "./Historico.module.css";
import { useNavigate } from "react-router-dom";

const Historico = () => {
    const movimentosj = [
        {
            id: 1,
            produto: "Paçoca",
            marca: "Paçoquita",
            codigo: 14637,
            quantidade: 20,
            estoque: 30,
            entrasai: "Entrou",
        },
        {
            id: 2,
            produto: "Cereal",
            marca: "Sucrilhos",
            codigo: 33698,
            quantidade: 15,
            estoque: 25,
            entrasai: "Saiu",
        },
        {
            id: 3,
            produto: "Refrigetante",
            marca: "Pepsi",
            codigo: 54789,
            quantidade: 50,
            estoque: 80,
            entrasai: "Entrou",
        },
        {
            id: 4,
            produto: "Água",
            marca: "Crsital",
            codigo: 98870,
            quantidade: 9,
            estoque: 26,
            entrasai: "Saiu",
        },
        {
            id: 5,
            produto: "Chocolate",
            marca: "Garoto",
            codigo: 21114,
            quantidade: 14,
            estoque: 51,
            entrasai: "Saiu",
        },
        {
            id: 6,
            produto: "Papel Higiênico",
            marca: "Neve",
            codigo: 44442,
            quantidade: 32,
            estoque: 45,
            entrasai: "Entrou",
        },
        {
            id: 7,
            produto: "Suco de Uva",
            marca: "Del Valle",
            codigo: 56789,
            quantidade: 30,
            estoque: 5,
            entrasai: "Saiu",
        },
        {
            id: 8,
            produto: "Leite Fermentado",
            marca: "Yakult",
            codigo: 67543,
            quantidade: 22,
            estoque: 58,
            entrasai: "Saiu",
        },
        {
            id: 9,
            produto: "Desodorante",
            marca: "Rexona",
            codigo: 10989,
            quantidade: 11,
            estoque: 25,
            entrasai: "Entrou",
        },
        {
            id: 10,
            produto: "Detergente",
            marca: "Ypê",
            codigo: 33221,
            quantidade: 35,
            estoque: 55,
            entrasai: "Entrou",
        },
    ];

    const movimentosm = [
        {
            id: 1,
            produto: "Talco",
            marca: "Tenys-pé",
            codigo: 22331,
            quantidade: 12,
            estoque: 30,
            entrasai: "Saiu",
        },
        {
            id: 2,
            produto: "Bolacha Recheada",
            marca: "Bono",
            codigo: 55509,
            quantidade: 8,
            estoque: 17,
            entrasai: "Saiu",
        },
        {
            id: 3,
            produto: "Caixa de bombom",
            marca: "Lacta",
            codigo: 90001,
            quantidade: 20,
            estoque: 30,
            entrasai: "Entrou",
        },
        {
            id: 4,
            produto: "Achocolatado",
            marca: "Toddy",
            codigo: 44226,
            quantidade: 17,
            estoque: 23,
            entrasai: "Saiu",
        },
        {
            id: 5,
            produto: "Sabonete",
            marca: "Dove",
            codigo: 11111,
            quantidade: 11,
            estoque: 30,
            entrasai: "Entrou",
        },
        {
            id: 6,
            produto: "Shampoo",
            marca: "Elseve",
            codigo: 40439,
            quantidade: 20,
            estoque: 35,
            entrasai: "Entrou",
        },
        {
            id: 7,
            produto: "Pão de forma",
            marca: "Panco",
            codigo: 32034,
            quantidade: 12,
            estoque: 25,
            entrasai: "Entrou",
        },
        {
            id: 8,
            produto: "Sorvete",
            marca: "Nestle",
            codigo: 23097,
            quantidade: 10,
            estoque: 25,
            entrasai: "Entrou",
        },
        {
            id: 9,
            produto: "Cotonete",
            marca: "York",
            codigo: 98732,
            quantidade: 23,
            estoque: 30,
            entrasai: "Entrou",
        },
        {
            id: 10,
            produto: "Caderno",
            marca: "Jandaia",
            codigo: 23984,
            quantidade: 9,
            estoque: 15,
            entrasai: "Entrou",
        },
    ];
    const navigate = useNavigate();

    const IrParaRegistro = () => {
        navigate("/principal/registrarMovimento");
    };

    return (
        <div className={estilos.container}>
            <h1 className={estilos.titulo}>Historico</h1>
            <div className={estilos.texto}>
                <button className={estilos.comecar} onClick={IrParaRegistro}>
                    Registrar movimento
                </button>
            </div>
            <div className={estilos.conteudo}>
                <h2 className={estilos.mes}>Junho</h2>

                <table className={estilos.tabela}>
                    <thead>
                        <tr>
                            <th className={estilos.tipo}>Produto</th>
                            <th className={estilos.tipo}>Marca</th>
                            <th className={estilos.tipo}>Código</th>
                            <th className={estilos.tipo}>Quantidade</th>
                            <th className={estilos.tipo}>Estoque</th>
                            <th className={estilos.tipo}>Movimento</th>
                        </tr>
                    </thead>

                    <tbody>
                        {movimentosj.map((movimento) => (
                            <tr key={movimento.id}>
                                <td>{movimento.produto}</td>
                                <td>{movimento.marca}</td>
                                <td>{movimento.codigo}</td>
                                <td>{movimento.quantidade}</td>
                                <td>{movimento.estoque}</td>
                                <td>{movimento.entrasai}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className={estilos.mes}>Março</h2>

                <table className={estilos.tabela}>
                    <thead>
                        <tr>
                            <th className={estilos.tipo}>Produto</th>
                            <th className={estilos.tipo}>Marca</th>
                            <th className={estilos.tipo}>Código</th>
                            <th className={estilos.tipo}>Quantidade</th>
                            <th className={estilos.tipo}>Estoque</th>
                            <th className={estilos.tipo}>Movimento</th>
                        </tr>
                    </thead>

                    <tbody>
                        {movimentosm.map((movimento) => (
                            <tr key={movimento.id}>
                                <td>{movimento.produto}</td>
                                <td>{movimento.marca}</td>
                                <td>{movimento.codigo}</td>
                                <td>{movimento.quantidade}</td>
                                <td>{movimento.estoque}</td>
                                <td>{movimento.entrasai}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Historico;
