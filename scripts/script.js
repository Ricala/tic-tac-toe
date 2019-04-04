const boardArea = document.querySelector('.board');
let playerChoice = "";
let game = gamePlay();

function gamePlay () {

  const winPositions = [[0,1,2],
                        [0,3,6],
                        [0,4,8],
                        [2,5,8],
                        [2,4,6],
                        [6,7,8],
                        [3,4,5],
                        [1,4,7]];
  
  function checkWinPosition(gameBoard) {
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
        if(gameBoard[arrValue] == playerChoice) {
          positionCount++;

          //complete game if 3 in a row
          if(positionCount == 3) {
            console.log("Win")
          }
        } else {
          positionCount = 0;
        }
      }
    }
  }

  return  {checkWinPosition};
}
gamePlay();

const gameBoard = (() => {
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
      setSpot(index);
    }
  }
  
  function setSpot (index) {
    gameBoard[index] = playerChoice;
    renderBoard();
    gamePlay().checkWinPosition(gameBoard);
  };

  return {gameBoard};
})();

console.log(gameBoard);

const player = (() => {

  const playerBtnListener = (() => {
    let xBtn = document.querySelector('#x-btn');
    let oBtn = document.querySelector('#o-btn');

    xBtn.addEventListener("click", function() {
      setPlayer("X");
      disableBtn();
    })

    oBtn.addEventListener("click", function() {
      setPlayer("O");
      disableBtn();
    })

    function disableBtn() {
      xBtn.disabled = true;
      oBtn.disabled = true;
    }

    function enableBtn() {
      xBtn.disabled = false;
      oBtn.disabled = false;
    }

    function setPlayer(choice) {
      playerChoice = choice;
    }

    function getPlayerChoice(){
      return playerChoice;
    }

    return {
      getPlayerChoice,
      enableBtn
    }
  })();;

  return {
    playerBtnListener
  }
})();