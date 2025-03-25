let p1 = document.getElementById("p1").innerHTML
console.log(p1);

let nome = prompt ("Digite seu nome:")
let idade = prompt ("Digite sua idade:")

let ano_Atual = 2025;
let ano_nascimento = ano_Atual - idade

let resposta = "Olá " + nome + ", seu ano de nascimento é " + ano_nascimento;

document.getElementById("ex1").innerHTML=resposta;

function imprimeMensagem(msg){
    console.log(msg);
}

imprimeMensagem("mensagem 1")
imprimeMensagem("mensagem 2")
imprimeMensagem("mensagem 3")

function soma(a,b){
    return a + b;
}

let c = soma (3,4)
imprimeMensagem ("O resultado de ", a, "+", b, "é igual a: ", c)

