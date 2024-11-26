import React from "react";
import HeaderMain from "../../components/HeaderMain"; // Usando o mesmo Header que os outros componentes
import * as styles from "./Posts.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// Validação do formulário com Yup
const validationPost = yup.object().shape({
  titulo: yup
    .string()
    .required("O título é obrigatório")
    .max(40, "Tamanho máximo de 40 caracteres"),
  descricao: yup
    .string()
    .required("A descrição é obrigatória")
    .max(100, "Tamanho máximo de 100 caracteres"),
  conteudo: yup
    .string()
    .required("O conteúdo é obrigatório")
    .max(5000, "Tamanho máximo de 5000 caracteres"),
});

export default function Posts() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationPost),
  });

  // Função para criar o post
  const addPost = async (data) => {
    try {
      await axios.post("https://6728c80c6d5fa4901b6ae263.mockapi.io/posts", data);
      navigate("/"); // Retorna ao feed após o cadastro
      console.log("Post criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar o post", error);
    }
  };

  return (
    <div>
      <HeaderMain /> {/* Mantendo consistência com o Feed */}
      <main>
        <div className={styles.cardPost}>
          <h1>Criar Postagem</h1>
          <div className={styles.linePost} />
          <div className={styles.cardBodyPost}>
            <form onSubmit={handleSubmit(addPost)}>
              <div className={styles.fields}>
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  {...register("titulo")}
                  aria-describedby="tituloError"
                  placeholder="Digite o título"
                />
                {errors.titulo && (
                  <p id="tituloError" className={styles.errorMessage}>
                    {errors.titulo.message}
                  </p>
                )}
              </div>

              <div className={styles.fields}>
                <label htmlFor="descricao">Descrição</label>
                <input
                  type="text"
                  id="descricao"
                  {...register("descricao")}
                  aria-describedby="descricaoError"
                  placeholder="Digite a descrição"
                />
                {errors.descricao && (
                  <p id="descricaoError" className={styles.errorMessage}>
                    {errors.descricao.message}
                  </p>
                )}
              </div>

              <div className={styles.fields}>
                <label htmlFor="conteudo">Conteúdo</label>
                <textarea
                  id="conteudo"
                  rows="10"
                  {...register("conteudo")}
                  aria-describedby="conteudoError"
                  placeholder="Digite o conteúdo"
                ></textarea>
                {errors.conteudo && (
                  <p id="conteudoError" className={styles.errorMessage}>
                    {errors.conteudo.message}
                  </p>
                )}
              </div>

              <div className={styles.btnPost}>
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
