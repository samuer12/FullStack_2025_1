function imprimeMensagem(msg){
    console.log(msg);
}


let numcustom = prompt("Digite um número!")
let num = Math.floor(Math.random() * 20);
imprimeMensagem (num) 

let resposta = "Você tentou: " + numcustom;
document.getElementById("numero").innerHTML=resposta;


function ex2() {
    numcustom = Number(document.getElementById("ex2_in").value);
    let resposta = "Você tentou: " + numcustom;
    document.getElementById("numero").innerHTML=resposta;
    if (numcustom > num) {
        let resposta2 = "DICA: Tente um menor!";
        document.getElementById("dica").innerHTML=resposta2;
    } else if (numcustom < num) {
        let resposta2 = "DICA: Tente um maior!";
        document.getElementById("dica").innerHTML=resposta2;
    } else {
        let resposta2 = "PARABÉNS !";
        document.getElementById("dica").innerHTML=resposta2;
    }
}


