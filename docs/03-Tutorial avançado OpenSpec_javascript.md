OpenSpec é um CLI e workflow open-source para **spec-driven development** que faz a ponte entre humanos e assistentes de IA: cria/organiza especificações, propostas e tarefas, valida deltas de requisitos e mantém um histórico reviewable antes de gerar/alterar código.

## Resumo das etapas:

**_1- Inicializar_** openspec init -> Cria a pasta openspec/
**_2- arquivo de memória do projeto_** project.md (Contexto do domínio, Pilha de tecnologias, Convenções de código, Padrões arquiteturais)
"Por favor, leia o arquivo openspec/project.md e me ajude a preenchê-lo com detalhes sobre meu projeto, pilha de tecnologias e convenções."
ou
"Analisar meu projeto atual e preencher o arquivo openspec/project.md."
**_3- Solicite a funcionalidade_** (valide os arquivos: spec, design,proposal)
"Adicione somente a funcionalidade de registro de usuários sem autenticação."
proposal.md — descrição da mudança e contexto.
tasks.md — lista de tarefas (backend, frontend, testes, migrations).
design.md (opcional) — decisões de design, endpoints, payloads.
**_4- Arquivas as mudanças_** Marca a mudança como concluída
openspec archive <change-id>

### 1- Execute a inicialização:

```bash
openspec init
```

### 2- Criar o openspec/project.md (arquivo de memória do projeto - contexto para ia)

```bash
Leia o arquivo openspec/project.md e me ajude a preenchê-lo
com detalhes sobre meu projeto, pilha de tecnologias e convenções
```

Aqui você poderá sugerir o que for necessário.

O arquivo **openspec/project.md** é utilizado para definir:

-   convenções
-   padrões
-   modelos arquitetônicos
-   diretrizes gerais
-   regras que devem ser seguidas em todas as alterações futuras
-   testes: Adicione o jest teste ao projeto

Vamos alimentar o **documento central (project.md)** que orienta todas as modificações, tarefas e especificações que a IA irá gerar ou revisar.

Meu prompt adicionado:

Atualize o arquivo openspec/project.md com as seguintes alterações:

# Estrutura de Diretórios Sugerida:

````bash
src/
├── config/
│   └── database.js          # Configuração e inicialização do SQLite
├── repositories/
│   └── ExampleRepository.js # Acesso ao banco (queries SQL)
├── services/
│   └── UserService.js       # Lógica de negócio e validações
├── controllers/
│   └── ExampleController.js # Orquestração request → service
├── routes/
│   └── exampleRoutes.js     # Definição de rotas
├── middlewares/
│   ├── errorHandler.js      # Tratamento centralizado de erros
│   └── validator.js         # Validação de requisições
├── utils/
│   └── helpers.js           # Funções auxiliares reutilizáveis
├── tests/
│   ├── unit/                # Testes unitários (models, utils)
│   ├── integration/         # Testes de integração (controllers)
│   └── setup.js             # Configuração do ambiente de testes
└── index.js                 # Entry point da aplicação

padrão Service–Repository

## Convenções de Nomenclatura OBRIGATÓRIAS

- **Repositories**: `PascalCase` + sufixo Model (ex.: `UserRepository.js`, `ProductRepository.js`)
- **Controllers**: `PascalCase` + sufixo Controller (ex.: `UserController.js`)
- **Routes**: `camelCase` + sufixo Routes (ex.: `userRoutes.js`)
- **Classes**: `PascalCase`
- **Métodos**: `camelCase`
- **Constantes**: `SCREAMING_SNAKE_CASE` (ex.: `DB_PATH`, `PORT`)
- **Tabelas SQLite**: `snake_case` plural (ex.: `users`, `product_categories`)
- **Variáveis**: `camelCase` (ex.: `userData`, `totalCount`)

## Estilo de Código OBRIGATÓRIO

- ES Modules: usar `import`/`export`
- SEM ponto-e-vírgula no final das linhas
- Aspas duplas para strings
- Indentação: 4 espaços
- Async/await para operações assíncronas (NUNCA callbacks)
- Prepared statements (?) para queries SQL
- Try-catch em todos os métodos de Controller

## Padrões Arquitetônicos

### REPOSITORY (Camada de Dados)
**Responsabilidade:** APENAS queries SQL puras - acesso direto ao banco de dados
**Regras:**
- Sempre retornar Promises (async/await)
- Usar prepared statements com placeholders (?)
- Métodos padrão: `findAll()`, `findById(id)`, `create(data)`, `update(id, data)`, `delete(id)`
- NUNCA incluir lógica de negócio
- NUNCA fazer res.json() ou manipular response

// src/repositories/UserRepository.js
import db from "../config/database.js"

class UserRepository {
    async findAll() {
        return db.all("SELECT * FROM users")
    }

    async findById(id) {
        return db.get("SELECT * FROM users WHERE id = ?", [id])
    }

    async findByEmail(email) {
        return db.get("SELECT * FROM users WHERE email = ?", [email])
    }

    async create(data) {
        const { name, email, age } = data
        const result = await db.run(
            "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
            [name, email, age]
        )
        return { id: result.lastID, name, email, age }
    }

    async update(id, data) {
        const { name, email, age } = data
        await db.run(
            "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
            [name, email, age, id]
        )
        return this.findById(id)
    }

    async delete(id) {
        return db.run("DELETE FROM users WHERE id = ?", [id])
    }
}

export default new UserRepository()


### SERVICE (Camada de Negócio)
**Responsabilidade:** Lógica de negócio, validações, orquestração de Repositories
**Regras:**
- Chamar um ou mais Repositories
- Aplicar todas as validações de negócio
- Implementar regras de negócio complexas
- Lançar erros com statusCode quando apropriado
- NUNCA manipular req/res diretamente
- NUNCA fazer queries SQL diretamente
- Retornar dados processados ou lançar Error

// src/services/UserService.js
import UserRepository from "../repositories/UserRepository.js"

class UserService {
    async getAll() {
        return UserRepository.findAll()
    }

    async getById(id) {
        this.validateId(id)

        const user = await UserRepository.findById(id)
        if (!user) this.throwNotFound("User not found")

        return user
    }

    async create(data) {
        this.validateUserData(data)

        const existing = await UserRepository.findByEmail(data.email)
        if (existing) this.throwError("Email already registered", 409)

        return UserRepository.create(data)
    }

    async update(id, data) {
        await this.getById(id)

        if (data.email) {
            const existing = await UserRepository.findByEmail(data.email)
            if (existing && existing.id !== parseInt(id)) {
                this.throwError("Email in use", 409)
            }
        }

        return UserRepository.update(id, data)
    }

    async delete(id) {
        await this.getById(id)
        return UserRepository.delete(id)
    }

    // Validações privadas
    validateId(id) {
        if (!id || isNaN(id)) this.throwError("Invalid ID", 400)
    }

    validateUserData(data) {
        if (!data.name || data.name.trim().length < 3) {
            this.throwError("Name must be at least 3 characters", 400)
        }
        if (!data.email || !this.isValidEmail(data.email)) {
            this.throwError("Invalid email", 400)
        }
        if (!data.age || data.age < 18) {
            this.throwError("Age must be at least 18", 400)
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    throwError(message, statusCode = 400) {
        const error = new Error(message)
        error.statusCode = statusCode
        throw error
    }

    throwNotFound(message) {
        this.throwError(message, 404)
    }
}

export default new UserService()

### CONTROLLER (Lógica de Negócio)
**Responsabilidade:** Orquestrar Models, validar dados, preparar respostas HTTP
**Regras:**
- Sempre usar try-catch
- Passar erros para middleware com `next(error)`
- Validar dados antes de chamar Model
- Retornar status HTTP apropriados
- Métodos padrão: `index`, `show`, `store`, `update`, `destroy`

// src/controllers/userController.js
import UserService from "../services/UserService.js"

export const index = async (req, res, next) => {
    try {
        const users = await UserService.getAll()
        res.json({ success: true, data: users })
    } catch (error) {
        next(error)
    }
}

export const show = async (req, res, next) => {
    try {
        const user = await UserService.getById(req.params.id)
        res.json({ success: true, data: user })
    } catch (error) {
        next(error)
    }
}

export const store = async (req, res, next) => {
    try {
        const user = await UserService.create(req.body)
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    try {
        const user = await UserService.update(req.params.id, req.body)
        res.json({ success: true, data: user })
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res, next) => {
    try {
        await UserService.delete(req.params.id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

### ROUTES (Mapeamento de Endpoints)
**Responsabilidade:** Definir URLs e associar a Controllers
**Regras:**
- Usar Router do Express
- Seguir padrões RESTful
- Aplicar middlewares específicos quando necessário

// src/routes/userRoutes.js
import { Router } from "express"
import * as UserController from "../controllers/userController.js"

const router = Router()

router.get("/users", UserController.index)
router.get("/users/:id", UserController.show)
router.post("/users", UserController.store)
router.put("/users/:id", UserController.update)
router.delete("/users/:id", UserController.destroy)


export default router

### 5. Database Config

// src/config/database.js
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "../../database.sqlite")

let db = null

async function getDatabase() {
    if (db) return db

    db = await open({
        filename: DB_PATH,
        driver: sqlite3.Database
    })

    await db.exec("PRAGMA foreign_keys = ON")
    return db
}

export default await getDatabase()


### 6. Error Handler
// src/middlewares/errorHandler.js
export default (err, req, res, next) => {
    console.error("Error:", err.stack)

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    })
}

### 7. Index (Entry Point)
// src/index.js
import express from "express"
import userRoutes from "./routes/userRoutes.js"
import errorHandler from "./middlewares/errorHandler.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/api", userRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app

## Regras de Ouro

### Repository (Classes)
✅ Queries SQL puras com prepared statements (?)
✅ Métodos: `findAll()`, `findById()`, `findByField()`, `create()`, `update()`, `delete()`
✅ Retornar dados brutos
❌ Lógica de negócio
❌ Validações
❌ Manipular req/res

### Service (Classes)
✅ Validar dados
✅ Regras de negócio
✅ Orquestrar múltiplos Repositories
✅ Lançar erros com `statusCode`
❌ Queries SQL diretas
❌ Manipular req/res

### Controller (Funções)
✅ Extrair dados de `req`
✅ Chamar Services
✅ Try-catch + `next(error)`
✅ Retornar respostas JSON
❌ Lógica de negócio
❌ Validações
❌ Queries SQL

### Fluxo
```
Request → Route → Controller → Service → Repository → DB
```

## Padrões de Resposta HTTP OBRIGATÓRIOS

**Sucesso:**
```javascript
{ success: true, data: {...} }
{ success: true, data: [...] }
````

**Erro:**

```javascript
{ success: false, message: "Descrição clara do erro" }
```

**Lista paginada:**

```javascript
{
    success: true,
    data: [...],
    pagination: { page: 1, limit: 10, total: 100 }
}
```

**Status Codes:**

-   200: GET sucesso
-   201: POST sucesso (criação)
-   204: DELETE sucesso (sem conteúdo)
-   400: Bad Request (validação falhou)
-   404: Not Found
-   500: Internal Server Error

## REGRAS INVIOLÁVEIS

1. **NUNCA fazer queries SQL em Controllers ou Routes**
2. **SEMPRE usar prepared statements (?) para prevenir SQL injection**
3. **SEMPRE usar try-catch em métodos de Controller**
4. **SEMPRE passar erros para middleware com next(error)**
5. **NUNCA usar callbacks, sempre async/await**
6. **NUNCA expor stack traces em produção**
7. **SEMPRE validar entrada do usuário antes de processar**
8. **SEMPRE retornar objetos com { success: boolean }**
9. **Métodos de Model devem retornar dados, não responses HTTP**
10. **Controllers devem ter no máximo 50 linhas por método**

## Testes

**Unitário (Service):**

```javascript
// src/tests/unit/UserService.test.js
import UserService from "../../services/UserService.js"
import UserRepository from "../../repositories/UserRepository.js"

jest.mock("../../repositories/UserRepository.js")

test("should throw error for short name", async () => {
    await expect(
        UserService.create({ name: "Jo", email: "jo@test.com", age: 25 })
    ).rejects.toThrow("Name must be at least 3 characters")
})
```

**Integração (Controller):**

```javascript
// src/tests/integration/userController.test.js
import request from "supertest"
import app from "../../index.js"

test("POST /users - should create user", async () => {
    const res = await request(app)
        .post("/api/users")
        .send({ name: "João", email: "joao@test.com", age: 25 })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
})
```

## Checklist

-   [ ] Repository: apenas queries SQL
-   [ ] Service: validações + lógica
-   [ ] Controller: try-catch + next(error)
-   [ ] Sempre usar prepared statements (?)
-   [ ] Erros com statusCode
-   [ ] Respostas com { success: boolean }
-   [ ] Classes exportadas como singleton (`export default new Class()`)
-   [ ] Controllers com named exports
-   [ ] Testes unitários para Services
-   [ ] Testes de integração para Controllers

### **Próximo passo**

Depois de configurar o contexto, o próximo passo é **solicitar à IA a criação de um novo recurso (funcionalidade)** para começar a evoluir o projeto usando o fluxo OpenSpec.

### 3- Faça sua primeira mudança - Creating My First Spec

Crie sua primeira proposta de alteração e adicione no prompt:

Eu desejo adicionar somente a funcionalidade de registro de usuários sem autenticação.

### **Próximo passo**

Revisar a proposta (proposal.md, design.md, tasks.md)
Aprovar: digitar /openspec:apply para começar a implementação
Ajustar: se quiser mudar algo (validações, campos, endpoints), avise antes de implementar

### 3- Impelemnetação: Aprovando

/openspec:apply

### 4- Arquivar a mudança

openspec archive add-user-registration --yes

comandos extras:

-   Consultarmos o painel do OpenSpec: openspec view

docs:
https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team
