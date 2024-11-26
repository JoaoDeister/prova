import React from 'react'
import { Routes, Route } from 'react-router-dom'  // Importa as funcionalidades de roteamento do React Router
import Feed from '../pages/Feed'  // Importa o componente Feed, que será exibido na página inicial
import Posts from '../pages/Posts'  // Importa o componente Posts, usado para criar novas postagens
import Update from '../pages/Update'  // Importa o componente Update, usado para editar postagens existentes
import More from '../pages/More'  // Importa o componente More, provavelmente usado para mostrar detalhes adicionais de uma postagem

export default function AppRoutes() {  // Define o componente AppRoutes que gerencia as rotas da aplicação
  return (
    <Routes>  // Componente que define as rotas da aplicação
        {/* Definindo as rotas com seus respectivos componentes */}

        <Route path='/' element={<Feed/>}></Route>  // Define a rota para o Feed, exibido na URL raiz '/'
        
        <Route path='/posts' element={<Posts/>}></Route>  // Define a rota para criar uma nova postagem, exibido em '/posts'
        
        <Route path='/update/:id' element={<Update/>}></Route>  // Define a rota para editar uma postagem, o parâmetro ':id' é usado para identificar qual postagem atualizar
        
        <Route path='/more/:id' element={<More/>}></Route>  // Define a rota para mostrar mais detalhes de uma postagem específica, o parâmetro ':id' é usado para identificar a postagem
        
    </Routes>
  )
}

