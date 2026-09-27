import estilos from './NotificacaoAlerta.module.css'
import { useProdutos } from '../contexts/ProdutosContexto'

const NotificacaoAlerta = () => {

    const { produtos } = useProdutos()


    return(
        <div className={estilos.alerta} role="alert">
            <span>️️️️️️️️⚠️IMPORTANTE!⚠️</span>
            <p className={estilos.alertaTexto}>
                <strong>{produtos.filter((p) => p.status == 'Esgotado').length} produto(s) ESGOTADO(s)</strong> e{" "}
                <strong>{produtos.filter((p) => p.status == 'Baixo').length} com estoque BAIXO</strong> — verifique antes de
                fazer novas vendas.
            </p>
            
        </div>
    )
}


export default NotificacaoAlerta