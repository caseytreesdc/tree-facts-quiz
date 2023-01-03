const question = document.getElementById("question");
const questionImage = document.getElementById("questionImage");
const explanation = document.getElementById("explanation");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const nextquestion = document.getElementById("nextquestion");
const choicecontainer = document.getElementsByClassName("choice-container");
const progressBarFull = document.getElementById("progressBarFull");

console.log(choices, choices[3].parentElement);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        questionImage: "<img alt='tulip leaves in the fall' src='images/facts-tulip.jpg' width='100%'>",
        question: "What is the main role of leaves?",
        explanation: "Plants use a process called photosynthesis to make food. During photosynthesis, plants trap light energy with their leaves. Plants use the energy of the sun to change water and carbon dioxide into a sugar called glucose. Glucose is used by plants for energy and to make other substances like cellulose and starch.",
        choice1: "To soak up and convert sunlight into food ",
        choice2: "To protect against insects and animals",
        choice3: "To attract bees for pollination",
        choice4: "To keep the bark protected from UV rays",
        answer: 1
    },
    {
        questionImage: "<img alt='a tall sycamore tree' src='https://caseytrees.org/wp-content/uploads/2019/07/american-sycamore-51542.jpg' width='100%'>",
        question: "Which of the following plants is the closest relative to sycamore trees?",
        explanation: "Ficus sycomorus, called the sycamore fig or the fig-mulberry (because the leaves resemble those of the mulberry), sycomorus is a fig species that has been cultivated since ancient times.",
        choice1: "Fir",
        choice2: "Finch",
        choice3: "Fig",
        choice4: "Ficus",
        answer: 3,
    },
    {
        questionImage: "<img alt='tree trunk bark' src='https://caseytrees.org/wp-content/uploads/2016/12/log-946325.jpg' width='100%'>",
        question: "Why do trees produce resin?",
        explanation: "Tree resin plays an extremely important function in trees by rapidly sealing over wounds used as introductory pathways by invading insects and fungal disease agents. Organisms that try to enter a tree via a wound can be flushed out, can become stuck and trapped in the seal and can be overcome by the resin's toxicity.",
        choice1: "To release waste",
        choice2: "To protect against pathogens and insects",
        choice3: "To spread their seeds",
        choice4: "To prime the tree for winter",
        answer: 2
    },
    {
        questionImage: "<img alt='elms on the mall' src='https://caseytrees.org/wp-content/uploads/2017/01/elms-on-the-national-mall-blue-sky.jpg' width='100%'>",
        question: "In 1935, ____ American elms were planted along the north and south edges of the Mall in four parallel rows.",
        explanation: "While many of the original elms planted during that time have died and been replaced – the Jefferson Elm, north of the Smithsonian Freer Gallery, and its fellow survivors recall the time when L’Enfant’s 1791 vision for a tree-lined mall was finally realized.",
        choice1: "52",
        choice2: "237",
        choice3: "333",
        choice4: "475",
        answer: 3
    },
    {
        questionImage: "<img alt='white house trees' src='https://caseytrees.org/wp-content/uploads/2022/11/Jackson-magnolias-White-House-south-facade-NPS.webp' width='100%'>",
        question: "President Andrew Jackson planted __________ trees in memory of his late wife Rachel. Today, they are the oldest presidentially planted trees on the White House grounds.",
        explanation: "Magnolias were the First Lady’s favorite trees, so the president brought saplings from his home, the Hermitage in Tennessee, and planted them to remember her. Poised, stout, and strong, they are such a presence that they are depicted on the back of the old $20 bill.",
        choice1: "Southern Magnolia",
        choice2: "Cryptomeria",
        choice3: "Loblolly Pine",
        choice4: "Douglas Fir",
        answer: 1
    },
    {
        questionImage: "<img alt='trees in downtown' src='https://caseytrees.org/wp-content/uploads/2022/06/dc-skyline-leaflet.png' width='100%'>",
        question: "What is the official tree of Washington D.C.?",
        explanation: "On November 8, 1960, the beautiful scarlet oak was designated the official tree of Washington D.C. A rapid-growing tree of the eastern United States, the scarlet oak tree is best known for the magnificent, brilliant red color of its autumn leaves. Scarlet oak is also a popular landscape choice because it’s tolerant of drought, poor soil conditions, and wind.   ",
        choice1: "American Sweetgum",
        choice2: "Scarlet Oak",
        choice3: "Pin Oak",
        choice4: "River Burch",
        answer: 2
    },
    {
        questionImage: "<img alt='evergreen trees' src='https://caseytrees.org/wp-content/uploads/2019/01/30689636025_9959bb4988_o.jpg' width='100%'>",
        question: "Which of the following is NOT an evergreen tree?",
        explanation: "A graceful tree with dark, shaggy bark, light-green leaves and a grand pyramidal shape, the bald cypress is a tough, urban tree valued by wildlife for its seed. It is called “bald” because it drops its leaves in the fall – uncommon for trees bearing cones.",
        choice1: "Virginia Pine",
        choice2: "Deodar Cedar",
        choice3: "Bald Cypress",
        choice4: "American Holly",
        answer: 3
    },
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("https://connect.clickandpledge.com/w/Form/212c9142-dfbb-4801-8e11-d0f1b5810fc0");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    explanation.innerText = currentQuestion.explanation;
    questionImage.innerHTML = currentQuestion.questionImage;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });


    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const correctAnswer = currentQuestion.answer;

        console.log(choices, choices[correctAnswer - 1].parentElement);
        console.log(correctAnswer);

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        if (classToApply === "incorrect") {
            choices[correctAnswer - 1].parentElement.classList.add("correct");
        }

        console.log(questionImage.innerText);

        selectedChoice.parentElement.classList.add(classToApply);
        explanation.classList.remove("correct-answer-hidden");
        explanation.classList.add("correct-answer-showing");

        setTimeout(() => {
            //selectedChoice.parentElement.classList.remove(classToApply);
            //choices[correctAnswer-1].parentElement.classList.remove("correct");
            //explanation.classList.remove("correct-answer-showing");
            //explanation.classList.add("correct-answer-hidden");
            //getNewQuestion();
        }, 2000)


    });
});

nextquestion.addEventListener("click", e => {
    getNewQuestion();

    explanation.classList.remove("correct-answer-showing");
    explanation.classList.add("correct-answer-hidden");

    for (var i = 0; i < choices.length; i++) {
        choices[i].parentElement.classList.remove("correct", "incorrect");
    }

    questionImage.scrollIntoView();
});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();


