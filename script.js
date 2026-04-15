const questions = [
    {
        question: "How to write an IF statement in JavaScript?",
        answers:[
            { text:"if i=5", correct:false},
            { text:"if i==5 then ", correct:false},
            { text:"if i=5 then" , correct:false},
            { text:"if(i==5)" , correct:true},
        ]
    },
    {
        question: "How do you write \"Hello World\" in an alert box?",
        answers:[
            { text:"alert(\"Hello World!\")", correct:true},
            { text:"msg(\"Hello World\")", correct:false},
            { text:"alertbox(\"Hello World\")", correct:false},
            { text:"msgbox(\"Hello World\")" , correct:false},
        ]
    },
    {
        question: "How does a FOR loop start?",
        answers:[
            { text:"for i= 1 to 5", correct:false},
            { text:"for(i=0;i<5)", correct:false},
            { text:"for(i<=5;i++)" , correct:false},
            { text:"for(i=0; i<=5;i++)" , correct:true},
        ]
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers:[
            { text:"'This is a comment.", correct:false},
            { text:"//This is a comment", correct:true},
            { text:"#This is a comment." , correct:false},
            { text:"$$This is a comment." , correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;


function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach( answer =>{ 
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
     Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
     });
     nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
}else{
    startQuiz();
}
});

startQuiz();