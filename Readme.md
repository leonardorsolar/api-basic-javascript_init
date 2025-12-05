Aqui está o **tutorial reescrito de forma mais didática**, com explicações **claras, diretas e em ordem lógica**, mostrando **o que cada passo faz e por que é necessário**.

---

# ✅ **Tutorial Didático — Configuração de uma API Node.js com Express + Nodemon**

Este guia explica, de forma objetiva, **cada etapa para criar e executar uma API básica** usando Node.js, Express e Nodemon com JavaScript puro (ES Modules).

---

# 🎯 **Execução (Resumo Final)**

### ✅ 1. Instalar dependências

```bash
npm install
```

### ✅ 2. Rodar o projeto

```bash
npm run dev
```

### ✅ 3. Visualizar no navegador

O terminal mostrará:

```
Servidor rodando em http://localhost:3000
```

Abra o link no navegador.

---

# 📘 **Tutorial Completo — Passo a Passo**

A seguir está o fluxo completo da criação **do zero** até rodar a API.

---

## ✅ **1. Criar o projeto**

Primeiro criamos a pasta do projeto e inicializamos o Node.js:

```bash
mkdir minha-api
cd minha-api
npm init -y
```

**O que isso faz?**

-   Cria uma pasta para a API.
-   Gera o arquivo `package.json` com as configurações do projeto.

---

## ✅ **2. Instalar as dependências**

Instale o Express (servidor web) e o Nodemon (reinicia o servidor automaticamente sempre que você altera o código).

```bash
npm install express
npm install -D nodemon
```

**Por que isso é importante?**

-   **Express:** permite criar rotas HTTP.
-   **Nodemon:** evita rodar o `node` manualmente a cada alteração.

---

## ✅ **3. Configurar o `package.json`**

Adicione a linha para permitir uso de **ES Modules (import/export)**:

```jsonc
"type": "module"
```

Isso ativa o modo moderno do JavaScript dentro do Node.

---

## ✅ **4. Criar o arquivo `.gitignore`**

Serve para ignorar arquivos que não devem ir para o Git (como node_modules).

```bash
touch .gitignore
```

Conteúdo:

```gitignore
node_modules
dist
*.log
*.tsbuildinfo
```

---

## ✅ **5. Criar o arquivo principal da API**

Crie a pasta `src` e o arquivo da aplicação:

📄 **src/index.js**

```js
import express from "express"

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
    res.send("API com JavaScript e Nodemon 🚀")
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
```

**O que está acontecendo aqui?**

-   Criamos o servidor Express.
-   Definimos a rota `/`.
-   Subimos o servidor na porta 3000.

---

## ✅ **6. Configurar o Nodemon**

Crie um arquivo de configuração para facilitar o uso:

📄 **nodemon.json**

```json
{
    "watch": ["src"],
    "ext": "js",
    "ignore": ["node_modules"]
}
```

**O que isso faz?**

-   Observa alterações na pasta `src`.
-   Executa arquivos `.js`.
-   Ignora a pasta `node_modules`.

---

## ✅ **7. Ajustar os scripts no `package.json`**

Adicione o script de desenvolvimento:

```json
"scripts": {
  "dev": "nodemon src/index.js"
}
```

**Por que isso é útil?**
Permite rodar o servidor com:

```bash
npm run dev
```

Sem precisar digitar comandos longos.

---

## ✅ **8. Rodar o projeto**

Execute:

```bash
npm run dev
```

Se tudo estiver certo, o terminal mostrará:

```
Servidor rodando em http://localhost:3000
```

Agora é só abrir no navegador:

👉 **[http://localhost:3000](http://localhost:3000)**

---

# 🎉 **Pronto!**

Você configurou uma API Node.js moderna, organizada e com recarregamento automático (hot reload) usando Nodemon.

Próximos passos:

✔ Rotas separadas
✔ Controllers e Services
✔ Tratamento de erros
✔ Middlewares
✔ Arquitetura em camadas
