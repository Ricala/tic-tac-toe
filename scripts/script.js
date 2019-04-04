const boardArea = document.querySelector('.board');
let playerChoice = "";

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
          console.log("Should be O");
          console.log(playerChoice);
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
      console.log("playerchoice set")
      console.log(playerChoice);
    }

    function getPlayerChoice(){
      return playerChoice;
    }

    return {
      getPlayerChoice
    }
  })();;

  return {
    playerBtnListener
  }
})();