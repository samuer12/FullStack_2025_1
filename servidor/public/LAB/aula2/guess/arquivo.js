function imprimeMensagem(msg){
    console.log(msg);
}


let num = Math.floor(Math.random() * 100);
imprimeMensagem (num) 




function ex2() {
    numcustom = Number(document.getElementById("ex2_in").value);
    let resposta = "Você tentou: " + numcustom;
    document.getElementById("numero").innerHTML=resposta;
    if (numcustom > num) {
        let resposta2 = "DICA: Tente um menor!";
        document.getElementById("dica").innerHTML=resposta2;
        document.getElementById("numero").style.setProperty("background-color", "red");
    } else if (numcustom < num) {
        let resposta2 = "DICA: Tente um maior!";
        document.getElementById("dica").innerHTML=resposta2;
        document.getElementById("numero").style.setProperty("background-color", "red");
    } else {
        let resposta2 = "PARABÉNS !";
        document.getElementById("dica").innerHTML=resposta2;
        document.getElementById("numero").style.setProperty("background-color", "green");
    }
}

