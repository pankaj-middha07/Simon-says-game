let gameSeq = [];
let userSeq =[];
let btns =["red","yellow","green","purple"];
let started = false;
let level = 0;

let h1 =  document.querySelector("h1");
let h2 = document.querySelector("h2");
let body = document.querySelector("body");

let highestScores = parseInt(localStorage.getItem('HighScore')) || 0;
let btnHighestScore = document.createElement("button");
btnHighestScore.innerText = ` Your Highest Score : ${highestScores}`;
h1.insertAdjacentElement('afterend',btnHighestScore);
btnHighestScore.classList.add("high");


let allBtns = document.querySelectorAll(".btn");

{  for (btn of allBtns){
    btn.classList.add("pointer");
}

}

let play = document.querySelector(".play");

play.addEventListener("click",function(){
    if(started == false){
        console.log("game start");
        started = true;
         }
    play.classList.add("hidden");
   
    for (btn of allBtns){
    btn.classList.remove("pointer");
    } 


   
    levelUp();
 
    
});


for (btn of allBtns){
    btn.addEventListener("click",btnPress)
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout (function(){
    btn.classList.remove("flash");
    },400);

}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout (function(){
    btn.classList.remove("userflash");
    },250);

}

function updateHighestScore(){
    if(level > highestScores){
        highestScores = level;
        localStorage.setItem('HighScore', highestScores);
        h3.innerText = ` Your Highest Score : ${highestScores}`;
    }
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerHTML = ` Level ${level}`;

    updateHighestScore();

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`); 
    gameSeq.push(randColor);
    console.log(gameSeq);

    setTimeout(function(){
        gameFlash(randBtn)
    },500);
    

}
function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
           setTimeout (levelUp,1000);
        }
    } else{
        h2.innerHTML =  ` Game Over . Your score is ${level-1} .`;
        
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "white";
        },150);
        reset();
       
    }


}




function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}




function reset(){
    userSeq=[];
    started = false;
    gameSeq =[];
    level = 0;
   play.classList.remove("hidden");
   play.innerText = "Try Again ";
   for (btn of allBtns){
    btn.classList.add("pointer");
    } 
   
    
}   