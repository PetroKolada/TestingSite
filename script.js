let progressList = document.querySelector("#progressList")
let questionTitle = document.querySelector("#questionTitle")
let questionSubtitle = document.querySelector("#questionSubtitle")
let questionInput = document.querySelector("#questionInput")
let questionCount = document.querySelector("#questionCounter")

let questionList = [
    {
        title:"Сколько будет 2+2",
        subtitle:"В этом вопросе вам предстоит решить пример",
        answers:["log(2)16","cos(2п/4)","(x^2)-4x+16","f'(5x+4)"],
        rightAnswer:0
    },
    {
        title:"Что из всего этого союз",
        subtitle:"В этом вопросе вам предстоит найти союз из русского языка",
        answers:["один","мы","да","как"],
        rightAnswer:2
    },
    {
        title:"Что такое брахиалис",
        subtitle:"В этом вопросе вам предстоит найти правильный ответ",
        answers:["Горло","Деньги северной Европы","Вид конденсатора","Плечо"],
        rightAnswer:3
    },
    {
        title:"Какой стандартный вид имеет локальный айпи адресс",
        subtitle:"В этом вопросе вам предстоит дать ответ",
        answers:["1.1.1.1","168.192.0.1","localhost","192.168.0.0"],
        rightAnswer:3
    }
]

function highliteQuestion(questionID, color, symbol) {
    Array.from(progressList.children).forEach(element => {
        if (Array.from(progressList.children).indexOf(element) == questionID){
            element.querySelector(".progress_done").style.width = "50px"
        }else{
            element.querySelector(".progress_done").style.width = "0px"
        }
    });
}

function setQuestion(title, subtitle, answers) {
    questionInput.innerHTML = ``
    answers.forEach(element => {
        questionInput.innerHTML += 
        `
        <div class="input_button">`+element+`</div>
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
                <div class="progress_name">`+element.title+`</div>
            </div>
            `
    });
}

function finishQuestions(rightAnswers) {
    questionInput.innerHTML = ""
    questionTitle.textContent = "Ваша оценка - " + Math.round((((rightAnswers/questionList.length) * 10)/2))
    questionSubtitle.textContent = "Вы ответили правильно на " + rightAnswers + " из " + questionList.length
}

let questionCounter = 0
questionCount.textContent = "Вопрос " +(questionCounter + 1) + " из " + questionList.length
let rightAnswers = 0

initQuestions(questionList)
setQuestion(questionList[0].title, questionList[0].subtitle, questionList[0].answers)
highliteQuestion(questionCounter)

questionInput.addEventListener("click", (event)=>{
    console.log(questionCounter);
    if(questionList[questionCounter].rightAnswer == Array.from(questionInput.children).indexOf(event.target)){
        rightAnswers++
    }
    if (questionCounter == questionList.length-1) {
        finishQuestions(rightAnswers)
    }
    questionCounter++
    questionCount.textContent = "Вопрос " +(questionCounter + 1) + " из " + questionList.length
    setQuestion(questionList[questionCounter].title, questionList[questionCounter].subtitle, questionList[questionCounter].answers)
    highliteQuestion(questionCounter)
})