// Importação de hooks e estilos
import { Link, useNavigate } from "react-router-dom"; // Importa o Link para navegação de rotas e o hook useNavigate para navegação programática.
import * as styles from "./HeaderMain.module.css"; // Importa os estilos do arquivo CSS como um objeto de estilos.

export default function HeaderMain() {
  // Hook useNavigate para navegação programática
  const navigate = useNavigate(); 

  return (
    // Cabeçalho do componente
    <header className={styles.header}> 
      <div className={styles.container}> {/* Container principal que envolve todos os elementos do cabeçalho */}
        
        <div className={styles.leftSection}> {/* Seção à esquerda (botão Voltar) */}
          <button 
            onClick={() => navigate(-1)}  /* Função de navegação para voltar uma página no histórico */
            className={styles.backButton}  /* Estilo do botão de voltar */
            aria-label="Go back to the previous page"  /* Acessibilidade: descrição do botão */
          >
            Voltar  {/* Texto exibido no botão */}
          </button>
        </div>

        <div className={styles.logo}> {/* Seção do logo */}
          <h1>Curiosidades</h1> {/* Título principal (logo) do cabeçalho */}
        </div>

        <div className={styles.rightSection}> {/* Seção à direita (botão Novo Post) */}
          <Link to="/posts" aria-label="Create a new post"> {/* Link para a página de criar novo post */}
            <button className={styles.newPostButton}>Nova postagem</button>  {/* Botão para nova postagem */}
          </Link>
        </div>
      </div>
    </header>
  );
}
