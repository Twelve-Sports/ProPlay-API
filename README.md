# API Novotwelve

## Descrição

Esta é uma API desenvolvida para gerenciar registros, clipes e vídeos de quadras. Ela foi construída usando Node.js, Express.js e Knex.js para interagir com um banco de dados MySQL.

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install

## Scripts

O projeto inclui os seguintes scripts que podem ser executados com `npm run <script>`:

- **start:** Inicia o servidor usando nodemon.
- **migration:** Executa as migrações do banco de dados.

## Rotas

A API inclui as seguintes rotas:

- **GET /rec:** Lista todos os registros.
- **POST /rec:** Cria um novo registro.
- **GET /clipe:** Lista todos os clipes.
- **POST /clipe:** Cria um novo clipe.
- **GET /dateNow/:court:** Cria uma nova data para uma quadra específica.
- **GET /list/:courtId:** Lista todas as datas para uma quadra específica.
- **POST /up/:dateNowId:** Salva um novo vídeo para uma data específica.
- **GET /video/:courtId:** Obtém todos os vídeos para uma quadra específica.
- **GET /videoDay/:courtId/::** Obtém todos os vídeos para uma quadra específica em um dia específico.
- **GET /videoHour/:courtId:** Obtém todos os vídeos para uma quadra específica em um dia e hora específicos.
- **GET /haveCourtDay/::** Obtém todas as quadras que têm vídeos em um dia específico.
- **GET /haveCourtHour/::** Obtém todas as quadras que têm vídeos em um dia e hora específicos.
- **POST /allVideoDay/::** Obtém todos os vídeos de todas as quadras em um dia específico.
- **POST /clipCountByGame:** Obtém a contagem de clipes por jogo.

## Dependências

As dependências do projeto incluem:

- **cors:** Para habilitar o CORS.
- **date-fns e date-fns-tz:** Para manipulação de datas.
- **dotenv:** Para carregar variáveis de ambiente.
- **express:** Para criar o servidor.
- **knex:** Para interagir com o banco de dados.
- **multer:** Para lidar com o upload de arquivos.
- **mysql2:** Driver MySQL para Node.js.
