import estilos from "./Layout.module.css";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import Rodape from "./Rodape";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className={estilos.gridContainer}>
            <Cabecalho />
            <Menu />
            <main>
                <Outlet />
            </main>
            <Rodape />
        </div>
    );
}
