import estilos from "./Menu.module.css";
import Logo from "../../assets/LogoBranca.png";

import { NavLink } from "react-router-dom";

import { RxExit } from "react-icons/rx";

export default function Menu() {
    return (
        <aside className={estilos.container}>
            <div className={estilos.logo}>
                <img src={Logo} />
                <h2>Estoquei!</h2>
            </div>

            <nav>
                <NavLink end className={estilos.link} to="/principal">
                    Sobre nós
                </NavLink>

                <NavLink className={estilos.link} to="/principal/dashboard">
                    Dashboard
                </NavLink>

                <NavLink className={estilos.link} to="/principal/cadastroProd">
                    Cadastro de Produtos
                </NavLink>

                <NavLink className={estilos.link} to="/principal/listaProdutos">
                    Lista de Produtos
                </NavLink>

                <NavLink
                    className={estilos.link}
                    to="/principal/registrarMovimento"
                >
                    Registrar Movimento
                </NavLink>

                <NavLink className={estilos.link} to="/principal/historico">
                    Histórico
                </NavLink>

                <NavLink className={estilos.link} to="/principal/relatorios">
                    Relatórios
                </NavLink>

                <NavLink className={`${estilos.link} ${estilos.sair}`} to="/">
                    <RxExit className={estilos.icone} />
                    Sair
                </NavLink>
            </nav>
        </aside>
    );
}
