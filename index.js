const Express = require('express');
const bodyParser = require('body-parser');
/*Esta linha importa o módulo body-parser, que é um middleware para Express.js que analisa o corpo da requisição 
e o disponibiliza na propriedade req.body.*/
const mysql = require('mysql2');

const fileUpload = require('express-fileupload');
const fs = require('fs');

/*express-fileupload: Este módulo é usado para lidar com uploads de arquivos no Express.js. 
Ele simplifica o processo de manipulação de solicitações de dados de formulário/ e permite que você acesse facilmente 
arquivos carregados em suas rotas.

fs: Este é o módulo do sistema de arquivos embutido no Node.js. Ele fornece métodos para interagir com o sistema de arquivos, 
como ler e gravar arquivos, criar diretórios e muito mais.*/

const conexao = mysql.createConnection({
	host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projeto'
});

/*A variável conexao é criada usando mysql.createConnection() para estabelecer uma conexão com o banco de dados MySQL.
Os detalhes da conexão (host, usuário, senha, banco de dados) são fornecidos como opções de configuração.*/

const cors = require('cors');

/*O módulo cors é um middleware para Express.js que permite Cross-Origin Resource Sharing (CORS) no servidor. 
O CORS é um mecanismo que permite aos navegadores da Web fazer solicitações de origem cruzada, 
que são solicitações para um domínio diferente daquele que atende à página da Web.*/

const app = Express();

/*Esta linha cria uma instância do aplicativo Express. 
Ele permite que você configure rotas, middleware e outras configurações para seu servidor.*/

app.use(cors());
app.use(bodyParser.json());

/*Essa linha adiciona o middleware do analisador de corpo ao aplicativo Express. 
bodyParser.json() é uma função de middleware que analisa as cargas JSON recebidas e as disponibiliza na propriedade req.body*/

app.use(bodyParser.urlencoded({extended:true}));

/*esta linha adiciona outro middleware de analisador de corpo ao aplicativo Express. 
bodyParser.urlencoded() é uma função de middleware que analisa cargas úteis codificadas em URL recebidas 
e as disponibiliza na propriedade req.body. A opção extended: true permite a análise de objetos aninhados.*/

app.use(fileUpload());
app.use('/Fotos',Express.static(__dirname +'/Fotos'));

/*A função express.static() cria uma nova função de middleware para servir arquivos estáticos. 
Ele usa o caminho do diretório como um argumento.__dirname é uma variável global em Node.js que representa o caminho do diretório 
atual. Nesse caso, refere-se ao diretório onde o arquivo atual está localizado.
'/Fotos' é o caminho de URL base de onde os arquivos estáticos serão servidos.

A função app.use() monta a função de middleware criada por express.static() ...
no caminho de URL base especificado ('/Fotos')..*/

app.listen(4000, () =>{
	conexao.connect((err) =>{
		if (err) throw err;
		else {
		console.log("Conectado ao Banco de dados")
	}
	
})

})

/*Dentro da função callback de app.listen(), o método conexao.connect() é chamado para estabelecer a conexão 
com o banco de dados MySQL. 
Se ocorrer um erro durante a tentativa de conexão, ele será capturado pelo parâmetro err na função callback 
e lançado com throw err;. Se a conexão for bem-sucedida, ele registra a mensagem "Conectado ao Banco de dados".*/

app.get('/', (req, res) => {
	res.send("Pagina inicial do app")
} )

/*Médodos CRUD para a tabela dos departamentos*/

app.get('/api/departamento', (req, res) => {
	let query = `SELECT * FROM departamento`;
	conexao.query(query, function (err, linhas, dados){
		if(err){
			res.send('Query falhou');
		}
		res.send(linhas);
	})
})

/*
Dentro da função callback é definida uma query string SQL para selecionar todos os registros da tabela 
"departamento": SELECT * FROM departamento.
A consulta é executada usando conexao.query(), passando a query string e uma função callback para tratar o resultado da consulta.
Caso ocorra algum erro durante a execução da consulta, a função callback enviará a resposta com a mensagem 
'Consulta falhou' utilizando res.send().
Se a consulta for bem-sucedida, a função callback enviará a resposta com as linhas retornadas da consulta usando res.send(linhas).
 A variável linhas contém uma matriz de objetos que representam os registros selecionados.*/


app.post('/api/departamento', (req, res) => {
  let query = `INSERT INTO departamento (nomeDepartamento) VALUES (?)`;
  let valores = [
    req.body.nomeDepartamento
  ];

  conexao.query(query, valores, function (err, linhas, dados) {
    if (err) {
      res.send('Query falhou');
    }
    res.json("Adicionado com sucesso!");
  });
});

/*Dentro da função callback, uma query string SQL é definida para inserir um novo registro na tabela "departamento". 
A consulta usa um espaço reservado de parâmetro? para indicar o valor será fornecido separadamente.
A variável values é um array contendo o(s) valor(es) a ser(em) inserido(s). 
Nesse caso, espera-se um único valor, req.body.nomeDepartamento, obtido do corpo da requisição.
A consulta é executada usando conexao.query(), passando a string de consulta, array de valores e uma função callback 
para tratar o resultado da consulta.
Caso ocorra algum erro durante a execução da consulta, a função callback enviará a resposta com a mensagem 'Consulta falhou' 
utilizando res.send().
Se a consulta for bem-sucedida, a função callback enviará a resposta com a mensagem "Adicionado com sucesso!" 
usando res.json().*/


app.put('/api/departamento', (req, res) => {
  let query = `UPDATE departamento set nomeDepartamento=? where idDepartamento=?`;
  let valores = [
    req.body.nomeDepartamento,
    req.body.idDepartamento,
  ];

  conexao.query(query, valores, function (err, linhas, dados) {
    if (err) {
      res.send('Query falhou');
    }
    res.json("Atualizado com sucesso!");
  });
});

/*Dentro da função callback, uma string de consulta SQL é definida para atualizar um registro na tabela "departamento". 
A consulta usa um espaço reservado de parâmetro? para indicar os valores serão fornecidos separadamente.
A variável values é um array contendo os valores a serem atualizados. 
Neste caso, espera-se dois valores: req.body.nomeDepartamento e req.body.idDepartamento, obtidos do corpo da requisição.
A consulta é executada usando conexao.query(), passando a string de consulta, array de valores e uma função callback 
para tratar o resultado da consulta.
Caso ocorra algum erro durante a execução da consulta, a função callback enviará a resposta com a mensagem 'Consulta falhou' 
utilizando res.send().
Se a consulta for bem-sucedida, a função callback enviará a resposta com a mensagem "Atualizado com sucesso!" 
usando res.json().*/


app.delete('/api/departamento/:id', (req, res) => {
  let query = `DELETE from departamento where idDepartamento=?`;
  let valores = [
    parseInt(req.params.id)
  ];

/*Dentro da função de retorno de chamada, uma string de consulta SQL é definida para excluir um registro da tabela "departamento" 
com base no ID fornecido. A consulta usa um espaço reservado de parâmetro? para indicar o valor será fornecido separadamente.
A variável values é um array contendo o valor a ser usado para o ID. Nesse caso, espera-se um único valor, parseInt(req.params.id), 
obtido dos parâmetros da requisição. parseInt() é usado para converter o ID em um número inteiro.*/

  conexao.query(query, valores, function (err, linhas, dados) {
    if (err) {
      res.send('Query falhou');
    }
    res.json("Deletado com sucesso!");
  });
});

/*A consulta é executada usando conexao.query(), passando a string de consulta, array de valores e uma função callback 
para tratar o resultado da consulta.
Caso ocorra algum erro durante a execução da consulta, a função callback enviará a resposta com a mensagem:
'Consulta falhou' utilizando res.send().
Se a consulta for bem-sucedida, a função callback enviará a resposta com a mensagem "Deletado com sucesso!" 
usando res.json().*/



/*Médodos CRUD para a tabela dos empregados*/
app.get('/api/empregado', (req, res) => {
	let query = `SELECT * FROM empregado`;
	conexao.query(query, function (err, linhas, dados){
		if(err){
			res.send('Query falhou');
		}
		res.send(linhas);
	})
});

/*Dentro da função callback é definida uma query string SQL para selecionar todos os registros da tabela 
"empregado": SELECT * FROM empregado.
A consulta é executada usando conexao.query(), passando a query string e uma função callback para tratar o resultado da consulta.
Caso ocorra algum erro durante a execução da consulta, a função callback enviará a resposta com a mensagem 
'Consulta falhou' utilizando res.send().
Se a consulta for bem-sucedida, a função callback enviará a resposta com as linhas retornadas da consulta usando res.send(linhas).
 A variável linhas contém uma matriz de objetos que representam os registros selecionados.*/

app.post('/api/empregado', (req, res) => {
  let query = `INSERT INTO empregado (nomeEmpregado, departamento, dataDeContratacao, foto) VALUES (?,?,?,?)`;
  let valores = [
    req.body.nomeEmpregado,
    req.body.departamento,
    req.body.dataDeContratacao,
    req.body.foto
  ];

  conexao.query(query, valores, function (err, linhas, dados) {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar empregado.');
    }
    res.json("Adicionado com sucesso!");
  });
});

/*Dentro da função callback, uma string de consulta SQL é definida para inserir um novo registro na tabela "empregado".
A interrogação é um parâmetro para indicar que os valores serão fornecidos separadamente.
A variável values é um array contendo os valores a serem inseridos. 
Nesse caso, espera quatro valores obtidos do corpo da solicitação: 
req.body.nomeEmpregado, req.body.departamento, req.body.dataDeContratacao e req.body.foto.

Esses valores são retirados do corpo da solicitação usando req.body e são atribuídos às posições correspondentes
 na matriz de valores. A consulta é executada usando conexao.query(), passando a string de consulta, 
array de valores e uma função callback para tratar o resultado da consulta.
Se ocorrer um erro durante a execução da consulta, a função de retorno de chamada registrará o erro no console 
usando console.error(err) para fins de depuração. Em seguida, retorna uma resposta com o código de status 500 
(Erro interno do servidor) 
e a mensagem 'Erro ao empregador.' using res.status(500).send('Erro ao adicionar empregado.').*/


app.put('/api/empregado', (req, res) => {
  let query = `UPDATE empregado set nomeEmpregado=?, departamento=?, dataDeContratacao=?, foto=? where idEmpregado=?`;
  let valores = [
    req.body.nomeEmpregado,
    req.body.departamento,
    req.body.dataDeContratacao,
    req.body.foto,
    req.body.idEmpregado
  ];

/*Dentro da função callback, uma string de consulta SQL é definida para atualizar o registro na tabela "empregado". 
A consulta usa espaços reservados de parâmetro? para indicar que os valores serão fornecidos separadamente.
A variável values é um array contendo os valores a serem inseridos. 
Nesse caso, espera quatro valores obtidos do corpo da solicitação: 
req.body.nomeEmpregado, req.body.departamento, req.body.dataDeContratacao e req.body.foto.
Esses valores são retirados do corpo da solicitação usando req.body e são atribuídos às posições correspondentes 
na matriz de valores.*/

  conexao.query(query, valores, function (err, linhas, dados) {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar empregado.');
    }
    res.json("Atualizado com sucesso!");
  });
});

/*A consulta é executada usando conexao.query(), passando a string de consulta, array de valores e uma função callback 
para tratar o resultado da consulta.
Se ocorrer um erro durante a execução da consulta, a função de retorno de chamada registrará o erro no console 
usando console.error(err) para fins de depuração.
Em seguida, retorna uma resposta com o código de status 500 (Erro interno do servidor) e a mensagem 'Erro ao adicionar empregado' 
usando res.status(500).send('Erro ao adicionar empregado.').*/

app.delete('/api/empregado/:id', (req, res) => {
  let query = `DELETE from empregado where idEmpregado=?`;
  let valores = [
    parseInt(req.params.id)
  ];

/*Dentro da função callback, uma string de consulta SQL é definida para excluir um registro da tabela "empregado" com base no ID. 
A consulta usa um espaço reservado de parâmetro? para indicar que o valor será fornecido separadamente.
A variável values é um array contendo o valor a ser deletado. Neste caso, espera-se um único valor obtido dos parâmetros 
da requisição: req.params.id. A função parseInt() é usada para converter o ID de uma string em um número inteiro.*/

  conexao.query(query, valores, function (err, linhas, dados) {
    if (err) {
      res.send('Query falhou');
    }
    res.json("Deletado com sucesso!");
  });
});


/*A consulta é executada usando conexao.query(), passando a string de consulta, array de valores e uma função callback 
para tratar o resultado da consulta.
Caso ocorra algum erro durante a execução da consulta, a função callback enviará a resposta com a mensagem 
'Consulta falhou' utilizando res.send().
Se a consulta for bem-sucedida, a função callback enviará a resposta com a mensagem "Excluído com sucesso!" usando res.json().*/

app.post('/api/empregado/salvararquivo', (req, res) => {
  let caminho = './Fotos/' + req.files.file.name;
  fs.writeFile(caminho, req.files.file.data, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Erro ao salvar arquivo.');
    }
    res.json(req.files.file.name);
  });
});
/*Quando uma solicitação POST é feita para o endereço /api/empregado/salvararquivo, 
o código dentro da função do manipulador de rota será executado. A variável caminho é criada concatenando o caminho do diretório
 './Fotos/' com a propriedade name do arquivo carregado. Isso determinará o caminho onde o arquivo será salvo.

A função fs.writeFile é usada para gravar o conteúdo do arquivo carregado no caminho especificado. 
Ele usa o caminho, os dados do arquivo (req.files.file.data) e uma função callback como parâmetros. Dentro da função callback 
de chamada, ela primeiro verifica se ocorreu algum erro durante o processo de gravação do arquivo. 
Se houver algum erro, ele registra a mensagem de erro no console e envia uma resposta com um código de status 500 
e uma mensagem de erro: 'Erro ao salvar arquivo.'

Se não ocorreu nenhum erro, ele envia uma resposta JSON com o nome do arquivo salvo (req.files.file.name).*/