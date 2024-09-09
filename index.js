// fetch kar lete jiski jrurat hai
const boxes=document.querySelectorAll(".box");
const gameInfo =document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// take variable

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

// let's create a function to intialise the game 

function initGame() {
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    // new game click krne par UI me bhi empty krna pdega
    boxes.forEach((box,index) => {
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        // grren color last me htna chiye(initialise box
        //  with css properties again)
        box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`current player-${currentPlayer}`;

}

initGame();

function swapTurn(){
    if(currentPlayer==="X") {
        currentPlayer="O";
    }
    else {
        currentPlayer="X";
    }

    // UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    winningPositions.forEach((position) => {
        // all 3 boxes should not be non empty and exactly same in value
        if((gameGrid[position[0]]!==""|| gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && 
        (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]])) {

            // check if wiiner is x
            if(gameGrid[position[0]]==="X")
                answer = "X";
            else
                answer="O";

                // disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents ="none";
                })
            // now we know X/O is a winner(green color)
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
    }
});

// it means we have a winner
if(answer !== "") {
    gameInfo.innerText=`Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
}

// let's check whether there is tie
let fillCount =0 ;
gameGrid.forEach((box) => {
    if(box!=="")
        fillCount++;
});

// board if filled, game is tie (update in UI)
if(fillCount === 9){
    gameInfo.innerText ="game Tied !";
    newGameBtn.classList.add("active");
}
}

function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap kro turn ko
        swapTurn();
        // check koi jeeet to nhi gya
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",()=> {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);