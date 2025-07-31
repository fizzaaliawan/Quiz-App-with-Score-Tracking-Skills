const questions = [
  {
    question: "How do you comment in CSS?",
    options: [
      "<!-- This is a comment -->",
      "/* This is a comment */",
      "// This is a comment",
      "# This is a comment"
    ],
    correct: 1
  },
  {
    question: "Which HTML tag is used to link a CSS file?",
    options: ["<script>", "<css>", "<link>", "<style>"],
    correct: 2
  },
  {
    question: "Which property is used to change text color in CSS?",
    options: ["background", "text-color", "color", "font-color"],
    correct: 2
  },
  {
    question: "How do you select an element with id 'header' in CSS?",
    options: ["#header", ".header", "header", "$header"],
    correct: 0
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-weight", "font-size", "text-style", "size"],
    correct: 1
  },
  {
    question: "Which unit is relative to the font-size of the root element?",
    options: ["em", "%", "px", "rem"],
    correct: 3
  },
  {
    question: "Which property is used for setting space between lines?",
    options: ["spacing", "line-spacing", "line-height", "text-space"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 9;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 9;
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      showAnswer(null); // No answer selected
    }
  }, 1000);

  const q = questions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.onclick = () => showAnswer(index);
    optionsEl.appendChild(btn);
  });

  progressEl.textContent = `${currentQuestion + 1} of ${questions.length} Questions`;
}

function showAnswer(selected) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) {
      btn.classList.add("correct");
    } else if (idx === selected) {
      btn.classList.add("wrong");
    }
  });

  if (selected === q.correct) score++;

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  nextBtn.style.display = "none";

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-body").classList.add("hidden");
  document.querySelector(".quiz-footer").classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultEl.classList.add("hidden");
  document.querySelector(".quiz-body").classList.remove("hidden");
  document.querySelector(".quiz-footer").classList.remove("hidden");
  loadQuestion();
});

loadQuestion();
