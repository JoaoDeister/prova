// Importação do ícone e Link
import Back from '../../assets/back-button.svg';  // Importa a imagem do botão de "voltar" (ícone)
import { Link } from 'react-router-dom';  // Importa o componente Link para navegação entre páginas

export default function Header() {
  return (
    <header>  {/* Componente de cabeçalho */}
      <div className="container">  {/* Container que envolve o conteúdo do cabeçalho */}
        
        <Link to="/" aria-label="Go back to the homepage">  {/* Link para a página inicial, acessível com o atributo aria-label */}
          <img 
            src={Back}  /* Define a fonte da imagem como o arquivo de ícone importado */
            alt="Back button"  /* Texto alternativo para a imagem, melhora a acessibilidade */
            className="back-button"  /* Aplica a classe CSS para estilizar o ícone */
            width="50"  /* Define a largura da imagem para 50px */
            height="50"  /* Define a altura da imagem para 50px, mantendo a proporção */
          />
        </Link>
      </div>
    </header>
  );
}
