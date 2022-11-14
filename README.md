# Boas-vindas ao meu repositório!

<summary><strong>O que foi desenvolvido?</strong></summary>

Nesse projeto eu desenvolvi minha primeira API REST utilizando a arquitetura MSC (model-service-controller)!

A API construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Utilizo o banco de dados MySQL para a gestão de dados e coloco em prática o conhecimento adiquirido sobre REST, criando uma API completamente RESTful.

 <br />

# Instruções de como baixar e rodar meu projeto localmente:

<summary><strong>Faça o clone do repositório:</strong></strong></summary>

```bash
git clone git@github.com:mtssantos96/project-store-manager.git
```

<summary><strong>🐳 Rodando no Docker:</strong></summary>
- Primeiro fazermos a execução do <strong>docker-compose</strong>;

```bash
docker-compose up -d
```

- Esse comando ira inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;

- Acesse o terminal interativo do container `store_manager`:

```bash
docker exec -it store_manager bash
```

- Instale as `dependências`:

```bash
npm install
```