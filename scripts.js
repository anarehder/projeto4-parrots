const CartasTotal = ["parrot1.gif","parrot1.gif","parrot2.gif","parrot2.gif","parrot3.gif","parrot3.gif","parrot4.gif","parrot4.gif","parrot5.gif","parrot5.gif","parrot6.gif","parrot6.gif","parrot7.gif","parrot7.gif"];
const CartasJogo = [];
var NumCartas;
var ConfirmaNumero = 0; // igual a 0 significa que não aceito

while(ConfirmaNumero == 0){
    NumCartas = Number(prompt("Com quantas cartas você deseja jogar?"));
    if (NumCartas%2 == 0){
        if (NumCartas < 4 || NumCartas > 14){
            ConfirmaNumero = 0;  //valor inválido
            alert("Valor inválido!!");
        }
        else{
            ConfirmaNumero = 1; //valor válido
        }
    }
    else{
        alert("Valor inválido!!");
    }
}

const DistCartas = document.querySelector(".jogo");
DistCartas.innerHTML="";

//Colocar imagens em sequencia aletória
for (let i = 0; i < NumCartas; i++){
    CartasJogo[i] = CartasTotal[i];
    CartasJogo.sort(comparador); // Após esta linha, a minhaArray estará embaralhada
    //console.log(CartasJogo);
}

for (let contador = 0; contador < NumCartas; contador++){
    DistCartas.innerHTML += `
    <div data-test="card" class="carta">
      <div class="front-face face" onclick="virarCartas(this)">
      <img ata-test="face-down-image" src="./imagens/back.png" alt="parrot">
      </div>
      <div class="back-face face">
      <img data-test="face-up-image" src="./imagens/${CartasJogo[contador]}" alt="parrot">
      </div>
    </div>
    `;
}

function virarCartas(cartaSelecionada){
    cartaSelecionada.classList.add("girar-front-face");
    const selecionadaPai = cartaSelecionada.parentNode;
    const selecionadaVerso = selecionadaPai.querySelector(".back-face");
    selecionadaVerso.classList.add("girar-back-face");
}

// Esta função pode ficar separada do código acima, onde você preferir
function comparador() {
	return Math.random() - 0.5;
}

//setInterval mostrar o tempo na tela até um break
//faço um contador e imprimo o contador const numero = setInterval(função,1000)
//para parar uso clearInterval(numero)

//setTimeout para esperar 1 segundo para desvirar a carta