class Question {
    constructor(question, choices, answer) {
    this.question = question
    this.choices = choices
    this.answer = answer
    }
}

let timeRemaining = 80;

let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimer();
    if (timeRemaining <= 0) {
      endQuiz();
    }
  }, 1000);
}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.innerText = `Time remaining: ${timeRemaining} seconds`;
}
  function startQuiz() {
    quiz.reset();
  timeRemaining = 80;
  updateTimer();
  score = 0;
  updateScore();
    document.getElementById("start-button").style.display = "none";
    document.getElementById("high-scores-button").style.display = "none"
    document.getElementById("quiz").style.display = "block";
    document.getElementById("high-scores").style.display = "none";
    startTimer();
    showCurrentQuestion();
  }
  
  function showHighScores() {
    document.getElementById("start-button").style.display = "block";
    document.getElementById("high-scores-button").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("high-scores").style.display = "block";
    updateHighScores();
  }


const question1 = new Question (
    'What does HTML stand for?',
    ['Hyper Text Markup Language"', 'High Tech Machine Learning', 'How To Make Lasagna'],
    'Hyper Text Markup Language'
)

const question2 = new Question (
    'Which HTML tag is used to define a hyperlink?',
    ['<link>', '<a>', '<img>'],
    '<a>'
)

const question3 = new Question (
    'Which CSS property is used to change the background color of an element?',
    ['background-color', 'color', 'text-decoration'],
    'background-color'
)

const question4 = new Question (
    'What is the correct syntax for creating a JavaScript function?',
    ['function = myFunction() {}', 'myFunction = function() {}', 'myFunction() = function {}'],
    'myFunction = function() {}'
)

const question5 = new Question (
    `Which JavaScript method is used to add an element to the end of an array?`,
    ['push()', 'pop()', 'shift()'],
    'push()'
)

const question6 = new Question (
    'Which HTML tag is used to create an unordered list?',
    ['<ul>', '<ol>', '<li>'],
    '<ul>'
)

const question7 = new Question (
    'Which CSS property is used to center an element horizontally?',
    ['margin', 'padding', 'text-align'],
    'text-align'
)

const question8 = new Question (
    'Which JavaScript keyword is used to declare a variable?',
    ['variable', 'let', 'var'],
    'let'
)

class Quiz {
    constructor(questions) {
      this.questions = questions;
      this.currentIndex = 0;
    }
  
    getCurrentQuestion() {
      return this.questions[this.currentIndex];
    }
  
    nextQuestion() {
      this.currentIndex++;
    }
  
    hasEnded() {
      return this.currentIndex >= this.questions.length;
    }
    reset() {
        this.currentIndex = 0;
      }
  }
   
  let quiz = new Quiz([question1, question2, question3, question4, question5, question6, question7, question8])

  function showCurrentQuestion() {
    const question = quiz.getCurrentQuestion();
    const questionElement = document.getElementById("question");
    questionElement.innerText = question.question;
  
    const choices = question.choices;
    for (let i = 0; i < choices.length; i++) {
      const choiceElement = document.getElementById(`choice${i}`);
      choiceElement.innerText = choices[i];
    }
  }

  
  let score = 0;

  function checkAnswer(selectedChoice) {
    if (selectedChoice === quiz.getCurrentQuestion().answer) {
      score += 12.5;
    } else {
      score -= 8;
      timeRemaining -= 10;
    }
    updateTimer();
    showNextQuestion();
    updateScore();
  }
  
  function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `Score: ${score}`;
  }
  
  function showNextQuestion() {
    quiz.nextQuestion();
    if (quiz.hasEnded()) {
      endQuiz();
    }
    showCurrentQuestion();
  }
  

  function endQuiz() {
    clearInterval(timerInterval);
    const initials = prompt("Enter your initials:");
    if (initials) {
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials, score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    alert("Quiz ended!");
    document.getElementById("high-scores-button").style.display = "block";
  }

  function updateHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b.score - a.score);
    const highScoresElement = document.getElementById("high-scores");
    highScoresElement.innerHTML = "";
    for (const { initials, score } of highScores) {
      const li = document.createElement("li");
      li.innerText = `${initials}: ${score}`;
      highScoresElement.appendChild(li);
    }
  }
  
  