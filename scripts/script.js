const boardArea = document.querySelector('.board');
let compChoice = "";

function gamePlay () {
  

  const winPositions = [[0,1,2],
                        [0,3,6],
                        [0,4,8],
                        [2,5,8],
                        [2,4,6],
                        [6,7,8],
                        [3,4,5],
                        [1,4,7]];
  
  function checkWinPosition() {
    let playerPointCount = 0;
    let compPointCount = 0;
    //loop through possible winning conditions Array
    for (let arr = 0; arr < winPositions.length; arr++){
      playerPointCount = 0;
      compPointCount = 0;

      //loop through each smaller array from winPositions
      let eachArr = winPositions[arr];
      for(let arrIndex = 0; arrIndex < winPositions[arr].length; arrIndex++) {

        //assign value from individual array to use as index
        let arrValue = eachArr[arrIndex];

        //use index to check for match against gameBoard
        if(gameBoardHandler.gameBoard[arrValue] == playerHandler.getPlayerChoice()) {
          playerPointCount++;

        } else if (gameBoardHandler.gameBoard[arrValue] == computerHandler().getCompChoice()){
            compPointCount++;
          
        } else {
            playerPointCount = 0;
            compPointCount = 0;
        }
        if(playerPointCount == 3 || compPointCount == 3) {
          if(playerPointCount == 3) {
            winner(true);
          }
          else {
            winner(false);
          }
          break;
        }
      }
    }
  }

  function turnComplete () {
    checkWinPosition();
    if(gameBoardHandler.getAvailableMoves() == 0){
      gameOver();
    }
    playerHandler.swapPlayerTurn();
  }

  function winner(winner) {
    let winMessage = document.createElement("h1");
    if(winner) {
      winMessage.appendChild(document.createTextNode("You Win"));
    }else {
      winMessage.appendChild(document.createTextNode("You Lose"));

    }

    boardArea.appendChild(winMessage);
    gameBoardHandler.removeListeners();
  }

  function gameOver() {
    alert("GAMEOVER");
  }

  return  {turnComplete};
}

const gameBoardHandler = (() => {
  const gameBoard = [0,1,2,3,4,5,6,7,8];
  let availableMoves = 9;
  
  function renderBoard(){
    for(let i = 0; i < 9; i++) {
      
      if(gameBoard[i] == "X")
      {
        //Check if spot already has a child
        let xSpot = document.querySelector(`.spot${i}`);
        if(!xSpot.hasChildNodes()) {
          let xText = document.createElement('h1');
          xText.appendChild(document.createTextNode("X"));
          xSpot.appendChild(xText);
        }
      } else if (gameBoard[i] == "O") {
          //check if spot already has a child
          let oSpot = document.querySelector(`.spot${i}`);
          if(!oSpot.hasChildNodes()) {
            let oText = document.createElement('h1');
            oText.appendChild(document.createTextNode("O"));
            oSpot.appendChild(oText);
          }
      }
    }
  };


  const addListeners = (() => {
    for (let i = 0; i < gameBoard.length; i++) {
      let spot = document.querySelector(`.spot${i}`)
      spot.addEventListener("click", function() {
        checkSpot(gameBoard[i], i)
      });
    }
  })();
  
  function removeListeners() {
    console.log("remove listeners")
    for (let i = 0; i < gameBoard.length; i++) {
      let spot = document.querySelector(`.spot${i}`)
      spot.removeEventListener("click", function(){}, false);
    }
  }


  function checkSpot (spot, index) {
    if (spot !== "X" && spot !== "O"){
      if(playerHandler.getPlayerChoice() !== "") {
      setSpot(index);
      }
      return false;
    }
    return true;
  }
  
  function setSpot (index) {
    if(playerHandler.isPlayerTurn()) {
      gameBoard[index] = playerHandler.getPlayerChoice();
    } else{
      gameBoard[index] = computerHandler().getCompChoice();
    }
    renderBoard();
    availableMoves--;
    completeTurn();
    console.log(availableMoves);
  };

  function completeTurn() {
    gamePlay().turnComplete();
    playerHandler.enableBtn();
  }

  function getAvailableMoves () {
    return availableMoves;
  }

  function resetAvailableMoves() {
    availableMoves = 9;
  }

  return {
    gameBoard,
    checkSpot,
    removeListeners,
    getAvailableMoves
  };
})();

const playerHandler = (() => {
  let playerChoice = "";
  let playerTurn = true;
  let selectBtns = document.querySelector(".play-btns");

  const playerBtnListener = (() => {
    let xBtn = document.querySelector('#x-btn');
    let oBtn = document.querySelector('#o-btn');

    xBtn.addEventListener("click", function() {
      setPlayer("X");
      computerHandler().setCompChoice("O");
      disableBtn();
    })

    oBtn.addEventListener("click", function() {
      setPlayer("O");
      computerHandler().setCompChoice("X");
      disableBtn();
    })

  })();
  
  function disableBtn() {
    selectBtns.style.display = "none";
  }

  function enableBtn() {
    selectBtns.style.display = "block";
  }
  function setPlayer(choice) {
    playerChoice = choice;
  }

  function getPlayerChoice(){
    return playerChoice;
  }

  function swapPlayerTurn() {
    if (playerTurn) {
      playerTurn = false;
      setTimeout(function(){ 
        computerHandler().compTurn();}, 300);
      
    } else {
      playerTurn = true;
    }
  }

  function isPlayerTurn(){
    return playerTurn;
  }

  return {
    getPlayerChoice,
    enableBtn,
    swapPlayerTurn,
    isPlayerTurn
  }
})();

function computerHandler() {
  let continueTurn = true;

  function setCompChoice(choice) {
    compChoice = choice;
  }

  function getCompChoice() {
    return compChoice;
  }

  function compTurn() {
    if(gameBoardHandler.getAvailableMoves() !== 0) {
      while(continueTurn) {
        let compPosition = Math.floor(Math.random() * 9);
        continueTurn = gameBoardHandler.checkSpot(gameBoardHandler.gameBoard[compPosition], compPosition);
      }
    }
  }

  function swapContinueTurn() {
    if(continueTurn) {
      continueTurn = false;
    } else {
      continueTurn = true;
    }
  }

  return {
    compTurn,
    getCompChoice,
    setCompChoice,
    swapContinueTurn
  }
}