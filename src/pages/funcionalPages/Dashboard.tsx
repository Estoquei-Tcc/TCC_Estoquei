import NotificacaoAlerta from "../../components/NotificacaoAlerta";
import { useHistorico } from "../../contexts/HistoricoContexto";
import { useProdutos } from "../../contexts/ProdutosContexto";
import estilos from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const irParaHistorico = () => navigate("/principal/historico");
    const irParaProdutos = () => navigate("/principal/listaProdutos");
    const irParaCadastro = () => navigate("/principal/cadastroProd");
    const irParaRegistroMovimento = () => navigate("/principal/registrarMovimento");
    const irParaRelatorios = () => navigate("/principal/relatorios");
    const irParaDetalhes = () => navigate("/principal/listaProdutos");

    const { produtos } = useProdutos()

    const { movimentacoes } = useHistorico()

    return (
        <div className={estilos.container}>
            <h1 className={estilos.titulo}>DASHBOARD/INICIO</h1>

            <div className={estilos.layout}>
                {/*---------------- COLUNA PRINCIPAL ----------------*/}
                <div>
                   
                    <NotificacaoAlerta />
                    
                    <div className={estilos.cardsTrio}>
                        <div className={estilos.resumoCard} onClick={irParaProdutos}>
                            <p className={estilos.resumoLabel}>Total de produtos</p>
                            <p className={estilos.resumoValor}>{produtos.length}</p>
                            <p className={estilos.resumoSub}>{produtos.filter((p) => p.categoria).length} categorias</p>
                        </div>

                        <div className={estilos.resumoCard } onClick={irParaDetalhes}>
                            <p className={estilos.resumoLabel}>Produto em Destaque</p>
                            <p className={estilos.resumoValor}>Café premium 500g</p>
                           
                            <p className={estilos.resumoSub} style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={irParaDetalhes}>
                                Ver detalhes
                            </p>
                        </div>

                        <div className={estilos.resumoCard} onClick={irParaRelatorios}>
                            <p className={estilos.resumoLabel}>Vendas hoje</p>
                            <p className={estilos.resumoValor}>R$ 
                                {movimentacoes
                                    .filter((m) => 
                                        m.data.getDate() == new Date().getDate() && 
                                        m.data.getMonth() == new Date().getMonth() && 
                                        m.data.getFullYear() == new Date().getFullYear() 
                                    )
                                    .reduce((acumulador, valorAtual) => acumulador + valorAtual.precoTotal, 0)
                                    .toFixed(2)
                                    .replace('.',',')
                                }</p>

                            <p className={estilos.resumoSub}>
                                {movimentacoes
                                    .filter((m) => 
                                        m.data.getDate() == new Date().getDate() && 
                                        m.data.getMonth() == new Date().getMonth() && 
                                        m.data.getFullYear() == new Date().getFullYear() 
                                    )
                                    .reduce((acumulador, valorAtual) => acumulador + valorAtual.quantidade, 0)
                                } itens vendidos</p>
                        </div>
                    </div>

                    <div className={estilos.tabelaWrap}>
                        <div className={estilos.tabelaCabecalho}>
                            <span className={estilos.tabelaTitulo}>Últimas movimentações</span>
                            <button className={estilos.btnOrdenar} onClick={irParaHistorico}>
                                Ver histórico
                            </button>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>  
                                {movimentacoes.sort((a, b) => b.data.getTime() - a.data.getTime()).slice(0, 5).map((p) => {
                                    const produtoMovimentado = produtos.find((f) => f.codigo == p.codigoProduto)

                                    return(
                                        <tr>
                                            <td ><span className={p.entrasai == 'saida' ? estilos.Saida  : estilos.Entrada}>{p.entrasai.charAt(0).toUpperCase() + p.entrasai.slice(1)}</span></td>
                                            <td> {produtoMovimentado?.nome }</td>
                                            <td className={estilos.tdBold}>{p.quantidade}</td>
                                            <td className={estilos.tdMutado}>{p.data.toLocaleDateString('pt-br')}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/*---------------- COLUNA LATERAL ----------------*/}
                <div className={estilos.colunaLateral}>
                    <div className={estilos.cardAlerta} onClick={irParaProdutos }>
                        <p className={estilos.labelAlerta}>Alertas de estoque</p>
                        <p className={estilos.valorAlerta}>{produtos.filter((p) => p.status == "Baixo" || p.status == 'Esgotado').length}</p>
                        <p className={estilos.subAlerta}>{produtos.filter((p) => p.status == "Esgotado").length} esgotados, {produtos.filter((p) => p.status == "Baixo").length} baixos</p>
                    </div>

                    <div className={estilos.painel}>
                        <p className={estilos.tabelaTitulo} style={{ marginBottom: 12 }}>
                            Ações rápidas
                        </p>
                        <div className={estilos.colunaAcoes}>
                            <button className={estilos.btnAcaoRapida} onClick={irParaCadastro}>
                                Cadastrar produto
                            </button>
                            <button className={estilos.btnAcaoRapida} onClick={irParaRegistroMovimento}>
                                Registrar movimentação
                            </button>
                            <button className={estilos.btnAcaoRapida} onClick={irParaRelatorios}>
                                Ver relatórios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;