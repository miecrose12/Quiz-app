const questions = [
    {
        question: "Who is the greatest afro-beat artist of all time?",
        answers: [
            { text: "Burna-boy", correct: false},
            { text: "Wizkid", correct: false},
            { text: "Davido", correct: true},
            { text: "Olamide", correct: false},
        ]
    },
    {
        question: "Which of the following clubs has the worst performance in premier league this season",
        answers: [
            { text: "Chealsea", correct: false},
            { text: "Manchester united", correct: true},
            { text: "Sheffield", correct: false},
            { text: "Burnley", correct: false},
        ]
    },
    {
        question: "Who is the GOAT of football",
        answers: [
            { text: "Messi", correct: true},
            { text: "Maradona", correct: false},
            { text: "Pele", correct: false},
            { text: "Ronaldinho", correct: false},
        ]    
    },
    {
        question: "Which of the following brand of phone is the best",
        answers: [
            { text: "Samsung", correct: true},
            { text: "Iphone", correct: false},
            { text: "Huwaei", correct: false},
            { text: "Infinix", correct: false},
        ]    
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();    
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();