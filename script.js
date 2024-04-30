const container = document.querySelector(".container");
const addQuestionModal = document.getElementById("add-card-modal");
const saveBtn = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errosMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-card");
const closeBtn = document.getElementById("close-btn");

let editBool = false;
let originalId = null;
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

addQuestion.addEventListener('click', () => {
    //Mostra o modal de add perguntas e esconde o container
    container.classList.add('hide');
    question.value = "";
    answer.value = "";
    addQuestionModal.classList.remove('hide');
});

closeBtn.addEventListener('click', () => {
    //Escconde o modal de add perguntas e mostra o container
    container.classList.remove('hide');
    addQuestionModal.classList.add('hide');
    if (editBool) {
        editBool = false;
    }
});

saveBtn.addEventListener('click', () => {
    //Salva o flashcard
    let tempQuestion = question.value.trim();
    let tempAnswer = question.value.trim();
    if (!tempQuestion || !tempAnswer) {
        //Mostra o erros se os campos ficarem em branco
        errosMessage.classList.remove('hide');
    } else {
        if (editBool) {
            //Se o flashcard que esiver sendo editado, ja existir, remove o flash card original
            flashcards = flashcards.filter(flashcard =>
                flashcard.id !== originalId);
        }
        let id = Date.now();
        //Adiciona a pergunta no array
        flashcards.push({ id, question: tempQuestion, answer: tempAnswer });
        //Salva o array de flash cards no armazenamento local
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        container.classList.remove('hide');
        errosMessage.classList.add('hide');
        viewList();
        question.value = "";
        answer = "";
        editBool = false;
        addQuestionModal.classList.add('hide');
    }
});

//Função para mostrar a lista de flashcards
function viewList() {
    const cardList = document.querySelector('.card-list');
    cardList.innerHTML = '';
}



