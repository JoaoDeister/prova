// Importação do componente Header
import Header from "../../components/Header";  // Importa o componente 'Header' para ser utilizado na página 'More'

export default function More() {  // Define o componente funcional 'More' que será renderizado
  return (
    <div>  {/* Elemento contêiner para envolver o conteúdo da página */}
      <Header/>  {/* Insere o componente Header na página 'More', exibindo o cabeçalho */}
      
      <h1>More</h1>  {/* Exibe o título "More" na página */}
    </div>
  );
}
