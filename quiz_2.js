(() => {
  const container = document.getElementById("quiz-container");

  if (!container) {
    return;
  }

  const questions = [
    {
      question: "What did I graduate from in 2022 while I was building my core skills?",
      answers: [
        "Middle school",
        "High school",
        "University",
        "A technical course"
      ],
      correctAnswer: 0
    },
    {
      question: "What was I doing while I was expanding my technical knowledge in 2025?",
      answers: [
        "I was creating applications and systems for IFPA.",
        "I was studying architecture at UNAMA.",
        "I was working as a software architect.",
        "I was pursuing an advanced degree."
      ],
      correctAnswer: 0
    },
    {
      question: "What did I start studying after I passed the ENEM?",
      answers: [
        "Systems Analysis and Development at UNAMA",
        "Software Engineering in another country",
        "Business Administration at UNAMA",
        "A course in digital marketing"
      ],
      correctAnswer: 0
    },
    {
      question: "What did I discover while I was completing my first software projects?",
      answers: [
        "My passion for technology and innovation",
        "That I wanted to leave the technology field",
        "That I preferred studying history",
        "That I did not enjoy building applications"
      ],
      correctAnswer: 0
    },
    {
      question: "What did I learn while I was studying global engineering standards?",
      answers: [
        "Industry best practices",
        "How to avoid software projects",
        "Only basic computer skills",
        "How to stop learning technology"
      ],
      correctAnswer: 0
    }
  ];

  const state = {
    current: 0,
    score: 0,
    selected: false
  };

  const style = document.createElement("style");
  style.textContent = `
    .quiz-box {
      margin: 0 0 2.5rem;
      padding: 1.35rem;
      border: 1px solid rgba(16, 85, 102, 0.14);
      border-radius: 20px;
      background: #fffdf7;
      box-shadow: 0 12px 26px rgba(24, 103, 113, 0.1);
    }
    .quiz-heading {
      margin: 0;
      color: #12364a;
      font-family: "Fraunces", serif;
      font-size: 1.55rem;
    }
    .quiz-progress {
      margin: 0.35rem 0 1.15rem;
      color: #406879;
      font-size: 0.9rem;
    }
    .quiz-question {
      margin: 0 0 1rem;
      color: #12364a;
      font-size: 1.05rem;
      font-weight: 700;
    }
    .quiz-answers {
      display: grid;
      gap: 0.65rem;
    }
    .quiz-answer,
    .quiz-next,
    .quiz-restart {
      min-height: 2.8rem;
      padding: 0.7rem 0.9rem;
      border: 1px solid rgba(5, 126, 159, 0.25);
      border-radius: 12px;
      color: #12364a;
      background: #e6f8f7;
      font: inherit;
      text-align: left;
      cursor: pointer;
      transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
    }
    .quiz-answer:hover,
    .quiz-next:hover,
    .quiz-restart:hover {
      transform: translateY(-1px);
      border-color: #057e9f;
      background: #d0f0ef;
    }
    .quiz-answer.is-selected {
      box-shadow: 0 0 0 2px rgba(18, 54, 74, 0.12);
    }
    .quiz-answer.is-correct {
      border-color: #238636;
      background: #dff6e5;
      color: #17652a;
    }
    .quiz-answer.is-incorrect {
      border-color: #d1242f;
      background: #ffe1e3;
      color: #9d1420;
    }
    .quiz-next,
    .quiz-restart {
      display: inline-block;
      margin-top: 1rem;
      padding-inline: 1.2rem;
      color: #fff;
      background: #ef765d;
      font-weight: 700;
      text-align: center;
    }
    .quiz-next:hover,
    .quiz-restart:hover {
      background: #e05e43;
    }
    .quiz-result {
      margin: 0.75rem 0 0;
      color: #406879;
      line-height: 1.55;
    }
    @media (max-width: 640px) {
      .quiz-box { padding: 1rem; }
    }
  `;
  document.head.appendChild(style);

  function renderQuestion() {
    const question = questions[state.current];
    const answers = question.answers.map((answer, index) => `
      <button class="quiz-answer" type="button" data-answer-index="${index}">${answer}</button>
    `).join("");

    container.innerHTML = `
      <section class="quiz-box" aria-labelledby="quiz-heading">
        <h2 id="quiz-heading" class="quiz-heading">Quick Journey Quiz</h2>
        <p class="quiz-progress">Question ${state.current + 1} of ${questions.length}</p>
        <p class="quiz-question">${question.question}</p>
        <div class="quiz-answers">${answers}</div>
        <button class="quiz-next" type="button" disabled>Next</button>
      </section>
    `;

    container.querySelectorAll(".quiz-answer").forEach((button) => {
      button.addEventListener("click", () => {
        container.querySelectorAll(".quiz-answer").forEach((answerButton) => {
          answerButton.classList.remove("is-selected", "is-correct", "is-incorrect");
        });
        button.classList.add("is-selected");
        const selectedAnswer = Number(button.dataset.answerIndex);
        button.classList.add(selectedAnswer === question.correctAnswer ? "is-correct" : "is-incorrect");
        state.selected = true;
        container.querySelector(".quiz-next").disabled = false;
      });
    });

    container.querySelector(".quiz-next").addEventListener("click", () => {
      if (!state.selected) {
        return;
      }
      const selectedAnswer = Number(container.querySelector(".is-selected").dataset.answerIndex);
      if (selectedAnswer === question.correctAnswer) {
        state.score += 1;
      }
      state.current += 1;
      state.selected = false;
      if (state.current < questions.length) {
        renderQuestion();
      } else {
        renderResult();
      }
    });
  }

  function renderResult() {
    const message = state.score === questions.length
      ? "Excellent! You understood every detail of my education and career journey."
      : state.score >= 2
        ? "Good job! You understood most of the important moments in my journey."
        : "Keep practicing! Review the timeline and try the quiz again.";

    container.innerHTML = `
      <section class="quiz-box" aria-labelledby="quiz-heading">
        <h2 id="quiz-heading" class="quiz-heading">Quiz complete!</h2>
        <p class="quiz-result">${message}</p>
        <p class="quiz-result">You scored ${state.score} out of ${questions.length}.</p>
        <button class="quiz-restart" type="button">Try again</button>
      </section>
    `;

    container.querySelector(".quiz-restart").addEventListener("click", () => {
      state.current = 0;
      state.score = 0;
      state.selected = false;
      renderQuestion();
    });
  }

  renderQuestion();
})();
