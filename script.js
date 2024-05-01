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
    addQuestionModal.classList.add('hide');
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
    }
});

//Função para mostrar a lista de flashcards
function viewList() {
    const cardList = document.querySelector('.card-list');
    cardList.innerHTML = '';
    flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    flashcards.forEach(flashcard => {
        const div = document.createElement("div");
        div.classList.add('card');
        div.innerHTML = `
        <p class="que-div">${flashcard.question}</p>
                <p class="ans-div">${flashcard.answer}</p>
                <button class="show-hide-btn">Mostar/Esconder</button>
                <div class="btns-con">
                    <button class="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
        `;

        div.setAttribute('data-id', flashcard.id);
        const displayAns = div.querySelector('.ans-div');
        const showHideBtn = div.querySelector('.show-hide-btn');
        const editBtn = div.querySelector('.edit');
        const deleteBtn = div.querySelector('.delete');

        showHideBtn.addEventListener('click', () => {
            //Troca a visibilidade da resposta
            displayAns.classList.toggle('hide');
        });

        editBtn.addEventListener('click', () => {
            //Habilita o modo de edição para adicionar um flascard
            editBool = true;
            modifyElement(editBtn, true);
            addQuestionModal.classList.remove('hide');
        });

        deleteBtn.addEventListener('click', () => {
            //Deleta um flascard
            modifyElement(editBtn);
        });

        cardList.appendChild(div);
    });
}

//Função para modificar o flashcard
const modifyElement = (element, edit = false) => {
    const parentDiv = element.parentElement.parentElement;
    const id = Number(parentDiv.getAttribute('data-id'));
    const parentQuestion = parentDiv.querySelector('.que-div').innerText;
    if (edit) {
        const parentAnswer = parentDiv.querySelector('.ans-div').innerText;
        answer.value = parentAnswer;
        question.value = parentQuestion;
        originalId = id;
        disableBtns(true);
    } else {
        //Remove o flashcard do array e atualiza o armazenamento local
        flashcards = flashcards.filter(flashcard =>
            flashcard.id !== id);
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
    parentDiv.remove();
}

//Funcção para desabilitar os botões de editar
const disableBtns = (value) => {
    const editButtons = document.getElementsByClassName('edit');
    Array.from(editButtons).forEach((element) => {
        element.disabled = value;
    });
}

//Event listener para exibir a lista de flashcards ao acrregar a página
document.addEventListener('DOMContentLoaded', viewList);