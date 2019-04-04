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
    let positionCount = 0;
    //loop through possible winning conditions Array
    for (let arr = 0; arr < winPositions.length; arr++){
      positionCount = 0;

      //loop through each smaller array from winPositions
      let eachArr = winPositions[arr];
      for(let arrIndex = 0; arrIndex < winPositions[arr].length; arrIndex++) {

        //assign value from individual array to use as index
        let arrValue = eachArr[arrIndex];

        //use index to check for match against gameBoard
        if(gameBoardHandler.gameBoard[arrValue] == playerHandler.getPlayerChoice()) {
          positionCount++;

          //complete game if 3 in a row
          if(positionCount == 3) {
            console.log("Win")
            winner();
            break;
          }
        } else {
          positionCount = 0;
        }
      }
    }
    playerHandler.swapPlayerTurn();
  }

  function turnComplete () {
    checkWinPosition();
  }

  function winner() {
    let winMessage = document.createElement("h1");
    winMessage.appendChild(document.createTextNode("You Win"));
    boardArea.appendChild(winMessage);
  }

  return  {turnComplete};
}

const gameBoardHandler = (() => {
  const gameBoard = [0,1,2,3,4,5,6,7,8];
  
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


  function checkSpot (spot, index) {
    if (spot !== "X" && spot !== "O"){
      if(playerHandler.getPlayerChoice() !== "") {
      setSpot(index);
      }
    }
  }
  
  function setSpot (index) {
    if(playerHandler.isPlayerTurn()) {
      gameBoard[index] = playerHandler.getPlayerChoice();
      console.log("playerset")
      console.log(gameBoard);
    } else{
      gameBoard[index] = computerHandler().getCompChoice();
      console.log("computerSet")
      console.log(gameBoard);
    }
    renderBoard();
    completeTurn();
  };

  function completeTurn() {
    gamePlay().turnComplete();
    
    playerHandler.enableBtn();
  }

  return {
    gameBoard,
    checkSpot
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
  let contineTurn = true;

  function setCompChoice(choice) {
    compChoice = choice;
    console.log("computer choice set")
    console.log(compChoice);
  }

  function getCompChoice() {
    return compChoice;
  }


  function compTurn() {
    let continueTurn = true;

    while(continueTurn) {
      let compPosition = Math.floor(Math.random() * 9);
      console.log(gameBoardHandler.gameBoard[compPosition]);
      gameBoardHandler.checkSpot(gameBoardHandler.gameBoard[compPosition], compPosition);
      continueTurn = false;
    }

  }

  return {
    compTurn,
    getCompChoice,
    setCompChoice
  }
}