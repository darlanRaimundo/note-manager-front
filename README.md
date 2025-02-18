# Note Manager Frontend

![GitHub repo size](https://img.shields.io/github/repo-size/darlanRaimundo/note-manager-front)
![GitHub last commit](https://img.shields.io/github/last-commit/darlanRaimundo/note-manager-front)
![GitHub license](https://img.shields.io/github/license/darlanRaimundo/note-manager-front)

O **Note Manager Frontend** é a interface do usuário para o projeto de gerenciamento de notas. Ele se comunica com a API desenvolvida em **Node.js com NestJS** para realizar operações de login, cadastro de usuários e gerenciamento de notas.

## Funcionalidades

- **Login e Cadastro de Usuários**: Permite aos usuários criar uma conta e fazer login para acessar as suas notas.
- **Gerenciamento de Notas**: Usuários autenticados podem criar, editar e excluir notas.

## Tecnologias Utilizadas

- **React.js**: Biblioteca principal para construção da interface.
- **Next.js**: Framework React para renderização do lado do servidor e geração de páginas estáticas.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript, aumentando a robustez e a manutenibilidade do código.

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/darlanRaimundo/note-manager-front.git

   cd note-manager-front
   ```

2. Instale as dependências:

   Certifique-se de ter o **Node.js** instalado, depois rode o seguinte comando:
   ```bash
   npm install
   ```
3. Variáveis de Ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione a URL da API backend:
   ```bash
   REACT_APP_API_URL=http://localhost:3000
   ```

5. Rode o projeto:

   Depois de instalar as dependências e configurar o arquivo `.env`, execute o comando:
   ```bash
   npm run dev
   ```

   A aplicação será iniciada e estará acessível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

- **src/app**: Contém as páginas principais da aplicação.
- **src/components**: Componentes reutilizáveis da interface, como botões, campos de formulário, etc.
- **src/lib**: Contém funções e módulos para o gerenciamento de sessão e definições de tipos e schemas.
- **src/services**: Arquivos responsáveis pelas requisições à API backend, como funções para login, cadastro e manipulação de notas.
- **src/middleware**: Contém a lógica para verificar o cookie e garantir que o usuário está autenticado antes de acessar as páginas protegidas.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
