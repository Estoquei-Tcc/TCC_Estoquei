import estilos from "./Cabecalho.module.css";
import { FaRegUserCircle } from "react-icons/fa";

export default function Cabecalho() {
    return (
        <header className={estilos.container}>
            <div>
                <p className={estilos.eyebrow}>Painel de gestão</p>
                <strong>Controle seu estoque</strong>
            </div>
            <span className={estilos.perfil}>
                Ralfe
                <FaRegUserCircle className={estilos.icone} />
            </span>
        </header>
    );
}
