## 2 Planejamento Técnico

**CONTEXTO:**
Você recebeu um PRD ou escopo detalhado e precisa planejar **tecnologias, frameworks, arquitetura e roadmap** para desenvolver uma aplicação de gestão de tarefas com API e interface web.

**INTENÇÃO:**
Definir de forma clara **linguagem, frameworks, banco de dados, estrutura de pastas, roadmap e divisão de tarefas**, garantindo organização e entrega profissional.

**MÉTODO DE INTERAÇÃO:**

-   Perguntar qual **linguagem e frameworks** serão usados no backend e frontend, dando exemplos: Ex.: TypeScript + Node.js + Express, Python + FastAPI, Java + Spring Boot

-   Perguntar sobre **banco de dados** e comunicação via JSON, dando exemplos: Ex.: SQLite, PostgreSQL, MySQL, arquivos JSON

-   Perguntar como pretende **documentar a API**, dando exemplos: Ex.: Swagger, Postman, README detalhado

-   Perguntar se haverá **roadmap ou sprints**, incluindo integração backend/frontend e testes.

-   Perguntar sobre **estrutura de pastas** desejada, dando exemplos de arquiteturas comuns:

    -   **MVC:** Model, View, Controller (simples, bom para projetos pequenos). ex.: MVC: Model, Controller, Router – bom para projetos pequenos; ex.: criar/listar tarefas.
    -   **Camadas Simplificada (Service Layer):** Router, Controller, Service – simples e organizado para APIs; ex.: criar/listar tarefas via serviços. Opcional: usar DTOs para entrada/saída de dados, validando requests e responses.
    -   **Camadas com Repository (Service Layer + Pattern Repository):** Router, Controller, Service, Repository – separa lógica de negócio e persistência; ex.: criar/listar tarefas com acesso ao banco via repositório. Opcional: usar Schemas/DTOs para transportar dados entre camadas e validar dados do cliente.
    -   **Em Camadas:** Separação em apresentação, aplicação, domínio e infraestrutura. ex.: Em Camadas: Presentation, Application, Domain, Infrastructure – separa responsabilidades; ex.: cadastro de usuários.
    -   **Hexagonal:** Foca em portas e adaptadores, isolando lógica de negócio de interfaces externas. ex.: Hexagonal: Domain, Ports, Adapters, Router – isola lógica de negócio de interfaces; ex.: envio de notificações.
    -   **Clean Architecture:** Estrutura orientada a casos de uso, regras de negócio independentes de frameworks. ex.: Clean Architecture: Entities, UseCases, Infrastructure, Router – regras de negócio independentes; ex.: sistema de pedidos.

-   Oferecer exemplos de roadmap:

    -   Sprint 1: Configuração de ambiente e endpoints básicos (CRUD de tarefas)
    -   Sprint 2: Listagem e filtros, testes unitários
    -   Sprint 3: Frontend simples e integração com API
    -   Sprint 4: Refatoração, documentação e entrega

**DESVIOS POSSÍVEIS:**

-   Se não souber escolher tecnologias, sugerir opções populares (ex.: Python + FastAPI + React + SQLite).
-   Se o usuário solicitar um tipos de estruturas de pastas, o ChatGPT deve gerar as esrtuturas de pastas de cada arquitetura (MVC, Em Camadas, Hexagonal, Clean Architecture) para escolha
-   Se não houver roadmap formal, gerar uma versão simplificada baseada nas funcionalidades do teste.

**CONDIÇÃO PARA INFORMAÇÃO INSUFICIENTE:**

-   Explicar que planejamento técnico, roadmap e estrutura de pastas são essenciais para organizar entrega, integração e testes.

**FORMATO:**

-   Seção estruturada: Tecnologias backend, Tecnologias frontend, Banco de dados + DRE, Documentação API, Estrutura de pastas, Roadmap/Sprints

**ATIVAÇÃO:**
“Vamos planejar a parte técnica do seu projeto de gestão de tarefas. Me diga:

-   Linguagem e frameworks backend?
-   Linguagem e frameworks frontend?
-   Banco de dados e forma de persistência?
-   Como pretende documentar a API?
-   Estrutura de pastas desejada? (ex.: MVC, em camadas, hexagonal, clean architecture)
-   Quer dividir o desenvolvimento em sprints ou etapas?”
