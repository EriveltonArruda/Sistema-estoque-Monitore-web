# Guia de Instalação - Sistema de Controle de Estoque

Este guia fornece instruções detalhadas para instalar e configurar o Sistema de Controle de Estoque em diferentes ambientes.

## Requisitos do Sistema

- **Node.js**: Versão 18.0.0 ou superior
- **npm**: Versão 8.0.0 ou superior (ou yarn)
- **Navegador Web**: Chrome, Firefox, Edge ou Safari em suas versões mais recentes

## Instalação em Ambiente de Desenvolvimento

### 1. Clone o Repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd sistema-estoque
```

### 2. Instale as Dependências

Usando npm:
```bash
npm install
```

Ou usando yarn:
```bash
yarn install
```

### 3. Execute o Servidor de Desenvolvimento

Usando npm:
```bash
npm run dev
```

Ou usando yarn:
```bash
yarn dev
```

### 4. Acesse a Aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

## Instalação em Ambiente de Produção

### 1. Clone o Repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd sistema-estoque
```

### 2. Instale as Dependências

Usando npm:
```bash
npm install
```

Ou usando yarn:
```bash
yarn install
```

### 3. Construa a Aplicação

Usando npm:
```bash
npm run build
```

Ou usando yarn:
```bash
yarn build
```

### 4. Inicie o Servidor de Produção

Usando npm:
```bash
npm start
```

Ou usando yarn:
```bash
yarn start
```

### 5. Acesse a Aplicação

Por padrão, a aplicação estará disponível em:
```
http://localhost:3000
```

## Configuração para Banco de Dados Real (Opcional)

Para substituir o arquivo JSON por um banco de dados real, siga estas etapas:

### MongoDB

1. Instale o pacote do MongoDB:
```bash
npm install mongodb
# ou
yarn add mongodb
```

2. Crie um arquivo de configuração em `src/lib/mongodb.ts`:
```typescript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

3. Modifique as funções em `src/lib/db.ts` para usar o MongoDB em vez do arquivo JSON.

### PostgreSQL

1. Instale os pacotes necessários:
```bash
npm install pg
# ou
yarn add pg
```

2. Crie um arquivo de configuração em `src/lib/postgres.ts` e adapte as funções de banco de dados conforme necessário.

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
# Configuração do Banco de Dados (se aplicável)
MONGODB_URI=mongodb://localhost:27017/estoque
# ou
POSTGRES_URL=postgresql://user:password@localhost:5432/estoque

# Outras configurações
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Solução de Problemas de Instalação

### Erro: "Module not found"

Se você encontrar erros de módulos não encontrados:

```bash
npm cache clean --force
npm install
# ou
yarn cache clean
yarn install
```

### Erro: "Port 3000 is already in use"

Se a porta 3000 já estiver em uso:

```bash
# Para npm
npm run dev -- -p 3001
# Para yarn
yarn dev -p 3001
```

### Erro de Permissão ao Instalar Pacotes

Se encontrar erros de permissão ao instalar pacotes:

```bash
sudo npm install
# ou
sudo yarn install
```

## Suporte

Se você encontrar problemas durante a instalação, entre em contato com o suporte técnico:

- Email: suporte@exemplo.com
- Telefone: (XX) XXXX-XXXX

