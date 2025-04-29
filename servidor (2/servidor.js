var http = require('http');
var express = require('express');
let bodyParser = require("body-parser");

var app = express();

let usuariosCadastrados = [];

app.use(express.static('./public'));
var server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

server.listen(80);
console.log("Servidor rodando...");

app.get("/", function(requisicao, resposta) {
    resposta.sendFile(__dirname + '/public/index.html');
});
app.post("/cadastrar", function(requisicao, resposta) {
    let nome = requisicao.body.nome;
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;
    let nasc = requisicao.body.nascimento;

    usuariosCadastrados.push({
        nome: nome,
        login: login,
        senha: senha,
        nascimento: nasc
    });

    console.log("Usuário cadastrado:", { nome, login, senha, nasc });    resposta.redirect('/');
});

app.get("/login", function(requisicao, resposta) {
    let login = requisicao.query.login;
    let senha = requisicao.query.senha;

    let usuario = usuariosCadastrados.find(u => u.login === login && u.senha === senha);

    if (usuario) {
        resposta.render("resposta", { 
            mensagem: "Login bem-sucedido!",
            nome: usuario.nome,
            login: usuario.login,
            nasc: usuario.nascimento
        });
    } else {
        resposta.render("erro");
    }
});

