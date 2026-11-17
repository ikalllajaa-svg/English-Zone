/* =========================
   VOCABULARY SEARCH
========================= */

const searchInput = document.getElementById("search");
const vocabCards = document.querySelectorAll(".vocab-card");
const emptyMessage = document.getElementById("empty-message");

searchInput.addEventListener("input", function() {

    const keyword = this.value.toLowerCase();
    let found = 0;

    vocabCards.forEach(function(card) {

        const content = card.innerText.toLowerCase();

        if (content.includes(keyword)) {
            card.style.display = "block";
            found++;
        } else {
            card.style.display = "none";
        }

    });

    emptyMessage.hidden = found > 0;

});


/* =========================
   QUIZ QUESTIONS
========================= */

const questions = [

    {
        question: "What is the meaning of 'Beautiful'?",
        answers: [
            "Jelek",
            "Indah",
            "Marah",
            "Sedih"
        ],
        correct: 1
    },

    {
        question: "What is the past form of 'Go'?",
        answers: [
            "Gone",
            "Going",
            "Went",
            "Goes"
        ],
        correct: 2
    },

    {
        question: "She _____ a student.",
        answers: [
            "Am",
            "Are",
            "Be",
            "Is"
        ],
        correct: 3
    },

    {
        question: "What is the meaning of 'Knowledge'?",
        answers: [
            "Pengetahuan",
            "Perjalanan",
            "Keberanian",
            "Kebahagiaan"
        ],
        correct: 0
    },

    {
        question: "Choose the correct sentence.",
        answers: [
            "He go to school.",
            "He going to school.",
            "He goes to school.",
            "He gone to school."
        ],
        correct: 2
    }

];


/* =========================
   QUIZ SYSTEM
========================= */

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("next-btn");

const questionNumber =
    document.getElementById("question-number");

const progressText =
    document.getElementById("progress-text");

const progressBar =
    document.getElementById("progress-bar");

const resultElement =
    document.getElementById("result");

const finalScore =
    document.getElementById("final-score");

const resultMessage =
    document.getElementById("result-message");

const restartButton =
    document.getElementById("restart-btn");


/* SHOW QUESTION */

function showQuestion() {

    answered = false;

    const data = questions[currentQuestion];

    resultElement.hidden = true;
    questionElement.hidden = false;
    answersElement.hidden = false;

    questionElement.textContent =
        data.question;

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    progressText.textContent =
        score + " correct";

    progressBar.style.width =
        (currentQuestion / questions.length * 100) + "%";

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";

    nextButton.hidden = true;

    data.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer;

        button.addEventListener("click", function() {
            checkAnswer(index);
        });

        answersElement.appendChild(button);

    });

}


/* CHECK ANSWER */

function checkAnswer(selected) {

    if (answered) return;

    answered = true;

    const correct = questions[currentQuestion].correct;

    if (selected === correct) {

        score++;

        feedbackElement.textContent =
            "Correct! Excellent work.";

        feedbackElement.style.color = "green";

    } else {

        feedbackElement.textContent =
            "Incorrect! Correct answer: " +
            questions[currentQuestion].answers[correct];

        feedbackElement.style.color = "#dc4545";

    }

    document.querySelectorAll(".answer-btn")
        .forEach(function(button) {

            button.disabled = true;

        });

    progressText.textContent =
        score + " correct";

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "See Your Result →"
        : "Next Question →";

    nextButton.hidden = false;

}


/* NEXT QUESTION */

nextButton.addEventListener("click", function() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;
        showQuestion();

    } else {

        showResult();

    }

});


/* SHOW RESULT */

function showResult() {

    questionElement.hidden = true;
    answersElement.hidden = true;
    feedbackElement.textContent = "";
    nextButton.hidden = true;

    resultElement.hidden = false;

    const finalValue =
        Math.round(score / questions.length * 100);

    finalScore.textContent =
        finalValue;

    if (finalValue === 100) {

        resultMessage.textContent =
            "Excellent! All answers are correct!";

    } else if (finalValue >= 60) {

        resultMessage.textContent =
            "Good job! Keep practicing!";

    } else {

        resultMessage.textContent =
            "Keep learning! You can do better!";

    }

}


/* RESTART QUIZ */

restartButton.addEventListener("click", function() {

    currentQuestion = 0;
    score = 0;

    showQuestion();

});


/* START QUIZ */

showQuestion();
