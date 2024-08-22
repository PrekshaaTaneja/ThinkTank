const questions=[
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue-whale",correct:true},
            {text:"elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question:"Which is the largest desert in the world?",
        answers:[
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"Antarctica",correct:true},
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text:"vatican city",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Sri-Lanka",correct:false},
        ]
    },
    {
        question:"Which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:false},
            {text:"North America",correct:false},
            {text:"Australia",correct:true},
            {text:"Africa",correct:false},
        ]
    },
    {
        question:"Who was the first persident in US?",
        answers:[
            {text:"Thomas Jefferson",correct:false},
            {text:"John Adams",correct:false},
            {text:"Abraham Lincoln",correct:false},
            {text:"George Washington",correct:true},
        ]
    },
    {
        question:"Which country is known as the Land of the Rising Sun?",
        answers:[
            {text:"Japan",correct:true},
            {text:"China",correct:false},
            {text:"South Korea",correct:false},
            {text:"India",correct:false},
        ]
    },
    {
        question:"What is the smallest planet in our solar system?",
        answers:[
            {text:"Venus",correct:false},
            {text:"Mercury",correct:true},
            {text:"Mars",correct:false},
            {text:"Neptune",correct:false},
        ] 
    },
    {
        question:"Who painted the Mona Lisa?",
        answers:[
            {text:"Vincent van Gogh",correct:false},
            {text:"Pablo Picasso",correct:false},
            {text:"Leonardo da Vinci",correct:true},
            {text:"Michelangelo",correct:false},
        ] 
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-btns");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Nextttt";
    showQuestion();
}
 
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);    
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
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
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
