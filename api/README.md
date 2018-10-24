# Tecnologies used
-  [node](https://nodejs.org) : server tecnology base

-  [express](http://expressjs.com/) : used for create the API rest

# Routes

-  **Get [with param id or not]**
-  **Post**
-  **Put**
-  **Delete**  

# Object context comunications  
Para poder se comunicar entre o cliente e o servidor basta passar um objeto de comunicação onde todas as informações básicas de comunicações. É bem simples o objeto veja abaixo como ele é construído.

    {
      token: '',	    
	    data: {},	    
	    options: {}  
	}

Por esse modelo sofrer mutações, então como estrategia de funcionamento, ao cliente se conectar com nosso servidor pela primeira vez, o servidor vai enviar para ele o modelo de comunicação para que sempre qualquer cliente que se conectar conosco sempre tenha o modelo de comunicação esteja atualizados.

# Base of the request API - ENDPOINT
  > /api/v1

# ENDPOINTS
 
## User

- `GET /user/search HTTP/1.1` - Return all users
- `GET /user/searchCounter` - Return the quantity of all users
- `GET /user/delete` - Delete user

## Customer

- `POST /customer` - Return all customers
- `GET /customer/:id` - Return data of specific customers
- `GET /customer/:id/orders` - Return all orders of customer

## Product

- `GET /product` - Return all products
- `GET /product/:id` - Return data of specific products

## Produceeding

- `GET /produced` - Return all products produced
- `GET /produced/:id` - Returns produced products filtered by id
- `GET /produced/quality` - Returns the quality of the products produced

## Proceeding

- `GET /proceeding/producing` - Return all products that are in production line


## Planning Production

- `GET /planning-production` - Return all prodution planning
- `POST /planning-production` - Insert the prodution planning and yout bound service orders in the db
- `GET /planning-production/:id` - Returns prodution planning filtered by id and your bound service orders
- `PUT /planning-production/:id` - Update the prodution planning and your bound service orders
- `DELETE /planning-production/:id` - Delete the prodution planning and your bound service orders
- `GET /produced/quality` - Returns the quality of the products produced

## Sector
- `GET /sector/status` - Return all sectors status
- `GET /sector/reworks` - Return all reworks on sectors
- `POST /sector` - Insert the sector in the db
- `GET /sector` - Returns all sectors paginates or filtered by idArea with query string
- `GET /sector/:id/status` - Return all status by sector
- `GET /sector/:id/errors` - Return all errors by sector
- `GET /sector/:id/orders` - Return all orders service by sector
- `GET /sector/:id/variables` - Return all variables perfommace by sector
- `PUT /sector/:id` - Update the sector
- `DELETE /sector/:id` - Delete the sector
- `GET /sector/:id` - Return the sector

## Production Lines
- `GET /production-lines` - Returns everything in the production line inventory

# .env

Para poder trazer mais segurança e sigilo com as informações do banco de dados, iremos utilizar o .env para poder
deixar as informações de conexões do banco de dados e possivelmento no futuro as informações de API token, mas de modo geral usamos uma lib que faz o carregamento do arquivo .env e alimenta a variavel global do node chamado 'process.env' onde pode ser acessado em quelquer lugar do script, para poder usar isso vamos primeiro instalar o 'dotenv'

-  [dotenv](https://github.com/motdotla/dotenv)

Depois de instalado devemos criar um arquivo .env na raiz da aplicação, e nela podemos definir qualquer informação seguindo o padrão KEY=VALUE, e para poder capturar estas informações basta chamar process.env.KEY e o dados será disponibilizado de forma simples e rapida.

# Logger

Estamos utilizando o winston é uma lib de log bem simples e interesante de se usar, ela da um suporte interesante, principalemnte em medir tempo de algumas operações.

[--> Winston](https://www.npmjs.com/package/winston)

# auto-create

Para poder criar modulos de forma simples e rapida foi criado o auto-create
que em resumo, vc informa qual o nome do modulo que deseja e ele já o cria
junto com seus arquivos dependência.

esse script é responsavel por criar qualquer modulo para o sistema
onde você passa alguns parametros como: nome do modulo, nome arquivo especifico, etc.
e ele ira montar os arquivos e as coisas todas

exemplo: "$~ node scarfold.js products"

O comando a cima é responsavel por quiar o conjunto de arquivos num modulo chamado products, por 
definição os nomes dos modulos devem ser o nome doas tabelas do banco de dados utiliando o padrão
camelCase, sabendo o nome da tabela ele irá criar o model espelhando o banco de dados

exemplo: node scarfold.js products facade --clean

O exemplo a cima é uma forma simples de sobresescrever um arquivo especifico, limpando ele primeiro
e depois irá recria-lo com base no que se tem no script

Caso queira criar um unico arquivo e só informar as coisas de cima sem o '--clean' e ele irá criar dentro de 
modulo pre definido