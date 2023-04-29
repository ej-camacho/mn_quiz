let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let textInput = document.getElementById("userid");
let username = document.getElementById("username");
let correct = document.getElementById("correct-answers");
let incorrect = document.getElementById("incorrect-answers");
let footer = document.getElementById("footer");
let userid;
let questionCount;
let scoreCount = 1;
let minutesCount = 29;
let secondsCount = 60;
let countdown;
let correctAnswers = 0;

//Reiniciar Quiz
restart.addEventListener("click", () => {
  correctAnswers = 0;
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Siguiente
nextBtn.addEventListener("click", (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == 6) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      username.innerHTML = userid;
      userScore.innerHTML = "Tu puntaje es " + scoreCount;
      correct.innerHTML = "✅ " + correctAnswers + " correctas";
      incorrect.innerHTML = "❌ " + (6 - correctAnswers) + " incorrectas";
    } else {
      //display questionCount
      countOfQuestion.innerHTML = (questionCount + 1) + "/6";
      //display quiz
      quizDisplay(questionCount);
      minutesCount = 29;
      secondsCount = 60;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

// Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    if (secondsCount == 0) {
      minutesCount--;
      secondsCount = 59;
    } else { 
      secondsCount--;
    }
    if (secondsCount < 10) {
      timeLeft.innerHTML = `${minutesCount}:0${secondsCount}`;
    } else {
      timeLeft.innerHTML = `${minutesCount}:${secondsCount}`;
    }
    if (minutesCount == 0 && secondsCount == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

// Mostrar quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  // Ocultar problemas
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  // Mostrar el problema actual
  quizCards[questionCount].classList.remove("hide");
  footer.innerHTML =`
    <p><strong>✅ ${correctAnswers} correctas</strong></p>
    <p><strong>❌ ${questionCount - correctAnswers} incorrectas</strong></p>
    `
};

// Creación del quiz
function quizCreator() {
  // ordenar preguntas al azar
  quizArray.sort(() => Math.random() - 0.5);
  // generar el quiz
  for (let i of quizArray) {
    // ordenar aleatoriamente las opciones
    i.options.sort(() => Math.random() - 0.5);
    // creación de la tarjeta de problema
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = "1/6";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount = (scoreCount + 1) * minutesCount + secondsCount;
    correctAnswers++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

// configuración inicial
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  minutesCount = 29;
  secondsCount = 60;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

// cuando el usuario pulsa el botón de inicio
startButton.addEventListener("click", () => {
  userid = textInput.value;
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

// ocultar el cuestionario y mostrar la pantalla de inicio
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

const quizArray = [
  {
      id: "0",
      question: "Utilizando interpolación de Lagrange, encuentre el valor de f(2.2) a partir de los puntos dados: (1,4), (2,5), (4,6), (5,7).",
      options: ["4.4", "4.8", "5.2", "5.6"],
      correct: "4.4",
  },
  {
      id: "1",
      question: "Utilizando interpolación de Newton, encuentre el valor de f(1.5) a partir de los puntos dados: (1,1), (2,8), (3,27), (4,64).",
      options: ["1.25", "2.25", "3.25", "4.25"],
      correct: "2.25",
  },
  {
      id: "2",
      question: "Utilizando el método numérico de preferencia, encuentre el valor de f(2.5) a partir de los puntos dados: (1,1), (2,4), (4,16), (5,25).",
      options: ["6.125", "7.25", "8.375", "9.5"],
      correct: "7.25",
  },
  {
      id: "3",
      question: "Utilizando interpolación de diferencias divididas de Newton, encuentre el valor de f(1.5) a partir de los puntos dados: (1,2), (2,3), (3,5), (4,8).",
      options: ["3.5", "4.5", "5.5", "6.5"],
      correct: "3.5",
  },
  {
      id: "4",
      question: "Utilizando interpolación de Lagrange, encuentre el valor de f(1.8) a partir de los puntos dados: (-1,1), (0,2), (2,6), (3,11).",
      options: ["3.4", "4.2", "4.8", "5.6"],
      correct: "4.8",
  },
  {
      id: "5",
      question: "Utilizando interpolación de Newton, encuentre el valor de f(0.5) a partir de los puntos dados: (0,-2), (1,0), (2,2), (3,6), (4,12).",
      options: ["-1", "0", "1", "2"],
      correct: "0",
  },
  {
      id: "6",
      question: "Utilizando el método numérico de preferencia, encuentre el valor de f(1.5) a partir de los puntos dados: (-2,4), (-1,1), (0,0), (1,1), (2,4).",
      options: ["2.0625", "2.25", "2.4375", "2.625"],
      correct: "2.25",
  },
  {
      id: "7",
      question: "Utilizando interpolación de diferencias divididas de Newton, encuentre el valor de f(1.8) a partir de los puntos dados: (0,1), (1,3), (2,5), (3,7), (4,9).",
      options: ["3.6", "4.2", "4.8", "5.4"],
      correct: "4.2",
  },
  {
      id: "8",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = x^2 - 2x + 1",
      options: ["0", "1", "2", "-1"],
      correct: "1",
  },
  {
      id: "9",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = cos(x) - x^3",
      options: ["0.5", "1", "1.5", "2"],
      correct: "0.5",
  },
  {
      id: "10",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = x^3 - 7x^2 + 8x + 12",
      options: ["-2", "-1", "2", "3"],
      correct: "2",
  },
  {
      id: "11",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = x^4 + 3x^2 - 2",
      options: ["-1", "0", "1", "2"],
      correct: "-1",
  },
  {
      id: "12",
      question: "Utilizando interpolación de Newton, encuentre el valor de f(0.5) a partir de los puntos dados: (0,-2), (1,0), (2,2), (3,6), (4,12).",
      options: ["-1'", "0", "1", "2"],
      correct: "0",
  },
  {
      id: "13",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = ln(x) + x - 1",
      options: ["0.5", "0.8", "1", "1.2"],
      correct: "0.8",
  },
  {
      id: "14",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = x^3 - 2x^2 - 5",
      options: ["-2.5", "-1", "1", "2"],
      correct: "-1",
  },
  {
      id: "15",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = x^3 - 6x + 2",
      options: ["-1", "0", "1", "2"],
      correct: "-1",
  },
  {
      id: "16",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = x - cos(x)",
      options: ["0.5", "0.7", "1", "1.2"],
      correct: "0.7",
  },
  {
      id: "17",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = 2x^3 - 3x^2 - 2x + 3",
      options: ["-1", "0", "1", "1.5"],
      correct: "-1",
  },
  {
      id: "18",
      question: "Encuentre la raíz de la ecuación no lineal f(x) = e^x - 2x - 1",
      options: ["-1", "0", "1", "2"],
      correct: "-1",
  },
  {
      id: "19",
      question: "Dado el sistema de ecuaciones lineales: 2x + y - z = 1; x - 3y + 2z = -4; 4x + 5y - 3z = 2. ¿Cuál es el valor de y?",
      options: ["-1", "2", "3", "-2"],
      correct: "-1",
  },
  {
      id: "20",
      question: "Encuentra la solución del siguiente sistema de ecuaciones lineales por el método de Gauss-Jordan: x - y + 2z = 5; 2x + y - z = 1; 3x - 2y + z = 2",
      options: ["(x, y, z) = (1, -2, 0)", "(x, y, z) = (-1, 3, -1)", "(x, y, z) = (2, 0, 1)", "(x, y, z) = (0, 1, 1)"],
      correct: "(x, y, z) = (2, 0, 1)",
  },
  {
      id: "21",
      question: "Resuelve el siguiente sistema de ecuaciones lineales por el método de eliminación de Gauss: 2x - y + 3z = 5; x + 2y + z = 4; 4x - y - 2z = 2",
      options: ["(x, y, z) = (-1, 3, 0)", "(x, y, z) = (1, 2, 0)", "(x, y, z) = (2, -1, 1)", "(x, y, z) = (0, 4, -1)"],
      correct: "(x, y, z) = (1, 2, 0)",
  },
  {
      id: "22",
      question: "Dado el siguiente sistema de ecuaciones lineales: 4x + 2y - z = 1; x - 3y + z = -2; 2x + y - 5z = 0. ¿Cuál es el valor de x?",
      options: ["1", "2", "-1", "0"],
      correct: "2",
  },
  {
      id: "23",
      question: "Resuelve el siguiente sistema de ecuaciones lineales por el método de Gauss-Seidel: 3x - y - z = -1; -2x + 4y + z = 5; x + y - 4z = -1",
      options: ["(x, y, z) = (1, 1, 1)", "(x, y, z) = (2, -1, 1)", "(x, y, z) = (0, 1, 0)", "(x, y, z) = (-1, 2, -1)"],
      correct: "(x, y, z) = (2, -1, 1)",
  },
  {
      id: "24",
      question: "Resuelve el siguiente sistema de ecuaciones lineales por el método de Jacobi: 4x - y + 2z = 4; 2x + 5y - 2z = -1; 3x + y + 6z = 6",
      options: ["(x, y, z) = (1, -1, 1)", "(x, y, z) = (2, 1, -1)", "(x, y, z) = (-1, 1, -1)", "(x, y, z) = (0, 1, 0)"],
      correct: "(x, y, z) = (1, -1, 1)",
  },
  {
      id: "25",
      question: "Dado el siguiente sistema de ecuaciones lineales: 2x + y - z = 7; x - y + 2z = 1; 3x + 2y - 3z = 8. ¿Cuál es el valor de y?",
      options: ["-1", "2", "3", "4"],
      correct: "4",
  },
  {
      id: "26",
      question: "Aproxima la integral de la función f(x) = x^3 + x^2 + x + 1 en el intervalo [0,1] utilizando la regla del trapecio con n=4.",
      options: ["3.75", "4.25", "4.00", "3.50"],
      correct: "4.00",
  },
  {
      id: "27",
      question: "Aproxima la integral de la función f(x) = 2x^2 + 3x + 1 en el intervalo [0,2] utilizando la regla de Simpson 1/3 con n=6.",
      options: ["10.66", "12.66", "13.33", "14.66"],
      correct: "12.66",
  },
  {
      id: "28",
      question: "Aproxima la integral de la función f(x) = 1/(1+x^2) en el intervalo [0,1] utilizando la regla de Simpson 3/8 con n=3.",
      options: ["0.71", "0.67", "0.64", "0.70"],
      correct: "0.71",
  },
  {
      id: "29",
      question: "Aproxima la integral de la función f(x) = x^4 - 2x^2 + 1 en el intervalo [-1,1] utilizando la regla de Newton-Cotes cerrada con n=4.",
      options: ["2.67", "2.00", "3.33", "3.50"],
      correct: "2.00",
  },
  {
      id: "30",
      question: "Aproxima la integral de la función f(x) = x^2 + 2x + 3 en el intervalo [-1,1] utilizando la regla del trapecio con n=10.",
      options: ["8.33", "9.00", "9.33", "10.00"],
      correct: "9.00",
  },
  {
      id: "31",
      question: "Aproxima la integral de la función f(x) = sen(x) en el intervalo [0,π/2] utilizando la regla de Simpson 1/3 con n=4.",
      options: ["0.95", "1.01", "0.98", "0.99"],
      correct: "0.99",
  },
  {
      id: "32",
      question: "Aproxima la integral de la función f(x) = 1/(1+x) en el intervalo [0,1] utilizando la regla de Simpson 3/8 con n=3.",
      options: ["0.80", "0.83", "0.85", "0.87"],
      correct: "0.83",
  },
  {
      id: "33",
      question: "Aproxima la integral de la función f(x) = 2x^3 - x^2 + 4x - 1 en el intervalo [0,2] utilizando la regla de Newton-Cotes cerrada con n=5.",
      options: ["34.70", "35.34", "36.28", "37.58"],
      correct: "35.34",
  },
  {
      id: "34",
      question: "Aproxima la integral de la función f(x) = cos(x) en el intervalo [0,π/4] utilizando la regla de Newton-Cotes abierta de orden 3 con n=3.",
      options: ["0.71", "0.72", "0.73", "0.74"],
      correct: "0.73",
  },
  {
      id: "35",
      question: "Aproxima la integral de la función f(x) = e^(-x^2) en el intervalo [0,1] utilizando la regla de Newton-Cotes abierta con n=2.",
      options: ["0.66", "0.70", "0.74", "0.78"],
      correct: "0.78",
  },
  {
      id: "36",
      question: "Dada la ecuación diferencial ordinaria y' = 2y + 1, con la condición inicial y(0) = 1, calcule y1 y y2 utilizando el método de Euler mejorado con h = 0.1.",
      options: ["y1 = 1.1, y2 = 1.231", "y1 = 1.2, y2 = 1.452", "y1 = 1.3, y2 = 1.693", "y1 = 1.4, y2 = 1.955"],
      correct: "y1 = 1.1, y2 = 1.231",
  },
  {
      id: "37",
      question: "Dada la ecuación diferencial ordinaria y' = -y, con la condición inicial y(0) = 1, calcule y1 y y2 utilizando el método de Euler con h = 0.2.",
      options: ["y1 = 0.8, y2 = 0.64", "y1 = 0.8, y2 = 0.512", " y1 = 0.6, y2 = 0.36", "y1 = 0.6, y2 = 0.288"],
      correct: "y1 = 0.8, y2 = 0.512",
  },
  {
      id: "38",
      question: "Dada la ecuación diferencial ordinaria y' = 2y - 3, con la condición inicial y(0) = 4, calcule y1 y y2 utilizando el método de Euler modificado con h = 0.2.",
      options: ["y1 = 3.4, y2 = 2.76", "y1 = 3.4, y2 = 2.728", "y1 = 3.6, y2 = 3.048", "y1 = 3.6, y2 = 3.084"],
      correct: "y1 = 3.6, y2 = 3.084",
  },
  {
      id: "39",
      question: "Dada la ecuación diferencial ordinaria y' = 0.5 - 0.2y, con la condición inicial y(0) = 1, calcule y1 y y2 utilizando el método de Runge-Kutta de segundo orden con h = 0.1.",
      options: ["y1 = 1.02, y2 = 1.032", "y1 = 0.98, y2 = 0.964", "y1 = 0.98, y2 = 0.952", "y1 = 1.02, y2 = 1.044"],
      correct: "y1 = 1.02, y2 = 1.032",
  },
  {
      id: "40",
      question: "Dada la ecuación diferencial ordinaria y' = -0.2y + 0.4, con la condición inicial y(0) = 2, calcule y1 y y2 utilizando el método de Runge-Kutta de cuarto orden con h = 0.1.",
      options: ["y1 = 1.902, y2 = 1.809", "y1 = 1.902, y2 = 1.726", "y1 = 2.098, y2 = 2.174", "y1 = 2.098, y2 = 2.286"],
      correct: "y1 = 1.902, y2 = 1.726",
  },
];
