import { useNavigate, useParams } from "react-router-dom";  // Importa funções de navegação e parâmetros de URL
import { useForm } from "react-hook-form";  // Importa o hook para controle de formulários
import axios from "axios";  // Importa a biblioteca axios para fazer requisições HTTP
import { yupResolver } from "@hookform/resolvers/yup";  // Importa o validador do Yup para integração com react-hook-form
import * as yup from "yup";  // Importa a biblioteca Yup para validação de dados
import { useEffect } from "react";  // Importa o hook useEffect para realizar ações após a renderização
import * as styles from "./Update.module.css";  // Importa os estilos específicos para a página de atualização
import HeaderMain from "../../components/HeaderMain";  // Importa o componente de cabeçalho com o botão de voltar

// Define o esquema de validação do formulário usando Yup
const validationPost = yup.object().shape({
  titulo: yup
    .string()
    .required("O título é obrigatório")  // Valida que o título é obrigatório
    .max(40, "Tamanho até 40 carac..."),  // Valida que o título não tenha mais que 40 caracteres
  descricao: yup
    .string()
    .required("A descrição é obrigatória")  // Valida que a descrição é obrigatória
    .max(100, "Tamanho até 100 carac..."),  // Valida que a descrição não tenha mais que 100 caracteres
  conteudo: yup
    .string()
    .required("O conteúdo é obrigatório")  // Valida que o conteúdo é obrigatório
    .max(5000, "Tamanho até 5000 carac.."),  // Valida que o conteúdo não tenha mais que 5000 caracteres
});

export default function Update() {
  const { id } = useParams();  // Obtém o parâmetro 'id' da URL (identificador do post)
  let navigate = useNavigate();  // Inicializa a função de navegação para redirecionamento

  // Efeito que será executado assim que o componente for montado
  useEffect(() => {
    // Realiza uma requisição GET para buscar os dados do post com o id fornecido
    axios
      .get(`https://6728c80c6d5fa4901b6ae263.mockapi.io/posts/${id}`)
      .then((response) => {
        reset(response.data);  // Preenche o formulário com os dados recebidos da API
        console.log(response.data);  // Exibe os dados do post no console
      })
      .catch(() => {
        console.log("Deu problema na req....");  // Exibe uma mensagem de erro no console caso a requisição falhe
      });
  }, [id]);  // O useEffect depende do 'id', executando novamente caso o id mude

  // Inicializa o hook useForm com o validador e funções necessárias
  const {
    register,  // Registra os campos do formulário
    handleSubmit,  // Função para submeter o formulário
    formState: { errors },  // Armazena os erros de validação
    reset,  // Função para resetar o formulário com novos dados
  } = useForm({ resolver: yupResolver(validationPost) });  // Integra o Yup com react-hook-form

  // Função para atualizar o post
  const updatePost = (data) => {
    axios
      .put(`https://6728c80c6d5fa4901b6ae263.mockapi.io/posts/${id}`, data)  // Realiza uma requisição PUT para atualizar o post
      .then(() => {
        navigate("/");  // Redireciona para a página inicial após a atualização
        console.log("Deu certo");  // Exibe uma mensagem de sucesso no console
      })
      .catch(() => console.log("Deu errado"));  // Exibe uma mensagem de erro caso a atualização falhe
  };

  return (
    <div>
      <HeaderMain /> {/* Exibe o cabeçalho com o botão de voltar */}
      <main>
        <div className={styles.cardPost}>
          <h1>Atualizar Postagem</h1> {/* Título da página */}
          <div className={styles.linePost} /> {/* Linha de separação */}
          <div className={styles.cardBodyPost}>
            <form onSubmit={handleSubmit(updatePost)}>  {/* Formulário que chama updatePost ao ser submetido */}
              <div className={styles.fields}>
                <label htmlFor="titulo">Titulo</label>  {/* Rótulo do campo título */}
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  {...register("titulo")}  // Registra o campo título com validação
                />
                <p className="error-message">{errors.titulo?.message}</p>  {/* Exibe a mensagem de erro, se houver */}
              </div>

              <div className={styles.fields}>
                <label htmlFor="descricao">Descrição</label>  {/* Rótulo do campo descrição */}
                <input
                  type="text"
                  name="descricao"
                  id="descricao"
                  {...register("descricao")}  // Registra o campo descrição com validação
                />
                <p className="error-message">{errors.descricao?.message}</p>  {/* Exibe a mensagem de erro, se houver */}
              </div>

              <div className={styles.fields}>
                <label htmlFor="conteudo">Conteúdo</label>  {/* Rótulo do campo conteúdo */}
                <textarea
                  name="conteudo"
                  id="conteudo"
                  cols="30"
                  rows="10"
                  {...register("conteudo")}  // Registra o campo conteúdo com validação
                ></textarea>
                <p className="error-message">{errors.conteudo?.message}</p>  {/* Exibe a mensagem de erro, se houver */}
              </div>

              <div className={styles.btnPost}>
                <button type="submit">Atualizar</button>  {/* Botão para enviar o formulário */}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
