let game = []
let turn = true
let btn = document.getElementById("btn")
let txt = document.getElementById("txt")
let won = false
const winningPositions = [
    // Rows
    [0, 1, 2],  // Top row
    [3, 4, 5],  // Middle row
    [6, 7, 8],  // Bottom row

    // Columns
    [0, 3, 6],  // Left column
    [1, 4, 7],  // Middle column
    [2, 5, 8],  // Right column

    // Diagonals
    [0, 4, 8],  // Top-left to bottom-right
    [2, 4, 6]   // Top-right to bottom-left
];


// Create the board by collecting the divs and putting them in the variable "game"
//
//
//
// Resets the board and game state
function reset(game){
    turn=true
    txt.innerHTML = " "
    won = false
    for(let i =0;i<=9;i++){

        game[i].innerHTML = " ";


    };
}

// A.I it will be able to be toggled and it will always play the trun it's suppose to. It will cheack if it can win.
// - [X] if Possible tgo win than win
// - [X] cheack if middle is avilable. If so take it
// - [X] lastly play random if their is no other choiceS
function canAIWin(ch){
    for(let i = 0;i!=winningPositions.length;i++){
        let pos = 0;
        let play = [];
        for (let j = 0;j!=winningPositions[i].length;j++){
            if(game[winningPositions[i][j]].innerHTML ==ch){
                pos++;
            }else{
                play.push(game[winningPositions[i][j]])
            }
        }
        if((pos ==2)&&( play[play.length-1].innerHTML == " ")){
            return play[play.length-1];

        }
    }
}

const getRandomInteger = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}
// AI state machine
function artiInt(){



    if(!turn){
        let aiPos= canAIWin("O")
        let LaiPos= canAIWin("X")
        if(aiPos !=null){
            aiPos.innerHTML= "O" 
        }else if(LaiPos !=null){

            turn = !turn
            LaiPos.innerHTML = "O"
        }else if(game[4].innerHTML == " "){

            turn=!turn;
            game[4].innerHTML= "O" 

        }else{
            let possibeMove = []
            for(let i =0;i!=game.length-1;i++){

                if(game[i].innerHTML != "X"&& game[i].innerHTML != "O"){
                    possibeMove.push(game[i])
                }

            }
            if(possibeMove.length ==0){
                txt.innerHTML = "Draw"
                return
            }
            let num = getRandomInteger(0,possibeMove.length-1)
            possibeMove[num].innerHTML = "O"
            turn = !turn
        }


    }

}

function createBoard(){

    for(let i =0;i!=9;i++){

        game.push(document.getElementById(""+i));


    };
}
// Sets inner HTML to X or O based on the trun variable alond side cheaking if it's avialable to place there
function listinerLogic(div){

    if(div.innerHTML ==" " && !won)
    {
        if(turn){
            div.innerHTML = "X"


        }else{
            div.innerHTML = "O"
        }
        turn=!turn

        artiInt()
    }

    switch( hasWon()){
        case true:

            txt.innerHTML = "X has won"
            won = true
            break;
        case false:

            won = true
            txt.innerHTML = "O has won"
            break
        case null:
            break;
    }
}
//Creates the an event listiner for each div
// The main logic will be handeled here with external functions 
//
// Use <leader>dd to jump to defenision
function createsListiners(divs){
    for(let i =0;i!=divs.length;i++){

        divs[i].addEventListener("click",() => 
            {
                listinerLogic(divs[i]);
            })
    }


}



function hasWon(){
    // for each possible winning possition cheack if all of them are X's than cheack if all of them are O's

    for(let i = 0;i!=winningPositions.length;i++){
        let pos = 0;
        for (let j = 0;j!=winningPositions[i].length;j++){
            if(game[winningPositions[i][j]].innerHTML =="X"){
                pos++;
            }
        }

        if(pos ==3){
            return true;
        }
    }

    for(let i = 0;i!=winningPositions.length;i++){
        let pos = 0;
        for (let j = 0;j!=winningPositions[i].length;j++){
            if(game[winningPositions[i][j]].innerHTML =="O"){
                pos++;
            }
        }

        if(pos ==3){
            return false;
        }
    }
    return null;
}


function main(){

    createBoard(game)
    createsListiners(game)

    /* TODO:
- [x] Implament click management and turn based change
- [X] Implamnet board reset
- [X] Implament winner loser
- [ ] Implament AI
*/



}
main()
