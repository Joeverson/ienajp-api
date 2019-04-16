# Tecnologies used

Node.js (v11.13.0)
  - [Instalação](https://gist.github.com/d2s/372b5943bce17b964a79)

MongoDB (v3.4.20)
  - [Instalação do mongo](https://hevodata.com/blog/install-mongodb-on-ubuntu/)
  - [Plugun para VScode](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)

Express
 - [express.js](http://expressjs.com/)


# Metodos usados

-  **Get**
-  **Post**
-  **Put**
-  **Delete**

# Estrategia de comunicação

Para se comunicar entre os clientes a API passa um objeto de comunicação onde todas as informações básicas de comunicações são contidas. É bem simples o objeto veja abaixo como ele é construído.

```
{
  data: [],	    
  <token: ''>,	    
  status: {
    success: <true || false>
    message: ''
  }  
}
```


Esse modelo sofrer mutações, então como estrategia de funcionamento, ao cliente se conectar com nosso servidor pela primeira vez, o servidor vai enviar para ele o modelo de comunicação para que sempre qualquer cliente que se conectar conosco sempre tenha o modelo de comunicação esteja atualizados.

# base de cominicação - ENDPOINT

Todos os recursos da API estão disponiveis apartir do prefix abaixo:
```
http(s)://<HOST>/api/v1
```

# Docs
 
Para obter todos os endpoins da API basta rodar o sistema e acessar o path: 
```
http(s)://<HOST>/api/v1/docs
```

# Variavel de ambiente: .env

Para poder trazer mais segurança e sigilo com as informações do banco de dados, iremos utilizar os arquivos de configuração env para poder
deixar as informações de conexões do banco de dados e possivelmento no futuro as informações de API token, mas de modo geral usamos uma lib que faz o carregamento do arquivo .env e alimenta a variavel global do node chamado 'process.env' onde pode ser acessado em quelquer lugar do script, para poder usar isso vamos primeiro instalar o 'dotenv'

-  [dotenv](https://github.com/motdotla/dotenv)

## criando arquivo de configuração

- Crie uma pasta com o nome `env` na raiz do projeto
- Dentro crie um arquivo `.env.development`, dentro dela coloque as informações do banco de dados
  como no exemplo abaixo:

```
DB_HOST=<mongodb://localhost>
DB_NAME=<NAME-DATABASE>

API_HOST=<HOST-API>
API_PORT=<PORT>

SECRET_KEY_TOKEN=<KEY-ANYTHING-kkkk>
```


Depois de instalado devemos criar um arquivo .env na raiz da aplicação, e nela podemos definir qualquer informação seguindo o padrão KEY=VALUE, e para poder capturar estas informações basta chamar process.env.KEY e o dados será disponibilizado de forma simples e rapida.

# Logger

Estamos utilizando o winston é uma lib de log bem simples e interesante de se usar, ela da um suporte interesante, principalemnte em medir tempo de algumas operações.

[Winston](https://www.npmjs.com/package/winston)

<!-- # auto-create

Para poder criar modulos de forma simples e rapida foi criado o auto-create
que em resumo, vc informa qual o nome do modulo que deseja e ele já o cria
junto com seus arquivos de dependência.

esse script é responsavel por criar qualquer modulo para o sistema
onde você passa alguns parametros como: nome do modulo, nome arquivo especifico, etc.
e ele ira montar os arquivos e as coisas todas

```
$ node scarfold.js products
```

O comando a cima é responsavel por quiar o conjunto de arquivos num modulo chamado products, por 
definição os nomes dos modulos devem ser o nome doas tabelas do banco de dados utiliando o padrão
camelCase, sabendo o nome da tabela ele irá criar o model espelhando o banco de dados

```
$ node scarfold.js products facade --clean
```

O exemplo a cima é uma forma simples de sobresescrever um arquivo especifico, limpando ele primeiro
e depois irá recria-lo com base no que se tem no script

Caso queira criar um unico arquivo e só informar as coisas de cima sem o `--clean` e ele irá criar dentro de 
modulo pre definido -->