// Importação de dependências
import { Link } from "react-router-dom"; // Importa o Link do React Router para navegação entre páginas
import HeaderMain from "../../components/HeaderMain"; // Importa o componente de cabeçalho principal da aplicação
import * as styles from "./Feed.module.css"; // Importa os estilos CSS específicos para o Feed
import { useEffect, useState } from "react"; // Importa hooks do React para controlar estado e efeitos colaterais
import axios from "axios"; // Importa a biblioteca Axios para realizar requisições HTTP

// URL da API onde os posts são obtidos
const API_URL = "https://6728c80c6d5fa4901b6ae263.mockapi.io/posts";

// Componente Feed principal
export default function Feed() {
  // Definindo estados do componente
  const [posts, setPosts] = useState([]); // Estado para armazenar os posts
  const [expandedPosts, setExpandedPosts] = useState({}); // Estado para controlar quais posts estão expandidos
  const [error, setError] = useState(null); // Estado para armazenar erros, caso ocorram durante a requisição
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento da página

  // Função para obter os posts da API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL); // Faz uma requisição GET para a API
      setPosts(response.data); // Armazena os posts recebidos no estado
    } catch (err) {
      setError("Erro ao carregar os posts."); // Caso haja erro, armazena a mensagem de erro
    } finally {
      setLoading(false); // Independente do sucesso ou erro, altera o estado de carregamento
    }
  };

  // Função para apagar um post
  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Faz uma requisição DELETE para remover o post
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)); // Remove o post do estado local
    } catch (err) {
      setError("Erro ao tentar apagar o post."); // Caso haja erro, armazena a mensagem de erro
    }
  };

  // Função para alternar o estado expandido de um post (mostrar mais ou menos conteúdo)
  const toggleExpandPost = (id) => {
    setExpandedPosts((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id], // Alterna entre expandido ou não para o post com o id específico
    }));
  };

  // useEffect para carregar os posts quando o componente for montado
  useEffect(() => {
    fetchPosts(); // Chama a função para obter os posts
  }, []); // O array vazio [] garante que a requisição ocorra apenas uma vez quando o componente for montado

  // Retorno do JSX que define o layout da página
  return (
    <div>
      <HeaderMain /> {/* Renderiza o cabeçalho principal */}
      <main>
        {loading && <p className={styles.loading}>Carregando posts...</p>} {/* Exibe uma mensagem enquanto os posts estão sendo carregados */}
        {error && <p className={styles.errorMessage}>{error}</p>} {/* Exibe uma mensagem de erro se houver algum problema */}
        <div className={styles.cards}>
          {posts.map((post) => ( // Mapeia e renderiza cada post
            <div className={styles.card} key={post.id}>
              <header>
                <h2>{post.titulo}</h2> {/* Exibe o título do post */}
              </header>
              <div className={styles.line} /> {/* Linha separadora */}
              <p className={styles.previewText}>
                {!expandedPosts[post.id]
                  ? post.descricao.slice(0, 100) + (post.descricao.length > 100 ? "..." : "") // Exibe a descrição resumida se o post não estiver expandido
                  : post.descricao} {/* Exibe a descrição completa se o post estiver expandido */}
              </p>
              {expandedPosts[post.id] && (
                <div className={styles.additionalContent}>
                  <p>{post.conteudo}</p> {/* Exibe o conteúdo completo do post quando expandido */}
                </div>
              )}
              <div className={styles.btns}>
                <Link to={`/update/${post.id}`} className={styles.btnEdit}>
                  <button>Editar</button> {/* Botão para editar o post, leva à página de edição */}
                </Link>
                <button
                  onClick={() => toggleExpandPost(post.id)}
                  className={styles.btnReadMore}
                >
                  {expandedPosts[post.id] ? "Fechar" : "Leia Mais"} {/* Alterna entre expandir ou contrair o post */}
                </button>
                <div
                  className={styles.btnDelete}
                  onClick={() => deletePost(post.id)} 
                >
                  <button>Apagar</button> {/* Botão para excluir o post */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
