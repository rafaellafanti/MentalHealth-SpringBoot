# MentalHealth

## Sobre o Projeto

O MentalHealth é um sistema desenvolvido para auxiliar no registro e acompanhamento de solicitações relacionadas à saúde mental, permitindo o relato de situações como ansiedade, depressão, assédio, bullying, violência psicológica e pedidos de ajuda.

O projeto foi desenvolvido como atividade acadêmica da disciplina de Engenharia de Software.

---

## Evolução do Projeto

Na primeira etapa, o sistema foi desenvolvido utilizando Java puro, com interação via terminal.

Na segunda etapa, o projeto foi migrado para Spring Boot, incorporando:

* API REST
* Persistência de dados com JPA
* Banco de dados H2
* Documentação com Swagger
* Interface web mobile desenvolvida com HTML, CSS e JavaScript

O front-end foi integrado ao projeto Spring Boot e é servido diretamente pela aplicação.

---

## Tecnologias Utilizadas

### Back-end

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* H2 Database
* Lombok
* Swagger / OpenAPI

### Front-end

* HTML5
* CSS3
* JavaScript

---

## Funcionalidades

### Interface Web

* Tela de Login
* Tela Inicial
* Nova Solicitação
* Consulta de Solicitação
* Dashboard
* FAQ
* Telefones de Emergência
* Atualização de Status

### API REST

* Criar solicitação
* Listar solicitações
* Buscar solicitação por ID
* Atualizar solicitação
* Excluir solicitação

---

## Arquitetura do Projeto

O sistema foi desenvolvido seguindo a arquitetura em camadas proposta para a evolução do projeto:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Model
```

As regras de negócio são concentradas na camada Service, enquanto os Controllers são responsáveis apenas pelo recebimento das requisições e retorno das respostas.

---

## Estrutura do Projeto

```text
src/main/java
├── controllers
├── services
├── repositories
└── models

src/main/resources
├── templates
│   └── index.html
└── static
    ├── style.css
    └── app.js
```

---

## Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Abrir no IntelliJ IDEA

Importe o projeto como Maven Project.

### 3. Executar a Aplicação

Executar a classe:

```java
MentalHealth2Application
```

---

## Acessos

### Interface Web

Após iniciar a aplicação:

```text
http://localhost:8080
```

### Documentação da API (Swagger)

```text
http://localhost:8080/swagger-ui/index.html
```

### Console do Banco H2

```text
http://localhost:8080/h2-console
```

---

## Testando a API

A API pode ser testada através de:

* Swagger UI
* Postman

### Exemplo de criação de solicitação

```json
{
  "categoria": "ANSIEDADE",
  "descricao": "Teste de solicitação",
  "localizacao": "Universidade",
  "anonimo": true,
  "prioridade": "MEDIA"
}
```

---

## Observação sobre o Swagger

O Swagger gera automaticamente exemplos JSON contendo todos os atributos da entidade.

Para criar uma nova solicitação, recomenda-se utilizar apenas os campos necessários apresentados no exemplo acima.

Campos como:

* protocolo
* status
* prazo
* histórico

são gerenciados internamente pela aplicação e não precisam ser enviados manualmente.

---

## Observações

* O sistema foi desenvolvido com foco acadêmico.
* O projeto representa a evolução de uma aplicação Java Orientada a Objetos desenvolvida inicialmente para execução em terminal.
* O front-end encontra-se integrado ao projeto Spring Boot através das pastas `templates` e `static`.
* Algumas telas utilizam dados mockados para simulação visual da interface.
* O CRUD completo da entidade Solicitação está disponível através da API REST.
* A interface web implementa principalmente as funcionalidades de criação, consulta e acompanhamento das solicitações.
* O projeto segue a arquitetura Controller → Service → Repository → Model conforme os requisitos da atividade.

---

## Requisitos Atendidos

* Spring Boot
* Programação Orientada a Objetos
* Arquitetura Controller / Service / Repository
* Regras de negócio concentradas na camada Service
* API REST com endpoints CRUD
* MVC para disponibilização da interface web
* Persistência de dados utilizando JPA e H2 Database
* Documentação da API com Swagger

---

## Autores

Projeto desenvolvido para a disciplina de Engenharia de Software.
