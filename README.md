# Fable

Fable é um projeto desenvolvido com Vite, React e TypeScript. Ele utiliza uma estrutura modular com componentes, páginas e utilitários bem organizados, além de boas práticas como linting e tipagem estática. Ele e pensado para ser uma aplicação com funcionalidades de login como criar conta e fazer o login de fato e nesse sistema o usuário poderia comprar jogos e ver os jogos que ele tem comprado em sua biblioteca se baseando como a steam funciona hoje 

## Participantes 

Nome: Renan Cesar Silveira / RA:12523216913 

Nome: Julia Freitas Nascimento / RA:12523214930

Nome: Lucas Machado da Silva / RA:1252325224 

Nome: Stefani Santos Dias / RA:1252326904 

## 📂 Estrutura do Projeto
```
src
├── App.tsx
├── assets
│   └── react.svg
├── components
│   ├── gameCard
│   │   ├── index.tsx
│   │   └── styles.module.css
│   └── warning
│       ├── index.tsx
│       └── styles.module.css
├── index.css
├── main.tsx
├── pages
│   ├── home
│   │   ├── index.tsx
│   │   └── style.module.css
│   ├── Login
│   │   ├── index.tsx
│   │   └── style.module.css
│   └── Register
│       ├── index.tsx
│       └── style.module.css
├── utils
│   ├── Auth.ts
│   └── cookieUtils.ts
└── vite-env.d.ts
```

## 🚀 Tecnologias Utilizadas

- [Vite](https://vitejs.dev/) para build e desenvolvimento rápido.
- [React](https://react.dev/) para a criação da interface de usuário.
- [TypeScript](https://www.typescriptlang.org/) para tipagem estática.
- [React Router](https://reactrouter.com/) para roteamento.
- [Axios](https://axios-http.com/) para chamadas HTTP.
- [Lucide React](https://lucide.dev/) para ícones.
- [ESLint](https://eslint.org/docs/latest/) para padronização e qualidade do código.

## ⚙️ Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão recomendada: 18.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🔧 Como Rodar o Projeto

1. **Clone o repositório:**

  ```bash
   git clone https://github.com/julia1923/FableFrontend
   cd FableFrontend
  ```

2. **Instalar as dependências:**

  ```bash
    npm install
    # ou
    yarn install
  ```

3. **Inicie o servidor de desenvolvimento:**

  ```bash
    npm run dev
    # ou
    yarn dev
  ```

4. **Acesse o projeto:**

  ```bash
    O projeto estará disponível em http://localhost:5173.
  ```

## 🔧 Scripts Disponíveis

* npm run dev: Inicia o servidor de desenvolvimento.
* npm run build: Faz o build para produção.
* npm run preview: Inicia um servidor para pré-visualizar o build.
* npm run lint
