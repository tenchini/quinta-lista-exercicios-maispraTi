# Catálogo de Filmes - Atividade 5 (+praTi)

Este é um projeto de estudos desenvolvido como parte da **Atividade 5** do curso **Full-Stack Jr.** do programa **+praTi**. A aplicação consiste em um catálogo de filmes interativo, construído em **React**, que permite aos usuários explorar, pesquisar e salvar seus filmes preferidos.

---

## Visão Geral

A aplicação consome a API do [The Movie Database (TMDB)](https://www.themoviedb.org/) para fornecer uma experiência rica e dinâmica, permitindo que os usuários:

-   Busquem por filmes
-   Vejam informações detalhadas
-   Gerenciem uma lista de favoritos pessoal

---

## ✅ Funcionalidades Implementadas

O projeto cumpre todos os requisitos obrigatórios da atividade, além de funcionalidades extras para aprimorar a usabilidade e o design.

### ✔️ 1. Página de Busca

-   **Campo de busca por título:** Permite que o usuário digite o nome de um filme para pesquisar.
-   **Filtro por gênero:** Caixa de seleção para descobrir filmes por categorias específicas (Ação, Comédia, Drama, etc.).
-   **Filmes Populares:** Ao carregar, exibe uma lista de filmes populares no momento.

### ✔️ 2. Paginação

-   **Navegação intuitiva:** Botões de "Anterior" e "Próximo" para navegar entre páginas de resultados.
-   **Contador de página:** Mostra o número da página atual.

### ✔️ 3. Página de Detalhes

-   **Informações completas:** Ao clicar em um pôster, exibe:
    -   Pôster em alta qualidade
    -   Título e ano de lançamento
    -   Sinopse
    -   Avaliação dos usuários
    -   Diretor e elenco principal
-   **Botão de voltar:** Retorna à página de busca mantendo pesquisa e paginação anteriores.

### ✔️ 4. Lista de Favoritos

-   **Adicionar/Remover com um clique:** Ícone de coração ao passar o mouse sobre o pôster.
-   **Página de Favoritos:** Exibe os filmes salvos pelo usuário.
-   **Persistência:** Salva no `localStorage` para não perder dados ao fechar a página.

### ✔️ 5. Tratamento de Erros e Loading

-   **Feedback visual:** Indicadores de "Carregando..." durante busca de dados.
-   **Mensagens de erro:** Caso ocorra falha na API ou busca sem resultados.

---

## 🛠 Tecnologias Utilizadas

-   **[React](https://reactjs.org/):** Biblioteca para construção da interface.
-   **[Vite](https://vitejs.dev/):** Ferramenta de build moderna e rápida.
-   **[Axios](https://axios-http.com/):** Cliente HTTP para chamadas à API TMDB.
-   **[React Router DOM](https://reactrouter.com/):** Gerenciamento de rotas.
-   **[React Icons](https://react-icons.github.io/react-icons/):** Ícones (coração, setas, etc.).
-   **CSS3:** Estilização com Flexbox, Grid Layout e variáveis.

---

## 🚀 Como Executar o Projeto Localmente

### ✅ Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 16 ou superior)
-   [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
-   Chave da API do [TMDB](https://www.themoviedb.org/settings/api)

---

### 🔽 Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/tenchini/quinta-lista-exercicios-maispraTi
    ```

2. **Acesse a pasta do projeto:**

    ```bash
    cd meu-catalogo-filmes
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Configure as variáveis de ambiente:**

    ```bash
    VITE_API_KEY=sua_chave_de_api_aqui
    ```

5. **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

6. **Acesse no navegador:**
    ```bash
    http://localhost:5173
    ```
