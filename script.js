//Game Constants and variables
let inputDir={x:0, y:0}
const foodSound=new Audio('music/food.mp3')
const gameOverSound=new Audio('music/gameover.mp3')
const moveSound=new Audio('music/move.mp3')
const musicSound=new Audio('music/music.mp3')
let speed=8
let score=0
let lastPaintTime=0
let intervalTime=1000
let snakeSpeed=15
let timerId=0
const board= document.getElementById('board')
const gameScore=document.getElementById('game-score')
let snakeArr=[
    {
        x: 13, y:15
    }
]

food= {x:6, y: 7}

//Game functions
function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime- lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime= ctime;
    gameEngine()
}
function isCollide(snA){
    //if snake bumps into itself
    for (let index = 1; index < snakeArr.length; index++){
        if(snA[index].x===snA[0].x && snA[index].y===snA[0].y )
        {
            return true
            
        }
    }
    //if you collide with wall
    if(snA[0].x>=18|| snA[0].x<=0 || snA[0].y>=18|| snA[0].y<=0 ){
        return true;
        

    }
    return clearInterval(timerId)
}

function gameEngine(){
    //Part 1: Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play()
        musicSound.pause()
        inputDir={x:0, y:0}
        alert("Game Over!!! Press Anykey to play again")
        snakeArr=[{x:13, y:15}]
        musicSound.play()
        score=0
    }

    //increasing score and regenerating the food, if you snake ate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play()
        score+=1
        intervalTime*=speed
        timerId=setInterval(gameEngine, intervalTime)
        if(score>highScoreVal){
            highScoreVal=score
            localStorage.setItem('hiscore', JSON.stringify(highScoreVal))
            highScore.innerHTML= "High Score : " + highScoreVal
        }
        gameScore.innerHTML='Score : ' + score
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
        let a=2
        let b=16
        food={x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
        

    }

    //moving the snake
    for(let i=snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x+=inputDir.x
    snakeArr[0].y+=inputDir.y






    //part 2: Display the snake and food
    //Display the snake
    document.getElementById('board').innerHTML=""
    snakeArr.forEach((e, index)=>{
        snakeElement= document.createElement('div')
        snakeElement.style.gridRowStart=e.y
        snakeElement.style.gridColumnStart=e.x
       
        if(index===0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        document.getElementById('board').appendChild(snakeElement)

       
    })
     //display food
     foodElement= document.createElement('div')
     foodElement.style.gridRowStart=food.y
     foodElement.style.gridColumnStart=food.x
     foodElement.classList.add('food')
     document.getElementById('board').appendChild(foodElement)
}

const highScore=document.getElementById('high-score')

//main logic start here
let hiscore=localStorage.getItem('hiscore')
if(hiscore===null){
    let highScoreVal=0
    localStorage.setItem('hiscore', JSON.stringify(highScoreVal))
}
else{
    highScoreVal=JSON.parse(hiscore)
    highScore.innerHTML= "High Score : " + hiscore

}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e=>{
    inputDir={x:0, y:1}//Start the game
    musicSound.play()
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0
            inputDir.y=-1
            break;
            
        case "ArrowDown":
            inputDir.x=0
            inputDir.y=1
            break;
        
        case "ArrowLeft":
            inputDir.x=-1
            inputDir.y=0
            break;

        case "ArrowRight":
            inputDir.x=1
            inputDir.y=0
            break;


    }
})
