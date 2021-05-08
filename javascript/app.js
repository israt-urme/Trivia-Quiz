//access html classes
const quesNo = document.querySelector(".question-no");
const quesText = document.querySelector(".question");
const optioN = document.querySelector(".ques-options");
const sigN = document.querySelector(".answer-sign");
const homePage = document.querySelector(".home");
const quizPage = document.querySelector(".quiz");
const resultPage = document.querySelector(".result");
const emo1 = document.querySelector(".emoji1");
const emo2 = document.querySelector(".emoji2");
const emo3 = document.querySelector(".emoji3");

//initialization
let totalQues = [];
let quesCount = 0;
let quizLen = quizes.length;
let Current;
let totalOption = [];
let correct = 0;
let flag=0;

//set question array
function setTotalQues(){
    for(let i=0;i<quizLen;i++){
        totalQues.push(quizes[i]);
    }
}

function getNewQues(){
    //get question no
    quesNo.innerHTML = "Question " + (quesCount+1) + " of " + quizLen;
    
    //get random question
    const quesIndex = totalQues[Math.floor(Math.random() * totalQues.length)];
    Current = quesIndex;
    quesText.innerHTML = Current.que;
    //...get specific index number of ques
    const indexQ = totalQues.indexOf(Current);
    //...remove that ques of the index to avoid repeated ques
    totalQues.splice(indexQ,1);
    console.log(quesIndex);
    console.log(totalQues);
    
    //set random options
    const optionLen = quesIndex.options.length;
    for(let i=0;i<optionLen;i++)
    {
        totalOption.push(i);
    }
    optioN.innerHTML = ''; //taking empty container to avoid overlapping of options
    let animationDelay = 0.1;
    for(let i=0;i<optionLen;i++)
    {
        //...get specific index number of options
        const optionIndex = totalOption[Math.floor(Math.random() * totalOption.length)];
        const indexOp = totalOption.indexOf(optionIndex);
        //...remove that option of index to avoid repeatance
        totalOption.splice(indexOp,1);

        //view random options
        const option = document.createElement("div");
        option.innerHTML = Current.options[optionIndex];
        option.id = optionIndex;
        option.className = "select";
        optioN.appendChild(option);

        //..animation time delay
        option.style.animationDelay = animationDelay + 's';
        animationDelay += 0.2;
        
        //get result for each question
        option.setAttribute("onclick","getResult(this)");

    }
    quesCount++;
}

function getResult(getOptions)
{
    //compare options
    const option_id = parseInt(getOptions.id);
    const childOpLen = optioN.children.length;
    //console.log(typeof option_id);
    if((option_id+1) === Current.answer)
    {
        getOptions.classList.add("correct");
        signUpdate("correct");
        correct++;
    }
    else{
        getOptions.classList.add("wrong");
        for(let i=0; i<childOpLen; i++)
        {
            if(parseInt(optioN.children[i].id)+1 === Current.answer)
                optioN.children[i].classList.add("correct");
        }
        signUpdate("wrong");
        flag=1;
    }
    //after a option is selected, can't select more 
    for(let i=0; i<childOpLen; i++)
    {
        optioN.children[i].classList.add("answered");
    }
}

function trackAnswers(){
    //add tracker
    sigN.innerHTML = '';
    for(let i=0; i<quizLen; i++)
    {
        const track = document.createElement("div");
        sigN.appendChild(track);

    }
}

//update track signs
function signUpdate(type){
    sigN.children[quesCount-1].classList.add(type);
}

function next(){
    
    if(quesCount === quizLen){
        quizOver();
    }
    else if(flag===1) //end the game if the player select wrong answer
    {
        flag = 0;
        quizOver();
    }
    else{
        getNewQues();
    }
}

function quizOver(){
    //show gifs
    if(correct === quizLen){
        emo1.classList.remove("hide");
        emo2.classList.add("hide");
        emo3.classList.add("hide");
        //show comment
        resultPage.querySelector(".comment").innerHTML = "Congratulations!<br>You solve all the questions.";
    }
    else if(correct < 4){
        emo3.classList.remove("hide");
        emo2.classList.add("hide");
        emo1.classList.add("hide");
        //show comment
        resultPage.querySelector(".comment").innerHTML = "You should try hard.";
    }
    else{
        emo2.classList.remove("hide");
        emo1.classList.add("hide");
        emo3.classList.add("hide");
        //show comment
        resultPage.querySelector(".comment").innerHTML = "You are almost there.";
    }
    quizPage.classList.add("hide");
    resultPage.classList.remove("hide");
    //show result
    resultPage.querySelector(".score").innerHTML = correct + " / " + quizLen;
}

//try again after each round
function tryAgain(){
    resultPage.classList.add("hide");
    quizPage.classList.remove("hide");
    totalQues=[];
    quesCount = 0;
    correct = 0;
    start();
}

//quit the game and go back home
function backHome(){
    resultPage.classList.add("hide");
    homePage.classList.remove("hide");
    totalQues=[];
    quesCount = 0;
    correct = 0;
}

//start the game
function start(){
    homePage.classList.add("hide");
    quizPage.classList.remove("hide");
    setTotalQues();
    getNewQues();
    trackAnswers();
}

// window.onload = function()

// Home GSAP Animation
gsap.from('.home-title', {opacity: 0, duration: 1, delay:1.6, y: 30})
gsap.from('.home-description1', {opacity: 0, duration: 1, delay:1.8, y: 30})
gsap.from('.home-description2', {opacity: 0, duration: 1, delay:1.9, y: 30})
gsap.from('.play-btn', {opacity: 0, duration: 1, delay:2.1, y: 30})
gsap.from('.col-2', {opacity: 0, duration: 1, delay:1.3, y: 30})
