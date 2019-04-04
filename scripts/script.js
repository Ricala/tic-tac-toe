const boardArea = document.querySelector('.board');


const gameBoard = (() => {
  const playerChoice = "X";
  const gameBoard = [0,1,2,"X",4,5,6,"X","O"];
  
  function renderBoard(){
    for(let i = 0; i < 9; i++) {
      if(gameBoard[i] == "X")
      {
        let xSpot = document.querySelector(`.spot${i}`);
        let xText = document.createElement('h1');
        xText.appendChild(document.createTextNode("X"));
        xSpot.appendChild(xText);

      } else if (gameBoard[i] == "O")
      {
        let oSpot = document.querySelector(`.spot${i}`);
        let oText = document.createElement('h1');
        oText.appendChild(document.createTextNode("O"));
        oSpot.appendChild(oText);
      }
      

      // eachSpace.addEventListener("click", function() {
      //   checkArea(gameBoard[i], i);
      //});

    }
  };

  renderBoard();


  const addListeners = (() => {
    for (let i = 0; i < gameBoard.length; i++) {
      let spot = document.querySelector(`.spot${i}`)
      spot.addEventListener("click", function() {
        console.log("you clicked region number " + i);
      });
    }
  })();  


  function checkArea (area, index) {
    if (area == ""){
      setArea(index);
    }
  }
  
  function setArea (index) {
    gameBoard[index] = playerChoice;
    createBoard();
  };

  return {gameBoard};
})();

console.log(gameBoard);