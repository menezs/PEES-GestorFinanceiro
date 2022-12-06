# Base-PEES

### Banco de Dados

1 - No phpmyadmin criar um Banco de dados com o nome "skifree";

2 - Dentro do banco de Dados "skifree" adicionar uma nova conta de utilizador, com as seguintes informações:

    - Nome de utilizador: skifree
    
    - Palavra-passe: senha123

3 - No campo "Provilégios Globais" marque todos.

### Preparando Ambiente
1 - npm install
  -> Instala as dependências da aplicação

2 - npx sequelize db:migrate
  -> Adiciona as devidas tabelas no banco de dados.
  
3 - npx sequelize db:seed:all
  -> Preenche a tabela "Areas" com alguns valores predefinidos

### Iniciando a Aplicação Web
1 - npm start 
  -> Inicia a aplicação na porta 5500 - 
     URL: http://localhost:5500
     
