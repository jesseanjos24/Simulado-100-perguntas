let perguntas = [];
let indice = 0;
let acertos = 0;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const options = document.getElementById("options");
const score = document.getElementById("score");
const explanation = document.getElementById("explanation");
const nextBtn = document.getElementById("nextBtn");

// Função para carregar o JSON
async function carregarPerguntas() {
    try {
        const response = await fetch('simulado-final.json');
        const data = await response.json();
        perguntas = data.questions;  // pega o array "questions"
        carregarPergunta();
    } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
        questionText.textContent = "Não foi possível carregar as perguntas.";
    }
}


function carregarPergunta() {
    explanation.style.display = "none";
    const q = perguntas[indice];
    questionNumber.textContent = `Questão ${q.questionNumber} de ${perguntas.length}`;
    questionText.textContent = q.question;
    options.innerHTML = "";

    q.answerOptions.forEach((alt, i) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = `${String.fromCharCode(65 + i)}) ${alt.text}`;
        div.onclick = () => verificarResposta(div, alt);
        options.appendChild(div);
    });
}

function limparLatex(texto) {
    return texto.replace(/\$([^$]+)\$/g, (_, m) =>
    m.replace(/\\text\{([^}]*)\}/g, '$1')
    .replace(/\^\{\\circ\}/g, 'º')
    .replace(/\\,/g, ' ')
    .trim()
    );
}

function verificarResposta(el, alt) {
const q = perguntas[indice];
const corretas = q.answerOptions.find(a => a.isCorrect);
const todas = document.querySelectorAll(".option");

todas.forEach(opt => opt.style.pointerEvents = "none");

if (alt.isCorrect) {
    el.classList.add("correct");
    acertos++;
} else {
    el.classList.add("wrong");
    const correta = [...todas].find(o => o.textContent.includes(corretas.text));
    correta.classList.add("correct");
}

score.textContent = acertos;
explanation.textContent = `💡 ${limparLatex(corretas.rationale)}`;
explanation.style.display = "block";
}

nextBtn.onclick = () => {
if (indice < perguntas.length - 1) {
    indice++;
    carregarPergunta();
} else {
    questionText.textContent = `Quiz finalizado! Você acertou ${acertos} de ${perguntas.length}.`;
    options.innerHTML = "";
    nextBtn.style.display = "none";
    explanation.style.display = "none";
}
};

// Chama o carregamento das perguntas
carregarPerguntas();