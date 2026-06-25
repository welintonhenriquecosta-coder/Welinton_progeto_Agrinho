// ===============================
// TROCA DE PÁGINAS
// ===============================


function mostrarPagina(numero){


    document.querySelectorAll(".page")
    .forEach(pagina=>{

        pagina.classList.remove("active");

    });



    const pagina = document.getElementById(`pagina${numero}`);


    if(pagina){

        pagina.classList.add("active");

    }


}




// MENU

document.getElementById("nav1")
?.addEventListener("click",()=>mostrarPagina(1));


document.getElementById("nav2")
?.addEventListener("click",()=>mostrarPagina(2));


document.getElementById("nav3")
?.addEventListener("click",()=>mostrarPagina(3));


document.getElementById("nav4")
?.addEventListener("click",()=>mostrarPagina(4));









// ===============================
// SALVAR RESPOSTAS
// ===============================


function salvarRespostas(){


let respostas = {


    resposta1:
    document.getElementById("ans1").value,


    resposta2:
    document.getElementById("ans2").value,


    resposta3:
    document.getElementById("ans3").value


};



localStorage.setItem(
"respostas",
JSON.stringify(respostas)
);



document
.getElementById("msgSalvo")
.classList
.remove("hidden");


}










// ===============================
// QUIZ SUSTENTABILIDADE
// ===============================


const perguntasQuiz = [

{
pergunta:"Qual dessas opções é uma fonte de energia limpa?",
opcoes:["Carvão","Energia Solar","Petróleo"],
correta:"Energia Solar"
},

{
pergunta:"O que significa os 3Rs da sustentabilidade?",
opcoes:[
"Reduzir, Reutilizar, Reciclar",
"Reparar, Repor, Retirar",
"Recusar, Reagir, Refazer"
],
correta:"Reduzir, Reutilizar, Reciclar"
},

{
pergunta:"Por que preservar a vegetação perto dos rios?",
opcoes:[
"Para proteger o solo e a água",
"Somente para deixar bonito",
"Não possui importância"
],
correta:"Para proteger o solo e a água"
},

{
pergunta:"Qual recurso devemos economizar no dia a dia?",
opcoes:[
"Água",
"Lixo",
"Poluição"
],
correta:"Água"
},

{
pergunta:"Qual energia utiliza a luz do sol?",
opcoes:[
"Solar",
"Carvão",
"Petróleo"
],
correta:"Solar"
},

{
pergunta:"Sustentabilidade busca:",
opcoes:[
"Preservar recursos para o futuro",
"Gastar mais recursos naturais",
"Ignorar o meio ambiente"
],
correta:"Preservar recursos para o futuro"
},

{
pergunta:"A reciclagem ajuda a:",
opcoes:[
"Reduzir resíduos",
"Aumentar a poluição",
"Destruir recursos"
],
correta:"Reduzir resíduos"
},

{
pergunta:"Qual atitude ajuda o planeta?",
opcoes:[
"Economizar energia",
"Desperdiçar água",
"Jogar lixo nos rios"
],
correta:"Economizar energia"
},

{
pergunta:"Energia eólica utiliza:",
opcoes:[
"Força do vento",
"Combustível",
"Carvão"
],
correta:"Força do vento"
},

{
pergunta:"Cuidar do meio ambiente é importante porque:",
opcoes:[
"Garante qualidade de vida",
"Não muda nada",
"Acaba com recursos"
],
correta:"Garante qualidade de vida"
}

];




// embaralhar

function misturar(array){

return array.sort(()=>Math.random()-0.5);

}





function carregarQuiz(){


let area = document.querySelector(".quiz");


let perguntas = misturar([...perguntasQuiz]);



let conteudo = "";



perguntas.forEach((item,index)=>{


let alternativas = misturar([...item.opcoes]);



conteudo += `

<div class="pergunta">


<p>
${index + 1}. ${item.pergunta}
</p>



${alternativas.map(opcao=>`


<label>


<input 
type="radio"
name="q${index}"
value="${opcao === item.correta ? "correto":"errado"}">


${opcao}


</label>


`).join("")}



</div>

`;



});



area.innerHTML = conteudo;

area.innerHTML += `

<button onclick="verificarQuiz()" class="finalizar">

Finalizar Quiz 🎯

</button>


<div id="resultadoQuiz">

</div>

`;


}



carregarQuiz();

function verificarQuiz(){


let pontos = 0;


document
.querySelectorAll('input[type="radio"]:checked')
.forEach(resposta=>{


if(resposta.value==="correto"){

pontos++;

}


});


let titulo =
document.getElementById("tituloResultado");


let texto =
document.getElementById("textoResultado");


let resultado =
document.getElementById("resultadoQuiz");

let titulo =
document.getElementById("tituloResultado");

let texto =
document.getElementById("textoResultado");


resultado.classList.add("mostrar");



if(pontos >= 9){


confetti({

particleCount:200,

spread:120,

startVelocity:40

});



titulo.innerHTML = "🎉 PARABÉNS! 🎉";


texto.innerHTML = 
`
Você acertou ${pontos} de 10 perguntas!

<br><br>

🌱 Excelente! Você tem um ótimo conhecimento sobre sustentabilidade!
`;



}



else if(pontos >= 6){



confetti({

particleCount:80,

spread:80

});



titulo.innerHTML = "👏 Muito bom!";


texto.innerHTML =

`
Você acertou ${pontos} de 10 perguntas.

<br><br>

Continue aprendendo e melhorando 🌱
`;



}



else{



titulo.innerHTML = "😔 Poxaaa...";


texto.innerHTML =

`
Você acertou ${pontos} de 10 perguntas.

<br><br>

📚 Estude mais um pouco e tente novamente.
Você consegue 🌱
`;



}

}

// ===============================
// MOSTRAR COMENTÁRIOS
// ===============================


function carregarComentarios(){



const lista =
document.getElementById("listaComentarios");



if(!lista) return;



let comentarios =

JSON.parse(

localStorage.getItem("comentarios")

) || [];




lista.innerHTML="";




comentarios.reverse().forEach(item=>{


lista.innerHTML += `

<div>

<h4>
${item.nome}
</h4>


<p>
⭐ ${item.nota}
</p>


<p>
${item.texto}
</p>


</div>

`;


});



}



carregarComentarios();


// ===============================
// TEMA ESCURO / CLARO
// ===============================


const tema =
document.getElementById("tema");


tema.addEventListener("click",()=>{


document.body.classList.toggle("light");


if(document.body.classList.contains("light")){


tema.innerHTML="🌙";


}else{


tema.innerHTML="☀️";


}


});








// ===============================
// VOLTAR AO TOPO
// ===============================


const topo =
document.getElementById("topo");



window.addEventListener("scroll",()=>{


if(window.scrollY > 300){

topo.style.display="block";

}else{

topo.style.display="none";

}


});





topo?.addEventListener("click",()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});

function refazerQuiz(){

location.reload();

}