import estilos from "./SobreNos.module.css";

export default function SobreNos() {
    return (
        <div className={estilos.container}>
            <section className={estilos.sobre}>
                <h1>Sobre o Projeto</h1>

                <p>
                    Nosso projeto de TCC da Etec Hortolândia tem como objetivo
                    desenvolver uma plataforma de gerenciamento de estoque
                    voltada para microempresas, criada para auxiliar
                    empreendedores no controle de produtos, fornecedores e
                    movimentações de estoque de forma simples, organizada e
                    eficiente.
                </p>

                <p>
                    O sistema foi desenvolvido pensando nas dificuldades
                    encontradas por pequenos negócios no gerenciamento de
                    informações importantes, como entradas, saídas e
                    acompanhamento dos produtos disponíveis. A plataforma busca
                    oferecer uma solução prática e acessível, permitindo que o
                    controle do estoque seja realizado de maneira mais rápida e
                    intuitiva.
                </p>

                <p>
                    Com uma interface organizada e de fácil utilização, o
                    projeto tem como propósito reduzir erros, melhorar a
                    administração dos recursos da empresa e facilitar a tomada
                    de decisões, contribuindo para uma gestão mais eficiente
                    mesmo para usuários com pouca experiência em sistemas de
                    gerenciamento.
                </p>
            </section>

            <h2>Integrantes do Grupo</h2>
            <section className={estilos.equipe}>
                <div className={estilos.imagemGrupo}>Foto do grupo</div>

                <div className={estilos.nomes}>
                    <p>Kauã da Silva Padovani</p>

                    <p>Miguel Camilo da Silva</p>

                    <p>Nicolas Henrique Chereda Pereira</p>

                    <p>Paulo Alves Estevão</p>
                </div>
            </section>
        </div>
    );
}
