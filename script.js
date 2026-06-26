// ===============================
// SOM + VIBRAÇÃO (NÍVEL APP)
// ===============================

const clickSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-click-melodic-tone-1129.mp3");

function tocarClique(){
    clickSound.currentTime = 0;
    clickSound.play();
}

function vibrar(){
    if(navigator.vibrate){
        navigator.vibrate(30);
    }
}

// ===============================
// TROCA DE PÁGINAS (SUAVE)
// ===============================

function mostrarPagina(numero){

    const paginas = document.querySelectorAll(".page");

    paginas.forEach(p=>{
        p.classList.remove("active");
        p.style.opacity = "0";
        p.style.transform = "translateY(20px)";
    });

    const pagina = document.getElementById(`pagina${numero}`);

    if(pagina){
        pagina.classList.add("active");

        setTimeout(()=>{
            pagina.style.opacity = "1";
            pagina.style.transform = "translateY(0)";
        }, 50);
    }

    tocarClique();
    vibrar();
}

// ===============================
// MENU
// ===============================

document.getElementById("nav1")?.addEventListener("click",()=>mostrarPagina(1));
document.getElementById("nav2")?.addEventListener("click",()=>mostrarPagina(2));
document.getElementById("nav3")?.addEventListener("click",()=>mostrarPagina(3));
document.getElementById("nav4")?.addEventListener("click",()=>mostrarPagina(4));

// ===============================
// BOTÕES HERO
// ===============================

function irRecursos(){
    mostrarPagina(2);
}

function irAprendizado(){
    mostrarPagina(3);
}

// ===============================
// SALVAR RESPOSTAS
// ===============================

function salvarRespostas(){

    tocarClique();
    vibrar();

    let respostas = {
        resposta1: document.getElementById("ans1").value,
        resposta2: document.getElementById("ans2").value,
        resposta3: document.getElementById("ans3").value
    };

    localStorage.setItem("respostas", JSON.stringify(respostas));

    document.getElementById("msgSalvo").classList.remove("hidden");
}

// ===============================
// FEEDBACK
// ===============================

function enviarFeedback(){

    tocarClique();
    vibrar();

    let nome = document.getElementById("nomeUsuario").value;
    let nota = document.getElementById("nota").value;
    let texto = document.getElementById("textoFeedback").value;

    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

    comentarios.push({
        nome,
        nota,
        texto,
        data: new Date().toLocaleDateString()
    });

    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    let msg = document.getElementById("msgFeedback");
    msg.style.display = "block";
    msg.style.opacity = "0";

    setTimeout(()=>{
        msg.style.opacity = "1";
    },100);

    carregarComentarios();
}

// ===============================
// LISTAR COMENTÁRIOS
// ===============================

function carregarComentarios(){

    const lista = document.getElementById("listaComentarios");
    if(!lista) return;

    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

    lista.innerHTML = "";

    comentarios.reverse().forEach(item=>{
        lista.innerHTML += `
            <div class="comentario">
                <h4>${item.nome}</h4>
                <p>⭐ ${item.nota}</p>
                <p>${item.texto}</p>
                <small>${item.data}</small>
            </div>
        `;
    });
}

carregarComentarios();

// ===============================
// QUIZ
// ===============================

const perguntasQuiz = [
{
    pergunta:"Qual fonte é limpa?",
    opcoes:["Carvão","Energia Solar","Petróleo"],
    correta:"Energia Solar"
},
{
    pergunta:"3Rs significam:",
    opcoes:["Reduzir, Reutilizar, Reciclar","Reagir, Repor, Retirar","Recusar, Refazer, Reagir"],
    correta:"Reduzir, Reutilizar, Reciclar"
},
{
    pergunta:"Preservar rios ajuda:",
    opcoes:["Água e solo","Apenas estética","Nada"],
    correta:"Água e solo"
},
{
    pergunta:"Devemos economizar:",
    opcoes:["Água","Lixo","Poluição"],
    correta:"Água"
},
{
    pergunta:"Energia solar vem do:",
    opcoes:["Sol","Carvão","Gasolina"],
    correta:"Sol"
},
{
    pergunta:"Sustentabilidade é:",
    opcoes:["Preservar futuro","Gastar tudo","Ignorar natureza"],
    correta:"Preservar futuro"
},
{
    pergunta:"Reciclar ajuda a:",
    opcoes:["Reduzir lixo","Aumentar lixo","Destruir recursos"],
    correta:"Reduzir lixo"
},
{
    pergunta:"Boa atitude:",
    opcoes:["Economizar energia","Desperdiçar água","Poluir rios"],
    correta:"Economizar energia"
},
{
    pergunta:"Energia eólica usa:",
    opcoes:["Vento","Fogo","Gasolina"],
    correta:"Vento"
},
{
    pergunta:"Cuidar do planeta:",
    opcoes:["Garante vida","Não muda nada","Acaba tudo"],
    correta:"Garante vida"
}
];

// embaralhar
function misturar(array){
    return array.sort(()=>Math.random()-0.5);
}

// montar quiz
function carregarQuiz(){

    let area = document.querySelector(".quiz");

    let perguntas = misturar([...perguntasQuiz]);

    let html = "";

    perguntas.forEach((item,index)=>{

        let alternativas = misturar([...item.opcoes]);

        html += `
        <div class="pergunta">
            <p>${index+1}. ${item.pergunta}</p>

            ${alternativas.map(op=>`
                <label>
                    <input type="radio" name="q${index}" value="${op===item.correta?"correto":"errado"}">
                    ${op}
                </label>
            `).join("")}

        </div>
        `;
    });

    html += `
        <button onclick="verificarQuiz()" class="finalizar">
            Finalizar Quiz 🎯
        </button>

        <div id="resultadoQuiz"></div>
    `;

    area.innerHTML = html;
}

carregarQuiz();

// ===============================
// NÍVEL DO JOGADOR
// ===============================

function calcularNivel(pontos){

    if(pontos >= 9) return "🌟 Mestre da Sustentabilidade";
    if(pontos >= 7) return "🔥 Muito Bom";
    if(pontos >= 5) return "👍 Em evolução";
    return "📚 Iniciante";
}

// ===============================
// VERIFICAR QUIZ
// ===============================

function verificarQuiz(){

    tocarClique();
    vibrar();

    let pontos = 0;

    document.querySelectorAll('input[type="radio"]:checked')
    .forEach(r=>{
        if(r.value==="correto") pontos++;
    });

    let nivel = calcularNivel(pontos);

    const resultado = document.getElementById("resultadoQuiz");

    resultado.classList.add("mostrar");

    if(pontos >= 8){

        confetti({
            particleCount:150,
            spread:120,
            origin:{y:0.6}
        });

    }

    resultado.innerHTML = `
        🎯 Resultado Final<br><br>

        Você acertou ${pontos} de 10 perguntas<br><br>

        ${nivel}
    `;
}

// ===============================
// TOPO
// ===============================

const topo = document.getElementById("topo");

window.addEventListener("scroll",()=>{
    topo.style.display = window.scrollY > 300 ? "block" : "none";
});

topo?.addEventListener("click",()=>{
    window.scrollTo({top:0, behavior:"smooth"});
});

const tema = document.getElementById("tema");

tema?.addEventListener("click", () => {

document.body.classList.toggle("light");

const isLight = document.body.classList.contains("light");

tema.innerHTML = isLight ? "☀️" : "🌙";

localStorage.setItem("tema", isLight ? "light" : "dark");

});

// manter tema ao recarregar
(function(){

const temaSalvo = localStorage.getItem("tema");

if(temaSalvo === "light"){
    document.body.classList.add("light");
    const btn = document.getElementById("tema");
    if(btn) btn.innerHTML = "☀️";
}

})();
