**Spec Kit** (ou _Spec-Driven Development / Spec-Kit_) Desenvolvimento de Software Orientado por Especificações (SDD) com IA

O Spec Kit é um toolkit open-source que propõe uma nova abordagem chamada Spec-Driven Development - basicamente, você especifica o que quer e a IA constrói pra você.

https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/

https://github.com/github/spec-kit

Aula Spec Kit:

1- chatgpt: como instlar o 🌱 Spec Kit https://github.com/github/spec-kit?utm_source=chatgpt.com e o que precisa instalar a mais.
2-verifique: uv --version
3-Rodar o Spec Kit (no terminal):
Run directly without installing:: uvx --from git+https://github.com/github/spec-kit.git specify init app
Isso vai clonar e rodar o Spec Kit direto do repositório, inicializando o projeto no diretório app

Se instalado globalmente:
Then use the tool directly:
specify init <PROJECT_NAME>

# Or initialize in existing project

specify init .
yes
gicopilot

Escolha a ferramneta desejada. ex.: gicopilot
4- Abra a pasta app no vscode
5-Abra no terminal o gicopilot ou outra ferramneta escolhida
6- comandos principais: /specify e /plan
Use o comando /specify e descreva o que você quer construir

O SpecKit cria uma pasta: .github/agents/
Adicionar .github/ ao .gitignore

fluxo ideal:

```bash
/specify
/speckit.clarify  (Eliminar ambiguidade; AI faz perguntas importantes)
/speckit.plan
/speckit.checklist (Criar checklist de qualidade da spec e do plan)
/speckit.tasks
/speckit.analyze (Analisar coerência entre spec → plan → tasks)
/speckit.implement
```

# Etapa 1: /speckit.constitution

Digite: /speckit.constitution
E o gicopilot vai gerar os princípios do projeto.
O comando /speckit.constitution acabou de criar as regras oficiais de desenvolvimento que o Cursor e o SpecKit vão seguir daqui pra frente.
É literalmente a “lei do projeto”.
.specify/memory/constitution.md
o que le fez?

1. Ele criou o documento constitution.md
2. Ele definiu oficialmente como seu projeto deve ser desenvolvido: 1. Specification-First, 2. Test-Driven Development (TDD obrigatório), 3. User Stories Prioritizadas, 4. Modularização Obrigatória, 5. Erros Observáveis
3. Ele criou o padrão técnico obrigatório: Você está preso (por escolha) a: Node 18+, Express 5...
4. Ele ativou quality gates: Antes de mergear qualquer PR, o SpecKit vai exigir:spec criada, testes cobrindo 70%, supertest nos endpoints, cenários de aceitação, erros documentados.
5. Ele configurou o workflow oficial: Spec → Plan → Tasks → Implement → Validate → Document
6. Ele validou os templates internos
   tem spec-template
   tem plan-template
   tem tasks-template
   tudo alinhado com a Constitution

Sugestões para os próximos passos:

```bash
git add .
git commit -m"constitution"
```

O que você deve fazer AGORA:

# Etapa 2: /specify.specify (Especificação Funcional (não técnica))

**Gerar a especificação (“Specify”)**
Use o comando `/specify` para descrever em alto nível o que você quer construir. Focar nos requisitos do usuário, fluxos, o “por que”. ([The GitHub Blog][1])
❌ Sem decisões de stack, arquitetura, classes, Express, Jest, etc.
Apenas: objetivo, requisitos do usuário, fluxos, cenários, por que existe.

```bash
/specify.specify
Quero construir um sistema de registro de usuários.

🎯 Objetivo do sistema:
Permitir que novas pessoas se registrem fornecendo informações básicas, criando assim uma conta inicial no sistema.

📌 Requisitos funcionais (alto nível):
- O usuário deve fornecer nome, email e senha para criar uma conta.
- O sistema deve validar que todos os campos obrigatórios foram enviados.
- O email deve ser único no sistema.
- O sistema deve validar formato inválido de email.
- A senha deve atender requisitos mínimos de segurança.
- Após o cadastro, o sistema deve retornar os dados públicos do usuário (id, nome e email).
- O sistema deve retornar mensagens claras em caso de erro (email existente, campos ausentes, formatos inválidos).

👤 Usuário-alvo:
Qualquer novo usuário que deseja criar uma conta inicial no sistema.

🧩 Fluxo principal:
1. Usuário envia nome, email e senha.
2. O sistema valida os dados.
3. Se for válido, cria um novo usuário.
4. O sistema responde com os dados públicos do usuário.
5. Se houver erro, o sistema retorna uma mensagem clara indicando o problema.

🧪 Cenários de aceitação (Given/When/Then):
- Registro bem-sucedido.
- Email já cadastrado.
- Email inválido.
- Campos obrigatórios ausentes.
- Senha muito fraca.
- Nome vazio ou ausente.

🚫 Fora do escopo nesta etapa:
- Login ou autenticação.
- Atualização de usuário.
- Exclusão de usuário.
- Recuperação de senha.
- Integração com banco de dados real.

📄 Observação:
Gerar uma SPEC completa com foco no comportamento do sistema, necessidades do usuário e critérios de aceitação — sem decisões técnicas.
```

Perfeito! Agora vou criar a especificação completa no arquivo specs/001-user-registration/spec.md. Vou estruturar tudo seguindo rigorosamente a Constituição:

Baseado no seu pedido /specify.specify, vou criar a especificação 001 - User Registration System com todas as user stories, requisitos, critérios de aceitação e alinhamento com a constituição.

cria-se: specs/001-user-registration/spec.md

Conteúdo da Especificação:
✅ 7 User Stories Prioritizadas (P1/P2):
Register New User (P1)
Validate Required Fields (P1)
Validate Email Format (P2)
Prevent Duplicate Emails (P1)
Secure Password Hashing (P2)
Return Only Public Data (P1)
Clear Error Messages (P2)
✅ Acceptance Scenarios (Given/When/Then) para cada story
✅ Edge Cases cobertos (whitespace, invalid JSON, race conditions, etc.)
✅ Requisitos Funcionais & Não-Funcionais
✅ Arquitetura de 4 Camadas (Router → Controller → Service → Repository)
✅ Alinhamento com Constitution v1.0.0
✅ Critérios de Sucesso Mensuráveis (70% cobertura, Supertest, etc.)

Esta especificação está completa e pronta para:

Review & Approval — Você ou o time revisa e aprova
Planning Phase (/plan) — Define a stack exata (Express versão, bcrypt, etc.)
Task Decomposition (/tasks) — Quebra em tarefas testáveis
Implementation — Código segue rigorosamente a spec

### Próximas Etapas:

```bash
git add .
git commit -m"spec:001-user-registration"
```

# Etapa 3: /speckit.plan

**Planejamento técnico (“Plan”)**
Depois que a especificação estiver bem definida, com `/plan` você define o stack, arquitetura, restrições, padrões, etc. ([The GitHub Blog][1]

Próximas Etapas: plnao técnico
Opção 1: Avançar para /plan (Plano Técnico)

Agora você especifica a stack tecnológica com /plan:

```bash
/speckit.plan
Gerar o plano técnico para esta especificação.
```

ou

**Início do `/speckit.plan`**

````bash

/speckit.plan

# Planejamento Técnico — Registro de Usuários
## 1. Stack Tecnológico
- Node.js 18+
- Express.js 5.x (ESM)
- Jest + Supertest (TDD obrigatório)
- bcryptjs (hash de senha)
- Nodemon
- Arquitetura modular em camadas (Router → Controller → Service → Repository)
---
## 2. Arquitetura e Pastas
```
src/
├── routes/
│   └── userRoutes.js
├── controllers/
│   └── UserController.js
├── services/
│   └── UserService.js
├── repositories/
│   └── UserRepository.js
├── models/
│   └── UserModel.js
├── utils/
│   └── validations.js
├── database/
│   └── memoryDB.js
└── app.js
```
**Regra:** todas as camadas devem ser implementadas usando **classes**, nunca funções puras.
---
## 3. Fluxo Técnico da Requisição (Registro)
1. Router recebe `POST /users`
2. Controller valida dados e chama o service
3. Service:
   - valida formato do email
   - verifica unicidade via repository
   - aplica hash na senha com bcryptjs
   - cria instância de UserModel
   - envia ao repository
4. Repository persiste no array simulado
5. Service retorna usuário sem senha
6. Controller responde ao cliente
## 4. Padrões Obrigatórios
### Código
- ES Modules (`import/export`)
- Estrutura baseada em classes
- Erros lançados com:
```js
  { message, statusCode, context }
```
### Qualidade
- TDD obrigatório
- 70%+ de cobertura
- Testes devem cobrir:
  - fluxo feliz
  - email inválido
  - email duplicado
  - campos ausentes
  - senha fraca
---
## 5. Regras de Validação
### Nome
- obrigatório
- mínimo 2 caracteres
### Email
- obrigatório
- validar formato
- verificar unicidade via repository
### Senha
- obrigatória
- hash com bcryptjs
- nunca retornar na resposta
---
## 6. Contratos da API
### Endpoint
```
POST /users
```
### Request Body
```json
{
  "name": "João da Silva",
  "email": "joao@email.com",
  "password": "12345678"
}
```
### Response (201)
```json
{
  "id": "uuid",
  "name": "João da Silva",
  "email": "joao@email.com"
}
```
### Erros

- `400` → Campos inválidos
- `409` → Email já existe
- `500` → Erro inesperado
---
## 7. Dependências Necessárias
```bash
npm install express bcryptjs
npm install -D jest supertest nodemon
```
---
## 8. Regras de Testes
### Integração
- Testar `POST /users`
- Reset do "banco" antes de cada teste
- Validar status, body e mensagens de erro
### Unidade
- **UserService:**
  - email duplicado
  - email inválido
  - hashing
- **UserRepository:**
  - `create()`
  - `findByEmail()`
---
## 9. Riscos e Mitigações
| Risco | Mitigação |
|-------|-----------|
| Array cresce e perde performance | Migrar para DB real |
| Validação duplicada | Centralizar em `utils/validations.js` |
| bcrypt lento | Usar salt rounds menores no dev |
---
## 10. Definition of Done (DoD)
- ✅ Todos os testes passando (TDD)
- ✅ 70%+ de cobertura
- ✅ Código alinhado à Constitution
- ✅ Linter sem erros
- ✅ Documentação atualizada no README
- ✅ Fluxo completo implementado
---
````

**Fim do `/speckit.plan`**

Arquivos de contratos gerados:

specs/001-user-registration/00_PLANO_COMPLETO.md
specs/001-user-registration/EXPECTED_PROJECT_STRUCTURE.md
specs/001-user-registration/INDEX.md
specs/001-user-registration/PHASE1_COMPLETION.md
specs/001-user-registration/README.md
specs/001-user-registration/contracts/
specs/001-user-registration/data-model.md
specs/001-user-registration/plan.md
specs/001-user-registration/quickstart.md
specs/001-user-registration/research.md

veja: specs/001-user-registration/contracts/POST-users.json

# Etapa 4: /speckit.tasks

5. **Divisão em tarefas (“Tasks”)**
   Com base na especificação + plano, gerar tarefas menores, que sejam revisáveis e implementáveis isoladamente. ([The GitHub Blog][1])

    o comando /speckit.tasks é usado sem prompt adicional.

Apenas execute:

```bash
/speckit.tasks
```

Perfeito! Agora vou criar o arquivo tasks.md completo baseado nas 7 user stories da especificação, seguindo rigorosamente o template e o modo speckit.tasks

Arquivo: tasks.md

Estrutura Completa:
✅ 84 tarefas totais organizadas por user story
✅ 46 tarefas MVP (apenas P1 - entrega mais rápida)
✅ 29 tarefas paralelizáveis marcadas com [P]
✅ 10 fases de implementação

Fases Detalhadas:
Phase 1: Setup (6 tarefas)
Phase 2: Foundational - BLOQUEIA todas as stories (6 tarefas)
Phase 3: US1 - Register User (P1) 🎯 MVP (9 tarefas)
Phase 4: US2 - Validate Fields (P1) (10 tarefas)
Phase 5: US3 - Email Format (P2) (8 tarefas)
Phase 6: US4 - Prevent Duplicates (P1) (8 tarefas)
Phase 7: US5 - Password Hashing (P2) (8 tarefas)
Phase 8: US6 - Public Data Only (P1) (7 tarefas)
Phase 9: US7 - Error Messages (P2) (11 tarefas)
Phase 10: Polish & Cross-Cutting (10 tarefas)
Destaques:
✅ TDD Obrigatório: Todas as tarefas de teste vêm ANTES da implementação
✅ User Stories Independentes: Cada story pode ser implementada e testada isoladamente
✅ Paralelização: 29 tarefas podem rodar em paralelo
✅ MVP Claro: 46 tarefas P1 entregam valor mínimo viável
✅ Checkpoints: Validação após cada story
✅ Alinhamento Constitution: 100% compliance com v1.0.0

veja em : specs/001-user-registration/tasks.md

Próximas Etapas:

### 1- commit

```bash
git add specs/001-user-registration/tasks.md
git commit -m "tasks: user registration system (84 tasks, TDD approach)"
```

### 2-Revisar

Revisar as tarefas
Quer ajustar algo antes de começar?

### 3-implementação

Começar implementação MVP

# Etapa 5: /speckit.implement

6. **Implementação (“Implement”)**
   Aqui é escrever o código (ou gerar com agente de IA), revisar, testar, iterar. Importante: validar cada pequena parte, garantir que esteja de acordo com a especificação e plano. ([The GitHub Blog][1])

```bash
/speckit.implement 1 2 3
```

Isso faz com que o SpecKit:
carregue automaticamente o tasks.md
selecione apenas as tarefas 1, 2 e 3
gere o código seguindo TDD e o Constitution
não faça nenhuma tarefa além delas

# Etapa 6: /speckit.implement

7. **Refinamentos**
   Caso durante a implementação apareçam detalhes que não estavam previstos, voltar à espec ou ao plano para ajustar. Especificações são artefatos vivos. ([The GitHub Blog][1])

    | Comando                | Momento                    | Finalidade                                         |
    | ---------------------- | -------------------------- | -------------------------------------------------- |
    | **/speckit.clarify**   | Depois do `/specify`       | Eliminar ambiguidade; AI faz perguntas importantes |
    | **/speckit.checklist** | Depois do `/speckit.plan`  | Criar checklist de qualidade da spec e do plan     |
    | **/speckit.analyze**   | Depois de `/speckit.tasks` | Analisar coerência entre spec → plan → tasks       |

# Conhecimento:

## O que é o Spec Kit

-   Spec Kit é um toolkit open source criado pelo GitHub para promover um método de desenvolvimento de software guiado por especificações. ([The GitHub Blog][1])
-   Em vez de codificar primeiro e depois documentar, ele propõe que você comece definindo o **“o que”** (o que o software deve fazer, pra quem, por que) — isso chama-se _Specify_. Depois você define o _como_ (pilha tecnológica, arquitetura, restrições) — _Plan_. A seguir divide isso em tarefas pequenas — _Tasks_. E então implementa, verificando em cada fase. ([Visual Studio Magazine][2])
-   Ele também traz uma CLI (linha de comando), templates, prompts, estrutura para organizar esses artefatos. ([GitHub][3])

---

## Quando usar

Spec Kit parece útil especialmente em cenários como:

-   Projetos _greenfield_ (do zero), onde você está iniciando algo novo. ([Visual Studio Magazine][2])
-   Adicionar features em sistemas existentes, para garantir que tudo se integre bem. ([The GitHub Blog][1])
-   Modernização de código legada (“legacy code”) — definir claramente o que já existe e como evoluir. ([The GitHub Blog][1])

---

## Pré-requisitos

Para usar o Spec Kit você vai precisar:

-   Um sistema compatível: Linux ou macOS, ou Windows com WSL2. ([GitHub][3])
-   Node.js 18+
-   Python 3.11+ instalado. ([GitHub][3])
-   Git. ([Visual Studio Magazine][2])
-   Um “coding agent” de AI (se for usar parte de geração automática): pode ser GitHub Copilot, Claude Code, Gemini CLI, Cursor. ([GitHub][3])
-   Ferramentas de linha de comando como a especificada CLI do Spec Kit. ([GitHub][3])

---

## Como usar — passo a passo básico

Aqui vai um guia prático de como começar:

1. **Clonar (ou instalar) o Spec Kit**
   Você pode instalar via git/CLI. Exemplo dado no repositório:

    ```
    uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT_NAME>
    ```

    Isso inicializa o seu projeto com a estrutura do Spec Kit. ([GitHub][3])

2. **Inicializar o projeto**
   `specify init` com opções como:

    - escolher o “coding agent” que vai usar (Copilot, Claude, etc.) ([GitHub][3])
    - definir se vai inicializar git automaticamente, ou em diretório atual, etc. ([GitHub][3])

3. **Gerar a especificação (“Specify”)**
   Use o comando `/specify` para descrever em alto nível o que você quer construir. Focar nos requisitos do usuário, fluxos, o “por que”. ([The GitHub Blog][1])

    /specify

```bash
   # To-Do List App

- O usuário poderá:
  - Adicionar novas tarefas.
  - Listar tarefas existentes.
  - Marcar tarefas como concluídas.
  - Excluir tarefas.
- As tarefas serão armazenadas em `localStorage`.
- Interface simples, responsiva, em HTML + CSS.
- Público-alvo: estudantes e iniciantes em programação web.
- Objetivo: aprender manipulação do DOM e armazenamento local.
```

4. **Planejamento técnico (“Plan”)**
   Depois que a especificação estiver bem definida, com `/plan` você define o stack, arquitetura, restrições, padrões, etc. ([The GitHub Blog][1])

    ``

5. **Divisão em tarefas (“Tasks”)**
   Com base na especificação + plano, gerar tarefas menores, que sejam revisáveis e implementáveis isoladamente. ([The GitHub Blog][1])

6. **Implementação (“Implement”)**
   Aqui é escrever o código (ou gerar com agente de IA), revisar, testar, iterar. Importante: validar cada pequena parte, garantir que esteja de acordo com a especificação e plano. ([The GitHub Blog][1])

7. **Refinamentos**
   Caso durante a implementação apareçam detalhes que não estavam previstos, voltar à espec ou ao plano para ajustar. Especificações são artefatos vivos. ([The GitHub Blog][1])

---

Boa! Peguei o conteúdo bruto que você escreveu e formatei em estilo **post para TabNews**: com seções claras, tópicos, emojis e um fluxo didático. Aqui vai a versão revisada:

---

# Spec Kit: Desenvolvimento de Software Orientado por Especificações (SDD) com IA 🚀

Salve, galera do TabNews!
Hoje vou falar sobre uma parada revolucionária que o GitHub lançou recentemente e que tá deixando muito dev animado: o **Spec Kit** 🎯.

Ele é um toolkit open-source que traz uma abordagem chamada **Spec-Driven Development (SDD)** — basicamente, você **especifica o que quer** e a **IA constrói pra você**. Parece futurista? É porque é mesmo! 🤖

---

## 🤔 O que é Spec-Driven Development?

Durante décadas, seguimos quase sempre a mesma linha:
**documentação → código → deploy → reza pra dar certo.**

O SDD muda isso completamente:

-   As especificações deixam de ser _docs esquecidos_ e passam a ser **executáveis**;
-   A própria IA interpreta a intenção e gera implementações funcionais;
-   Você foca no **"o quê"** e não no **"como"**.

👉 Exemplo: em vez de escrever código em React, você diz _"quero um sistema de fotos com drag and drop"_ e o Spec Kit cria a base do projeto.

---

## 🚀 Por que isso é revolucionário?

A filosofia do Spec Kit é simples mas poderosa:

-   ✅ **Desenvolvimento orientado por intenção**: o _quê_ antes do _como_
-   ✅ **Especificações ricas e vivas**: documentos que evoluem junto com o código
-   ✅ **Refinamento em múltiplas etapas**: iteração em ciclos curtos (/specify → /plan → /tasks → implement)
-   ✅ **IA como parceira**: dependência em LLMs avançados para interpretar intenções

---

## 📂 Repositório e Instalação

-   O Spec Kit é **open-source**, código no GitHub: [github/spec-kit](https://github.com/github/spec-kit)
-   Mantido por **Den Delimarsky (@localden)** e **John Lam (@jflam)**
-   Licença **MIT**: pode usar, modificar e distribuir livremente
-   Issues abertas e comunidade bem receptiva

---

## 🛠️ Mãos na Massa: Tutorial com Gemini CLI

### 🔧 Pré-requisitos

-   Linux/macOS (ou WSL2 no Windows)
-   Node.js 18+
-   Python 3.11+
-   Git
-   [uv](https://github.com/astral-sh/uv) para gerenciar pacotes

---

### 1️⃣ Instalar o Gemini CLI

```bash
# Verificar Node.js
node -v

# Instalar globalmente
npm install -g @google/gemini-cli

# Ou rodar sem instalar
npx https://github.com/google-gemini/gemini-cli
```

Agora execute gemini no terminal e faça login com sua conta Google. Isso te dá acesso gratuito ao Gemini 2.5 Pro com 60 requests por minuto e 1.000 por dia.

---

### 2️⃣ Inicializar o Projeto

```bash
# Instalar Specify CLI
uvx --from git+https://github.com/github/spec-kit.git specify init meu-projeto

# Com agente de IA específico
uvx --from git+https://github.com/github/spec-kit.git specify init meu-projeto --ai gemini
```

⚙️ Opções: escolher _coding agent_ (Copilot, Claude, etc.), inicializar Git automático ou não, diretório atual ou novo.

#### Entrar no Projeto e Iniciar o Gemini

```bash
cd meu-projeto
gemini
```

Se tudo deu certo, você vai ver os comandos /specify, /plan e /tasks disponíveis.

---

### 3️⃣ Criar a Especificação (/specify)

Agora vem a parte mágica! Use o comando /specify e descreva o que você quer construir, não como:

```bash
/specify Quero construir um sistema de gerenciamento de tarefas chamado TaskMaster.
O usuário deve poder criar projetos, adicionar membros da equipe, atribuir tarefas,
comentar e mover tarefas entre colunas estilo Kanban. Para essa primeira versão,
vamos ter 5 usuários pré-definidos: 1 product manager e 4 engenheiros. Criar 3
projetos de exemplo. As colunas do Kanban são: "A Fazer", "Em Progresso",
"Em Revisão" e "Concluído". Sem login por enquanto. Cada card de tarefa deve
permitir mudança de status por drag-and-drop, comentários ilimitados e
atribuição de usuários. Tarefas atribuídas ao usuário atual devem ter cor diferente.
```

➡️ O Gemini vai processar isso e criar uma especificação completa com user stories e requisitos funcionais. Ele também vai criar um branch novo (tipo 001-taskmaster) e uma pasta specs/001-taskmaster.

---

### 4️⃣ Refinar a Especificação (opcional)

Depois da primeira geração, você pode refinar:

```bash
/specify Para cada projeto de exemplo, crie entre 5 e 15 tarefas distribuídas aleatoriamente
entre os diferentes estágios. Garante que tem pelo menos uma tarefa em cada estágio.

```

E peça pro Gemini validar a checklist:

```bash
/specify Leia a checklist de revisão e aceite, e marque cada item se a especificação
atende aos critérios. Deixe vazio se não atender.

```

---

### 5️⃣ Criar o Plano Técnico (/plan)

Agora você especifica a stack tecnológica com /plan:

```bash
/plan Vamos gerar isso usando html, css e javascript usando Materialize e armazenamento localhost
```

ou

```bash
/plan Vamos gerar isso usando React com Vite, TypeScript, TailwindCSS para estilo,
Zustand para gerenciamento de estado, React Beautiful DnD para drag-and-drop,
e JSON local para persistência de dados.
```

ou

```bash
/plan Vamos gerar isso usando React com Vite, TypeScript, TailwindCSS para estilo,
Zustand para gerenciamento de estado, React Beautiful DnD para drag-and-drop,
e JSON local para persistência de dados. A arquitetura deve ser simples com
componentes funcionais e hooks customizados.
```

O Gemini gera:

-   `api-spec.json`
-   `data-model.md`
-   `plan.md`
-   `research.md`

O Gemini vai gerar documentos detalhados de implementação, incluindo api-spec.json, data-model.md, plan.md, e research.md.

Perfeito! Aqui está o conteúdo **formatado de forma clara e organizada**, usando títulos e listas para facilitar a leitura:

---

## 📄 api-spec.json → Contrato de API

**O que é:**
Especificação técnica da API, incluindo rotas, métodos, payloads e respostas.

**Formato:**
Geralmente segue **OpenAPI/Swagger** em JSON.

**Para que serve:**

-   Dá para importar no **Postman** ou **Insomnia** e testar endpoints.
-   Garante que **backend e frontend conversem na mesma língua**.

```json
{
    "paths": {
        "/tasks": {
            "get": { "summary": "Lista todas as tarefas" },
            "post": { "summary": "Cria uma nova tarefa" }
        },
        "/tasks/{id}": {
            "put": { "summary": "Atualiza uma tarefa" },
            "delete": { "summary": "Remove uma tarefa" }
        }
    }
}
```

---

## 📄 data-model.md → Entidades e Estrutura de Dados

**O que é:**
Documento em Markdown que descreve os **modelos de dados** do sistema.

**Para que serve:**

-   Define as **entidades principais** (ex.: `Task`, `User`).
-   Mostra atributos, tipos e **relacionamentos**.
-   Ajuda o time a **alinhar antes de codar** o banco de dados ou objetos no código.

```markdown
# Data Model

## Task

-   id: string (UUID)
-   title: string
-   description: string
-   status: enum ["todo", "doing", "done"]
-   createdAt: datetime
-   updatedAt: datetime

## User

-   id: string (UUID)
-   name: string
-   email: string
```

---

## 📄 plan.md → Plano Técnico e Arquitetura

**O que é:**
Documento que descreve o **plano técnico da implementação**.

**Para que serve:**

-   Define a **stack tecnológica** (ex.: React, Node, banco de dados, Tailwind).
-   Mostra a **arquitetura** e padrões a seguir.
-   Pode incluir **fluxos de autenticação, deploy e CI/CD**.

```markdown
# Plano Técnico

-   Frontend: React + TypeScript + Vite
-   Backend: Node.js + Express
-   Banco: PostgreSQL
-   Autenticação: JWT
-   Hospedagem: Vercel (frontend) + Railway (backend)
-   Estilo: TailwindCSS
```

---

## 📄 research.md → Justificativa e Comparações

**O que é:**
Documento de **pesquisa e referências técnicas**.

**Para que serve:**

-   Guarda estudos de **bibliotecas comparadas** (ex.: Tailwind vs Bootstrap).
-   Inclui links úteis, benchmarks e trade-offs.
-   Justifica **por que a escolha técnica foi feita**.

```markdown
# Research

-   Estado global:
    -   Redux → robusto, mas pesado.
    -   Zustand → leve, simples, ideal para MVP.
-   Estilização:
    -   TailwindCSS escolhido pela velocidade e suporte a design system.
-   Persistência local:
    -   LocalStorage para MVP (sem necessidade de backend inicial).
```

---

### 6️⃣ Validar o Plano

Peça pro Gemini auditar o plano:

```bash
/specify Audite o plano de implementação.
Leia com olho crítico e determine a sequência de tarefas.
```

ou

```bash
Audite o plano de implementação e os arquivos de detalhes. Leia com olho crítico
para determinar se há uma sequência óbvia de tarefas. Referencie os lugares
apropriados nos detalhes de implementação onde pode encontrar informações.

```

---

### 7️⃣ Gerar Tarefas (/tasks)

```bash
/tasks
```

➡️ Divide em tarefas pequenas e revisáveis.

---

### 8️⃣ Implementar

# Rodar apenas a T001

```bash
specify implement --task T001
```

ou

```bash
implement specs/001-taskmaster/plan.md
```

O Gemini gera código, resolve dependências e ajusta erros de build automaticamente.

Após o Gemini/Spec-Kit gerar os diretórios:

# Marcar como concluída

```bash
specify tasks complete T001
```

---

## 🎁 Resultado Esperado

No final você terá:

-   ✅ Projeto React funcional
-   ✅ Especificações em Markdown
-   ✅ Plano técnico detalhado
-   ✅ Código TypeScript estruturado
-   ✅ Kanban com drag-and-drop
-   ✅ Gerenciamento de estado com Zustand

---

## ⚖️ Vantagens e Desvantagens

**Vantagens:**

-   🚀 Acelera muito MVPs e protótipos
-   📋 Força clareza nos requisitos
-   📝 Código bem estruturado e documentado
-   🌐 Funciona com várias stacks
-   💸 Gratuito e open-source

**Desvantagens:**

-   🧪 Ainda experimental
-   🔄 Requer refinamento constante
-   📦 Pode gerar código over-engineered
-   🤖 Dependente da qualidade dos prompts
-   ⏳ Limitado pela IA escolhida

---

## 💡 Dicas de Ouro

-   Seja **específico nas especificações**
-   Não pule a **validação e checklist**
-   Use **checkpoints de refinamento**
-   Teste bastante antes de confiar 100%
-   Itere o ciclo: **/specify → /plan → /tasks → implement → refine**

---

## 🚀 Conclusão

O **Spec Kit** pode ser um **divisor de águas**.
Ele muda o foco do **código bruto** para o **produto e experiência do usuário**.

Claro, ainda precisa de devs experientes para validar e refinar — mas o potencial é enorme: acelerar MVPs, protótipos e até features completas.

---

https://www.tabnews.com.br/n0n3br/spec-kit-desenvolvimento-de-software-orientado-por-especificacoes-sdd-com-ia

## 🚀 Como usar na prática

1. **Ir para a pasta do projeto**

    ```bash
    cd app
    ```

    (ou a pasta onde está seu código).

2. **Abrir a IDE (Cursor, VSCode com extensão, ou Bolt.new)**
   O AI Agent vai estar disponível no painel lateral.

3. **Digitar os comandos com `/` dentro do chat do agente**.
   Exemplos:

    - **Definir princípios do projeto**

        ```
        /constitution
        ```

        👉 Ele cria as regras do projeto (ex: boas práticas, padrões de código, estilo de arquitetura).

    - **Especificar o que você quer construir**

        ```
        /specify Quero uma API REST para cadastro de usuários com Node.js e Express.
        ```

        👉 Ele transforma sua ideia em uma especificação.

    - **Refinar e reduzir riscos**

        ```
        /clarify
        ```

        👉 A IA vai levantar dúvidas, pontos obscuros ou riscos antes de planejar.

    - **Gerar um plano de implementação**

        ```
        /plan
        ```

        👉 Ele cria um roadmap de alto nível.

    - **Quebrar em tarefas acionáveis**

        ```
        /tasks
        ```

        👉 Ele gera tarefas que podem ser copiadas para um Kanban ou rodar em paralelo.

    - **Analisar consistência**

        ```
        /analyze
        ```

        👉 Verifica se as specs, plano e tarefas estão alinhados.

    - **Executar implementação**

        ```
        /implement
        ```

        👉 Começa a sugerir ou até criar os arquivos de código conforme o plano.

---

## 📌 Exemplo de fluxo completo

```text
/specify Quero um sistema de login com autenticação JWT em Node.js.
/clarify
/plan
/tasks
/implement
```

Perfeito! Vamos montar um **mini tutorial prático** usando esses slash commands para criar um projeto **TODO List** com Node.js e Express. Vou simular o fluxo completo do início ao fim.

---

## 1️⃣ Entrar na pasta do projeto

```bash
mkdir todo-app
cd todo-app
```

> Aqui você já está no diretório do projeto. Se quiser, pode abrir no VSCode ou Cursor IDE para usar o AI Agent.

---

## 2️⃣ Estabelecer os princípios do projeto

No chat do AI Agent, digite:

```
/constitution
```

> A IA vai gerar algo como:
>
> -   Código limpo e modular
> -   Uso de Express + SQLite
> -   Testes unitários obrigatórios
> -   Padronização de rotas e nomes de arquivos

---

## 3️⃣ Criar a especificação do projeto

```
/specify Criar uma API REST para TODO List com:
- CRUD de tarefas (criar, listar, atualizar, excluir)
- Cada tarefa tem: id, título, descrição, status (pendente/concluída)
- Persistência em SQLite
- Retorno em JSON
```

> Resultado esperado: a IA transforma isso em um documento de especificações com endpoints e modelos de dados.

---

## 4️⃣ Clarificar e reduzir riscos

```
/clarify
```

> A IA pode levantar:
>
> -   Validar se precisamos de autenticação
> -   Verificar se todas as operações CRUD estão cobertas
> -   Confirmar o formato de data e status das tarefas

---

## 5️⃣ Criar o plano de implementação

```
/plan
```

> A IA gera algo assim:
>
> 1. Inicializar projeto Node.js (`npm init -y`)
> 2. Instalar dependências (`express`, `better-sqlite3`, `cors`, etc.)
> 3. Criar arquivo principal `index.js`
> 4. Criar módulo de rotas `routes/todos.js`
> 5. Criar módulo de persistência `db.js`
> 6. Criar endpoints CRUD
> 7. Testes básicos

---

## 6️⃣ Gerar tarefas acionáveis

```
/tasks
```

> Resultado esperado (cada item é uma task):
>
> -   [ ] Criar `package.json` com dependências
> -   [ ] Configurar `express` e servidor básico
> -   [ ] Configurar SQLite e criar tabela `todos`
> -   [ ] Criar endpoint POST `/todos`
> -   [ ] Criar endpoint GET `/todos`
> -   [ ] Criar endpoint PUT `/todos/:id`
> -   [ ] Criar endpoint DELETE `/todos/:id`
> -   [ ] Testar API com Postman ou Insomnia

> Essas tarefas podem ir direto para o seu **Kanban**.

---

## 7️⃣ Analisar consistência

```
/analyze
```

> A IA verifica se:
>
> -   Todas as rotas têm suporte CRUD
> -   A persistência está coerente
> -   Nenhuma tarefa foi esquecida

---

## 8️⃣ Executar implementação

```
/implement
```

> A IA começa a sugerir ou até gerar:

```javascript
// index.js
const express = require("express")
const cors = require("cors")
const todosRoutes = require("./routes/todos")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/todos", todosRoutes)

app.listen(3000, () => console.log("Server running on port 3000"))
```

```javascript
// routes/todos.js
const express = require("express")
const router = express.Router()
const db = require("../db")

// POST /todos
router.post("/", (req, res) => {
    const { title, description } = req.body
    const stmt = db.prepare(
        "INSERT INTO todos (title, description, status) VALUES (?, ?, ?)"
    )
    const info = stmt.run(title, description, "pendente")
    res.json({
        id: info.lastInsertRowid,
        title,
        description,
        status: "pendente",
    })
})

// GET /todos
router.get("/", (req, res) => {
    const stmt = db.prepare("SELECT * FROM todos")
    const todos = stmt.all()
    res.json(todos)
})

module.exports = router
```

```javascript
// db.js
const Database = require("better-sqlite3")
const db = new Database("todos.db")

db.prepare(
    `
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  status TEXT
)`
).run()

module.exports = db
```

---

💡 **Pronto!** Você tem o **esqueleto funcional de um TODO List** criado com a ajuda do AI Agent usando os slash commands.
