let progressList = document.querySelector("#progressList")
let questionTitle = document.querySelector("#questionTitle")
let questionSubtitle = document.querySelector("#questionSubtitle")
let questionInput = document.querySelector("#questionInput")
let questionCount = document.querySelector("#questionCounter")

let wrongAnswers = []

let questionList = [
    {
        title: "Сколько будет 2+2",
        subtitle: "В этом вопросе вам предстоит решить пример",
        answers: ["log(2)16", "cos(2п/4)", "(x^2)-4x+16", "f'(5x+4)"],
        rightAnswer: 0
    },
    {
        title: "Что из всего этого союз",
        subtitle: "В этом вопросе вам предстоит найти союз из русского языка",
        answers: ["один", "мы", "да", "как"],
        rightAnswer: 2
    },
    {
        title: "Что такое брахиалис",
        subtitle: "В этом вопросе вам предстоит найти правильный ответ",
        answers: ["Горло", "Деньги северной Европы", "Вид конденсатора", "Плечо"],
        rightAnswer: 3
    },
    {
        title: "Какой стандартный вид имеет локальный айпи адресс",
        subtitle: "В этом вопросе вам предстоит дать ответ",
        answers: ["1.1.1.1", "168.192.0.1", "localhost", "192.168.0.0"],
        rightAnswer: 3
    }
]

function highliteQuestion(questionID, color, symbol) {
    Array.from(progressList.children).forEach(element => {
        if (Array.from(progressList.children).indexOf(element) == questionID) {
            element.querySelector(".progress_done").style.width = "50px"
        } else {
            element.querySelector(".progress_done").style.width = "0px"
        }
    });
}

function setQuestion(title, subtitle, answers) {
    questionInput.innerHTML = ``
    answers.forEach(element => {
        questionInput.innerHTML +=
            `
        <div class="input_button">`+ element + `</div>
        `
    });

    questionTitle.textContent = title
    questionSubtitle.textContent = subtitle
}

function initQuestions(questionList) {
    progressList.innerHTML = ``
    questionList.forEach(element => {
        progressList.innerHTML +=
            `
            <div class="progress_element">
                <div class="progress_shower">
                    ?
                    <div class="progress_done"></div>
                </div>
                <div class="progress_name">`+ element.title + `</div>
            </div>
            `
    });
}

function addWrongQuestions(question, chosen) {
    document.querySelector(".question_holder").innerHTML +=
        `                
    <div class="question__element wrong">
        <div class="question_title_holder">
            <span class="question_title" id="questionTitle">`+ question.title + `</span>
            <span class="question_subtitle" id="questionSubtitle">`+ question.subtitle + `</span>
        </div>
        <div class="question_input" id="questionInput">
            <div class="input_button">`+ question.answers[0] + `</div>
            <div class="input_button">`+ question.answers[1] + `</div>
            <div class="input_button">`+ question.answers[2] + `</div>
            <div class="input_button">`+ question.answers[3] + `</div>
        </div>
    </div>
    `
    Array.from(document.querySelector(".question_holder").children[document.querySelector(".question_holder").children.length - 1].querySelector(".question_input").children).forEach(element => {
        if (Array.from(document.querySelector(".question_holder").children[document.querySelector(".question_holder").children.length - 1].querySelector(".question_input").children).indexOf(element) == question.rightAnswer) {
            element.style.border = "1px solid green"
        }
        if (Array.from(document.querySelector(".question_holder").children[document.querySelector(".question_holder").children.length - 1].querySelector(".question_input").children).indexOf(element) == chosen) {
            element.style.backgroundColor = "rgba(255, 0, 0, 0.404)"
            element.style.color = "white"
        }
    })

}

function finishQuestions(rightAnswers) {
    questionInput.innerHTML = ""
    questionTitle.textContent = "Ваша оценка - " + Math.round((((rightAnswers / questionList.length) * 10) / 2))
    questionSubtitle.textContent = "Вы ответили правильно на " + rightAnswers + " из " + questionList.length + " (" + Math.round((((rightAnswers / questionList.length) * 100))) + "%)"
    wrongAnswers.forEach(element => {
        addWrongQuestions(element[0], element[1])
    });
}

let questionCounter = 0

questionCount.textContent = "Вопрос " + (questionCounter + 1) + " из " + questionList.length
let rightAnswers = 0


initQuestions(questionList)
setQuestion(questionList[0].title, questionList[0].subtitle, questionList[0].answers)
highliteQuestion(questionCounter)

questionInput.addEventListener("click", (event) => {
    console.log(questionCounter);
    if (questionList[questionCounter].rightAnswer == Array.from(questionInput.children).indexOf(event.target)) {
        rightAnswers++
    } else {
        wrongAnswers.push([questionList[questionCounter], Array.from(questionInput.children).indexOf(event.target)])
    }

    if (questionCounter == questionList.length - 1) {
        finishQuestions(rightAnswers)
    }
    questionCounter++
    questionCount.textContent = "Вопрос " + (questionCounter + 1) + " из " + questionList.length
    setQuestion(questionList[questionCounter].title, questionList[questionCounter].subtitle, questionList[questionCounter].answers) ? 1 : 1
    highliteQuestion(questionCounter)
})