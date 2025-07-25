# Prestige Motors E-commerce

Bem-vindo ao Prestige Motors, um moderno template para a construção de aplicações React full-stack usando React Router.

## Estrutura de Pastas

A estrutura de pastas deste projeto foi projetada para ser escalável, modular e fácil de manter. Abaixo, uma descrição detalhada de cada diretório principal:

- **`/app`**: Contém o núcleo da sua aplicação React.
  - **`/app/routes`**: Define as rotas da aplicação, com cada arquivo correspondendo a uma rota específica.
  - **`/app/src`**: O coração do código-fonte da sua aplicação.
    - **`/app/src/assets`**: Armazena ativos estáticos como imagens, fontes e ícones.
    - **`/app/src/components`**: Componentes React reutilizáveis.
      - **`/common`**: Componentes genéricos que podem ser usados em várias partes da aplicação (ex: `Button`, `Input`).
      - **`/layout`**: Componentes de layout principais (ex: `NavigationBar`, `FooterBar`).
      - **`/pages`**: Componentes específicos de cada página, que consomem os componentes `common` e `layout`.
    - **`/app/src/data`**: Mock data ou dados estáticos para desenvolvimento e testes.
    - **`/app/src/hooks`**: Hooks React customizados para lógica reutilizável.
    - **`/app/src/lib`**: Funções utilitárias e bibliotecas auxiliares.
    - **`/app/src/pages`**: Páginas principais da aplicação, que consomem os componentes em `components/pages`.
    - **`/app/src/schemas`**: Schemas de validação (ex: Zod, Yup) para formulários e dados.
    - **`/app/src/services`**: Lógica de comunicação com APIs externas.
    - **`/app/src/store`**: Configuração de estado global (ex: Redux, Zustand).
    - **`/app/src/types`**: Definições de tipos TypeScript para o projeto.
    - **`/app/src/utils`**: Funções utilitárias diversas.

- **`/public`**: Arquivos estáticos que não são processados pelo Webpack, como `favicon.ico` e `robots.txt`.

- **`/build`**: Contém os arquivos de produção gerados após o build da aplicação.
  - **`/build/client`**: Ativos estáticos para o cliente.
  - **`/build/server`**: Código para o servidor.

## Features

- 🚀 Renderização no lado do servidor
- ⚡️ Hot Module Replacement (HMR)
- 📦 Bundling e otimização de ativos
- 🔄 Carregamento de dados e mutações
- 🔒 TypeScript por padrão
- 🎉 TailwindCSS para estilização
- 📖 [Documentação do React Router](https://reactrouter.com/)

## Primeiros Passos

### Instalação

Instale as dependências:

```bash
npm install
```

### Desenvolvimento

Inicie o servidor de desenvolvimento com HMR:

```bash
npm run dev
```

Sua aplicação estará disponível em `http://localhost:5173`.

## Build para Produção

Crie uma build de produção:

```bash
npm run build
```

## Deployment

### Docker

Para construir e rodar com Docker:

```bash
docker build -t my-app .

# Rode o container
docker run -p 3000:3000 my-app
```

A aplicação containerizada pode ser deployada em qualquer plataforma que suporte Docker, incluindo:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

Se você está familiarizado com o deploy de aplicações Node, o servidor de aplicação integrado está pronto para produção.

Certifique-se de fazer o deploy do output de `npm run build`:

```
├── package.json
├── package-lock.json (ou pnpm-lock.yaml, ou bun.lockb)
├── build/
│   ├── client/    # Ativos estáticos
│   └── server/    # Código do servidor
```

## Estilização

Este template vem com [Tailwind CSS](https://tailwindcss.com/) pré-configurado. Você pode usar qualquer framework CSS de sua preferência.

---

Construído com ❤️ usando React Router.
