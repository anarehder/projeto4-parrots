const CartasTotal = ["parrot1.gif","parrot1.gif","parrot2.gif","parrot2.gif","parrot3.gif","parrot3.gif","parrot4.gif","parrot4.gif","parrot5.gif","parrot5.gif","parrot6.gif","parrot6.gif","parrot7.gif","parrot7.gif"];
const CartasJogo = [];
const NomeImagem = [];
const CartaSelecionada = [];
var Jogadas = 0;
var NumCartas;
var ConfirmaNumero = 0; // igual a 0 significa que não aceito
var Selecionadas = 0;

//debugger

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

//Colocar imagens em sequencia aletória
for (let i = 0; i < NumCartas; i++){
    CartasJogo[i] = CartasTotal[i];
    CartasJogo.sort(comparador); // Após esta linha, a minhaArray estará embaralhada
}

for (let contador = 0; contador < NumCartas; contador++){
    DistCartas.innerHTML += `
    <div data-test="card" class="carta">
      <div class="front-face face" onclick="virarCartas(this)">
      <img data-test="face-down-image" src="./imagens/back.png" alt="parrot">
      </div>
      <div class="back-face face">
      <img data-test="face-up-image" src="./imagens/${CartasJogo[contador]}" alt="parrot">
      </div>
    </div>
    `;
}

//Ao clicar em uma carta, ela deve ser virada.
function virarCartas(cartaSelecionada){
    cartaSelecionada.classList.add("girar-front-face");
    const selecionadaPai = cartaSelecionada.parentNode;
    const selecionadaVerso = selecionadaPai.querySelector(".back-face");
    selecionadaVerso.classList.add("girar-back-face");
    const imagem = selecionadaVerso.querySelector("img");
    NomeImagem.push(imagem.getAttribute('src')); // pega e guarda o nome e caminho do arquivo
    CartaSelecionada.push(cartaSelecionada); // pega e guarda a div selecionada
    Selecionadas++;
    Jogadas++;
    //Caso seja a primeira carta do par, ela deve permanecer virada até o usuário escolher a segunda carta.
    //Caso seja a segunda carta virada, existem duas situações:
    if (Selecionadas%2 == 0){
        if (NomeImagem[0] == NomeImagem[1]){
            //Caso seja igual à primeira carta devem ficar viradas pra cima até o final do jogo;
            zerarListas(NomeImagem,CartaSelecionada);
            Selecionadas = 0;
        } else if (NomeImagem[0] != NomeImagem[1]){
            //Caso seja uma carta diferente da primeira carta virada, o usuário errou. 
            //Nesse caso, o jogo deve **aguardar 1 segundo** e então virar as duas cartas para baixo novamente.
            setTimeout(desvirarCartas, 1000, CartaSelecionada[0]);
            setTimeout(desvirarCartas, 1000, CartaSelecionada[1]);
            zerarListas(NomeImagem,CartaSelecionada);
            Selecionadas = 0;
        }
    }
    const cartasViradas = document.querySelectorAll(".girar-front-face").length;
    console.log(cartasViradas);
    if (cartasViradas == NumCartas){
        alert("Você ganhou em" + Jogadas + " jogadas!");
    }
}

function desvirarCartas(CartaSelecionada){
    const Selecionada = CartaSelecionada;
    Selecionada.classList.remove("girar-front-face");
    const selecionadaPai = Selecionada.parentNode;
    const selecionadaVerso = selecionadaPai.querySelector(".back-face");
    selecionadaVerso.classList.remove("girar-back-face");
}

function zerarListas(NomeImagem,CartaSelecionada){
    NomeImagem.shift();
    NomeImagem.pop();
    CartaSelecionada.shift();
    CartaSelecionada.pop();
}

function comparador() {
	return Math.random() - 0.5;
}