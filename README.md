<div align="center">
  <img src="https://raw.githubusercontent.com/MaroLipe/prestige-motors-logo/main/logo-prestige-motors.png" alt="Prestige Motors Logo" width="200"/>
  <h1>Prestige Motors E-commerce</h1>
  <p>Uma plataforma de e-commerce para compra e venda de veículos de luxo.</p>
</div>

## 📜 Sobre o Projeto

O Prestige Motors E-commerce é uma aplicação web completa para a comercialização de veículos de luxo, oferecendo uma experiência de usuário rica e funcionalidades robustas tanto para compradores quanto para vendedores. A plataforma permite que os usuários naveguem por um catálogo de veículos, negociem preços e concluam vendas de forma segura e eficiente.

## ✨ Funcionalidades

- **Autenticação de Usuários:** Sistema completo de registro, login e recuperação de senha.
- **Catálogo de Veículos:** Navegue por uma vasta gama de veículos de luxo com filtros e pesquisa avançada.
- **Páginas de Detalhes:** Veja informações detalhadas, imagens e vídeos de cada veículo.
- **Negociações:** Inicie e gerencie negociações diretamente com os vendedores.
- **Dashboard de Usuário:** Acompanhe suas negociações, compras e vendas em um painel de controle intuitivo.
- **Gerenciamento de Veículos:** Vendedores podem criar, editar e gerenciar seus anúncios de veículos.
- **Sistema de Notificações:** Mantenha-se atualizado sobre o status de suas negociações e vendas.

## 🔄 Fluxo de Dados

### Entradas de Dados

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

### Saídas de Dados

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

## 🚀 Tecnologias Utilizadas

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

## ⚙️ Como Executar o Projeto

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
4. **Execute o projeto em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
5. **Acesse a aplicação em:** `http://localhost:3000`

## 📂 Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
/
├── app/
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── data/          # Dados estáticos
│   │   ├── hooks/         # Hooks personalizados
│   │   ├── lib/           # Funções utilitárias
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── schemas/       # Esquemas de validação com Zod
│   │   ├── services/      # Serviços para interação com a API
│   │   ├── store/         # Configuração do Redux
│   │   └── types/         # Tipos e interfaces do TypeScript
│   ├── routes/            # Definição das rotas
│   └── app.css            # Estilos globais
├── public/                # Arquivos estáticos
├── package.json           # Dependências e scripts
└── tsconfig.json          # Configurações do TypeScript
```