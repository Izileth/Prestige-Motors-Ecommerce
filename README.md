<p align="center">
  <img src="https://i.pinimg.com/736x/61/68/da/6168dad52605b78d08badb29d067a71a.jpg" alt="Prestige Motors Banner" width="200"/>
</p>


<h1 align="center">Prestige Motors</h1>

<div align="center">
  <p>Uma plataforma de e-commerce para compra e venda de veículos de luxo.</p>
</div>


<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router"/>
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux"/>
</p>

##  Sobre o Projeto <->

O Prestige Motors E-commerce é uma aplicação web completa para a comercialização de veículos de luxo, oferecendo uma experiência de usuário rica e funcionalidades robustas tanto para compradores quanto para vendedores. A plataforma permite que os usuários naveguem por um catálogo de veículos, negociem preços e concluam vendas de forma segura e eficiente.

##  Funcionalidades <->

- **Autenticação de Usuários:** Sistema completo de registro, login e recuperação de senha.
- **Catálogo de Veículos:** Navegue por uma vasta gama de veículos de luxo com filtros e pesquisa avançada.
- **Páginas de Detalhes:** Veja informações detalhadas, imagens e vídeos de cada veículo.
- **Negociações:** Inicie e gerencie negociações diretamente com os vendedores.
- **Dashboard de Usuário:** Acompanhe suas negociações, compras e vendas em um painel de controle intuitivo.
- **Gerenciamento de Veículos:** Vendedores podem criar, editar e gerenciar seus anúncios de veículos.
- **Sistema de Notificações:** Mantenha-se atualizado sobre o status de suas negociações e vendas.

##  Fluxo de Dados <->

### Entradas de Dados <->

As entradas de dados são os pontos onde os usuários inserem informações no sistema. As principais entradas são:

- **Registro de Usuário:**
  - **Dados:** `nome`, `email`, `senha`, `telefone`, `cpf`, `dataNascimento`
  - **Endpoint:** `POST /api/users/register`
- **Login de Usuário:**
  - **Dados:** `email`, `senha`
  - **Endpoint:** `POST /api/users/login`
- **Recuperação de Senha:**
  - **Dados:** `email`
  - **Endpoint:** `POST /api/users/forgot-password`
- **Criação de Veículo:**
  - **Dados:** `marca`, `modelo`, `ano`, `preço`, `descrição`, `imagens`, `vídeos`
  - **Endpoint:** `POST /api/vehicles`
- **Atualização de Veículo:**
  - **Dados:** `marca`, `modelo`, `ano`, `preço`, `descrição`, `imagens`, `vídeos`
  - **Endpoint:** `PUT /api/vehicles/:id`
- **Início de Negociação:**
  - **Dados:** `vehicleId`, `proposta`
  - **Endpoint:** `POST /api/negotiations`
- **Envio de Mensagem na Negociação:**
  - **Dados:** `mensagem`
  - **Endpoint:** `POST /api/negotiations/:id/messages`
- **Criação de Endereço:**
  - **Dados:** `rua`, `numero`, `cidade`, `estado`, `cep`
  - **Endpoint:** `POST /api/users/:id/addresses`

### Saídas de Dados <->

As saídas de dados são as informações que o sistema apresenta aos usuários. As principais saídas são:

- **Listagem de Veículos:**
  - **Descrição:** Exibe uma lista de veículos disponíveis para venda.
  - **Endpoint:** `GET /api/vehicles`
- **Detalhes do Veículo:**
  - **Descrição:** Mostra informações detalhadas de um veículo específico.
  - **Endpoint:** `GET /api/vehicles/:id`
- **Dashboard do Usuário:**
  - **Descrição:** Apresenta um resumo das atividades do usuário, como negociações, compras e vendas.
  - **Endpoints:** `GET /api/sales/transactions/:userId`, `GET /api/negotiations/user`
- **Listagem de Negociações:**
  - **Descrição:** Exibe as negociações em andamento do usuário.
  - **Endpoint:** `GET /api/negotiations/user`
- **Detalhes da Negociação:**
  - **Descrição:** Mostra o histórico de mensagens e o status de uma negociação.
  - **Endpoint:** `GET /api/negotiations/:id`

##  Tecnologias Utilizadas <->

- **Frontend:**
  - [React](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [Redux](https://redux.js.org/)
  - [Axios](https://axios-http.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Radix UI](https://www.radix-ui.com/)
  - [Lucide React](https://lucide.dev/)
- **Backend (inferido):**
  - Node.js com Express ou similar
  - Banco de dados relacional (ex: PostgreSQL) ou não relacional (ex: MongoDB)
- **Ferramentas de Desenvolvimento:**
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Zod](https://zod.dev/)

##  Como Executar o Projeto <->

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/prestige-motors-ecommerce.git
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione a URL da sua API: `VITE_API_URL=http://localhost:4242/api`
4. **Execute o projeto em moo de desenvolvimento:**
   ```bash
   npm run dev
   ```
5. **Acesse a aplicação em:** `http://localhost:3000`

## Estrutura do Projeto <->

A estrutura de arquivos do projeto é organizada da seguinte forma para garantir escalabilidade e manutenibilidade:

```
/
├── app/
│   ├── routes/            # Definição das rotas da aplicação (React Router)
│   │   ├── index.tsx      # Rota principal (/)
│   │   ├── about/         # Rotas da seção "Sobre"
│   │   ├── auth/          # Rotas de autenticação (login, registro)
│   │   └── ...            # Demais rotas da aplicação
│   ├── src/
│   │   ├── assets/        # Imagens, ícones e outros arquivos de mídia
│   │   ├── components/    # Componentes React reutilizáveis
│   │   │   ├── common/    # Componentes genéricos (ex: VehicleCard, VehicleFilter)
│   │   │   ├── layout/    # Componentes de estrutura (ex: Footer, TopBanner)
│   │   │   └── ui/        # Componentes de UI (ex: Button, Input, etc. - ShadCN)
│   │   ├── data/          # Dados estáticos (ex: listas de marcas, features)
│   │   ├── hooks/         # Hooks React personalizados (ex: useAuth, useVehicle)
│   │   ├── lib/           # Funções utilitárias (ex: cn, price, animations)
│   │   ├── pages/         # Componentes de página, organizados por rota
│   │   ├── schemas/       # Esquemas de validação de dados com Zod
│   │   ├── services/      # Funções para interagir com a API (Axios)
│   │   ├── store/         # Configuração do Redux Toolkit e Zustand
│   │   ├── types/         # Definições de tipos e interfaces TypeScript
│   │   └── utils/         # Funções utilitárias globais
│   ├── app.css            # Estilos globais da aplicação
│   └── root.tsx           # Componente raiz da aplicação
├── public/                # Arquivos estáticos (ex: favicon.ico, manifest.json)
├── build/                 # Arquivos de build da aplicação (cliente e servidor)
├── .dockerignore          # Arquivos a serem ignorados pelo Docker
├── .gitignore             # Arquivos a serem ignorados pelo Git
├── components.json        # Configuração de componentes (ShadCN/UI)
├── Dockerfile             # Configuração para containerizar a aplicação com Docker
├── package.json           # Dependências, scripts e metadados do projeto
├── tsconfig.json          # Configuração do compilador TypeScript
└── vite.config.ts         # Configuração do Vite (build tool)
```

### Arquitetura <->

O projeto segue uma arquitetura de componentes, comum em aplicações React, com uma clara separação de responsabilidades:

- **Apresentação (UI):** A pasta `app/src` contém toda a lógica de apresentação. Os `components` são divididos em `ui` (átomos de design), `common` (componentes de negócio) e `layout` (estrutura das páginas). As `pages` consomem esses componentes para montar as telas.
- **Gerenciamento de Estado:** O estado global é gerenciado principalmente pelo **Redux Toolkit**, com `slices` definidos na pasta `store`. O **Zustand** também é utilizado, possivelmente para estados mais simples ou locais.
- **Roteamento:** O **React Router** é responsável pelo roteamento, com as rotas sendo definidas de forma declarativa na pasta `app/routes`.
- **Comunicação com API:** A interação com o backend é abstraída na pasta `services`, que utiliza o **Axios** para fazer as requisições HTTP.
- **Validação de Dados:** Para garantir a integridade dos dados (ex: formulários), o **Zod** é utilizado para definir e aplicar esquemas de validação.
- **Estilização:** A estilização é feita com **Tailwind CSS**, permitindo a criação de interfaces modernas e responsivas de forma utilitária.
- **Build Tool:** O **Vite** é utilizado como ferramenta de build, proporcionando um desenvolvimento rápido e eficiente com Hot Module Replacement (HMR).