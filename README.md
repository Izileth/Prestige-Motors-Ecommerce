# Prestige Motors E-commerce

Bem-vindo ao Prestige Motors, um moderno template para a construção de aplicações React full-stack usando React Router.

## Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para promover modularidade, escalabilidade e clareza.

| Pasta          | Descrição                                                                              |
| :------------- | :------------------------------------------------------------------------------------- |
| **`/app`**     | Contém o núcleo da aplicação React, incluindo rotas e o código-fonte principal.        |
| **`/build`**   | Armazena os arquivos de produção gerados após o processo de build.                     |
| **`/public`**  | Contém arquivos estáticos que são servidos diretamente, como `favicon.ico` ou `robots.txt`. |
| **`.git`**     | Diretório do Git para controle de versão.                                              |
| **`node_modules`** | Armazena as dependências do projeto.                                                   |

---

### Diretório `/app`

O diretório `app` é o coração da aplicação.

| Subpasta    | Descrição                                                                                                    |
| :---------- | :------------------------------------------------------------------------------------------------------------- |
| **`/routes`** | Define as rotas da aplicação. Cada arquivo ou pasta aqui corresponde a uma URL, seguindo a convenção do React Router. |
| **`/src`**    | Contém todo o código-fonte da aplicação, organizado de forma modular.                                          |

---

### Diretório `/app/src`

Este diretório contém a lógica e os componentes da interface do usuário.

| Subpasta        | Descrição                                                                 | Conteúdo Principal                            |
| :-------------- | :------------------------------------------------------------------------ | :-------------------------------------------- |
| **`/assets`**     | Ativos estáticos como imagens, fontes e ícones.                           | `*.png`, `*.jpg`, `*.svg`                      |
| **`/components`** | Componentes React reutilizáveis, divididos por função.                    | `common/`, `layout/`, `pages/`, `ui/`         |
| **`/data`**       | Dados estáticos ou mockados para desenvolvimento e testes.                | `brands.ts`, `carousel.ts`                    |
| **`/hooks`**      | Hooks React customizados que encapsulam lógica de estado e efeitos.       | `useAuth.ts`, `useVehicle.ts`                 |
| **`/lib`**        | Funções utilitárias e bibliotecas auxiliares.                             | `cn.ts` (classnames), `price.ts`              |
| **`/pages`**      | Componentes que representam páginas completas da aplicação.               | `home/`, `vehicles/`, `profile/`               |
| **`/schemas`**    | Schemas de validação de dados (usando Zod, Yup, etc.).                    | `schema.ts`                                   |
| **`/services`**   | Lógica para interagir com APIs externas e serviços de backend.            | `api.ts`, `auth.ts`, `vehicle.ts`             |
| **`/store`**      | Configuração de gerenciamento de estado global (Redux, Zustand, etc.).    | `global.ts`, `slices/`                        |
| **`/types`**      | Definições de tipos e interfaces TypeScript para o projeto.               | `vehicle.ts`, `user.ts`, `response.ts`        |
| **`/utils`**      | Funções utilitárias genéricas.                                            | `format.ts`, `storage.ts`                     |

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
