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
        let gameArr = gameBoardHandler.getGameBoard();
        if(gameArr[arrValue] == playerHandler.getPlayerChoice()) {
          playerPointCount++;

        } else if (gameArr[arrValue] == computerHandler().getCompChoice()){
            compPointCount++;
          
        } else {
            playerPointCount = 0;
            compPointCount = 0;
        }
        if(playerPointCount == 3 || compPointCount == 3) {
          if(playerPointCount == 3) {
            playerPointCount = 0;
            winner(true, eachArr);
          }
          else {
            compPointCount = 0;
            winner(false, eachArr);
          }
        }
      }
    }
  }

  function turnComplete () {
    checkWinPosition();
    if(gameBoardHandler.getAvailableMoves() == 0){
      gameOver();
    } else {
    playerHandler.swapPlayerTurn();
    }
  }

  function winner(winner, eachArr) {
    highlightWin(eachArr, winner);
    gameOver();
  }

  function gameOver() {
    console.log("gameover");
    playerHandler.resetPlayer();
    playerHandler.swapPlayerTurn();
  }

  function highlightWin(eachArr, win) {
    for(let i = 0; i < eachArr.length; i++) {
      let winningSpot = [eachArr[i]];
      let eachSpot = document.querySelector(`.spot${winningSpot}`);
      eachSpot.className += " winning-color";
      if(win){
        eachSpot.className += " color-win"
      } else {
        eachSpot.className += " color-lose"

      }
    }

  }

  return  {turnComplete};
}

const gameBoardHandler = (() => {
  let gameBoard = [0,1,2,3,4,5,6,7,8];
  let availableMoves = 9;
  let reset= false;
  let resetBtn = document.querySelector(".restart-btn");

  
  function renderBoard(){
    for(let i = 0; i < 9; i++) {

      if(reset) {
        let eachSpot = document.querySelector(`.spot${i}`);
        eachSpot.classList.remove("winning-color");
        eachSpot.classList.remove("color-win");
        eachSpot.classList.remove("color-lose");

        while(eachSpot.firstChild) {
          eachSpot.removeChild(eachSpot.firstChild);
        }
      }
      
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

    resetBtn.addEventListener("click", function() {
      resetBoard();
    })
    disableRestart();
  })();
  
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
      console.log("putting playerturn")
    } else{
      gameBoard[index] = computerHandler().getCompChoice();
      console.log("putting computerTurn")
    }
    renderBoard();
    availableMoves--;
    completeTurn();
  };

  function completeTurn() {
    gamePlay().turnComplete();
  }

  function getAvailableMoves () {
    return availableMoves;
  }

  function disableRestart() {
    resetBtn.style.display = 'none';
  }

  function enableRestart() {
    resetBtn.style.display = 'block';
  }

  function getGameBoard() {
    return gameBoard;
  }

  function resetBoard() {
    availableMoves = 9;
    gameBoard = [0,1,2,3,4,5,6,7,8];
    playerHandler.resetPlayer();
    reset = true;
    playerHandler.enableBtn();
    disableRestart();
    for(let i = 0; i < 9; i++) {
      renderBoard();
    }
    reset = false; 

    renderBoard();
  }


  return {
    getGameBoard,
    checkSpot,
    getAvailableMoves,
    resetBoard,
    enableRestart
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
      playerturn = true;
    })

    oBtn.addEventListener("click", function() {
      setPlayer("O");
      computerHandler().setCompChoice("X");
      disableBtn();
    })

  })();
  
  function disableBtn() {
    selectBtns.style.display = "none";
    gameBoardHandler.enableRestart();
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

  function resetPlayer() {
    playerChoice = "";
    playerTurn = true;
    console.log("playerreset")
    console.log(playerTurn)
    console.log(playerChoice)
  }

  function swapPlayerTurn() {
    if (playerTurn) {
      playerTurn = false;
      setTimeout(function(){ 
        computerHandler().compTurn();}, 200);
      
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
    isPlayerTurn,
    resetPlayer,
    playerTurn
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
        let gameArr = gameBoardHandler.getGameBoard();
        continueTurn = gameBoardHandler.checkSpot(gameArr[compPosition], compPosition);
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