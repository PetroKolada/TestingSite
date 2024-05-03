let progressList = document.querySelector("#progressList")
let questionTitle = document.querySelector("#questionTitle")
let questionSubtitle = document.querySelector("#questionSubtitle")
let questionInput = document.querySelector("#questionInput")
let questionCount = document.querySelector("#questionCounter")

let wrongAnswers = []

let questionList = [
    {
        title: "В каком году произошла Победа в Великой Отечественной войне?",
        subtitle: "В этом вопросе вам предстоит ответить на вопрос",
        answers: ["1945", "1946", "1935", "1939"],
        rightAnswer: 0,
        imagePath: "img/pictures/image copy 2.png",
        answerType: 0
    },
    {
        title: "Какой город называют городом-героем за его оборону во время войны?",
        subtitle: "В этом вопросе вам предстоит ответить на вопрос",
        answers: ["Техас", "Ленинград", "Сталинград", "Москва"],
        rightAnswer: 2,
        imagePath: "img/pictures/image copy 3.png",
        answerType: 0
    },
    {
        title: "Какой символ используется в России для памяти о павших воинов?",
        subtitle: "В этом вопросе вам предстоит ответить на вопрос",
        answers: ["Звезды на полу", "Стена", "Меч в камне", "Вечный огонь"],
        rightAnswer: 3,
        imagePath: "img/pictures/image copy 4.png",
        answerType: 0
    },
    {
        title: "Какая дата отмечается как День Памяти и скорби в России?",
        subtitle: "В этом вопросе вам предстоит ответить на вопрос",
        answers: ["22 июля", "31 августа", "22 марта", "22 июня"],
        rightAnswer: 3,
        imagePath: "img/pictures/image copy.png",
        answerType: 0
    },
    {
        title: "Какой марш стал гимном Победы?",
        subtitle: "Введите название марша",
        rightAnswer: "Священная война",
        imagePath: "img/pictures/image.png",
        answerType: 1
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

function setQuestion(title, subtitle, answers, type, image) {
    questionInput.innerHTML = ``

    if (image != undefined) {
        questionInput.innerHTML +=
            `
        <img src="`+ image + `" alt="" class="question__image">
        `
    }

    if (type == 0) {
        answers.forEach(element => {
            questionInput.innerHTML +=
                `
            <div class="input_button button">`+ element + `</div>
            `
        });
    } else if (type == 1) {
        questionInput.innerHTML +=
            `
        <input type="text" class="input_text" placeholder="Впишите сюда ваш ответ">
        <div class="submit_button button">Ответить</div>
        `
    }
    console.log(image);

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
    if (question.answerType == 0) {
        document.querySelector(".question_holder").innerHTML +=
            `                
        <div class="question__element wrong">
            <div class="question_title_holder">
                <span class="question_title" id="questionTitle">`+ question.title + `</span>
                <span class="question_subtitle" id="questionSubtitle">`+ question.subtitle + `</span>
            </div>
            <div class="question_input" id="questionInput">
                <div class="input_button button">`+ question.answers[0] + `</div>
                <div class="input_button button">`+ question.answers[1] + `</div>
                <div class="input_button button">`+ question.answers[2] + `</div>
                <div class="input_button button">`+ question.answers[3] + `</div>
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
    } else if (question.answerType == 1) {
        document.querySelector(".question_holder").innerHTML +=
            `                
        <div class="question__element wrong">
            <div class="question_title_holder">
                <span class="question_title" id="questionTitle">`+ question.title + `</span>
                <span class="question_subtitle" id="questionSubtitle">`+ question.subtitle + `</span>
            </div>
            <input type="text" class="input_text" placeholder=`+ "'" + question.rightAnswer + "'" + `>
        </div>
        `
        console.log(question.rightAnswer);
    }

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
setQuestion(questionList[0].title, questionList[0].subtitle, questionList[0].answers, questionList[0].answerType, questionList[0].imagePath)
highliteQuestion(questionCounter)

questionInput.addEventListener("click", (event) => {
    console.log(event.target.classList);
    if (event.target.classList.contains("input_button")) {
        if (questionList[questionCounter].rightAnswer == Array.from(questionInput.children).indexOf(event.target) - 1) {
            rightAnswers++
        } else {
            wrongAnswers.push([questionList[questionCounter], Array.from(questionInput.children).indexOf(event.target) - 1])
        }

        if (questionCounter == questionList.length - 1) {
            finishQuestions(rightAnswers)
        }
        questionCounter++
        questionCount.textContent = "Вопрос " + (questionCounter + 1) + " из " + questionList.length
        setQuestion(questionList[questionCounter].title, questionList[questionCounter].subtitle, questionList[questionCounter].answers, questionList[questionCounter].answerType, questionList[questionCounter].imagePath) ? 1 : 1
        highliteQuestion(questionCounter)
    }




    else
        if (event.target.classList.contains("submit_button")) {
            console.log(questionInput.querySelector(".input_text").value);
            if (questionList[questionCounter].rightAnswer == questionInput.querySelector(".input_text").value) {
                rightAnswers++
            } else {
                wrongAnswers.push([questionList[questionCounter], Array.from(questionInput.children).indexOf(event.target)])
            }

            if (questionCounter == questionList.length - 1) {
                finishQuestions(rightAnswers)
            }
            questionCounter++
            questionCount.textContent = "Вопрос " + (questionCounter + 1) + " из " + questionList.length
            setQuestion(questionList[questionCounter].title, questionList[questionCounter].subtitle, questionList[questionCounter].answers, questionList[questionCounter].answerType, questionList[questionCounter].imagePath) ? 1 : 1
            highliteQuestion(questionCounter)
        }
})