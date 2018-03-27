/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
      return true;
    } else if(rockRightEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge){
      return true;
    } else if(rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge){
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);
  
  function moveRock() {
    var rockBottom = 0;
 
    function step() {
      rock.style.bottom = `${rockBottom -= 2}px`;
   
      if (rockBottom > 0) {
        window.requestAnimationFrame(step);
      }
    }
    if(checkCollision(rock)){
      endGame();
    } else if (rock.style.bottom > 0){
      moveRock();
    }else if (rock.style.bottom === 0){
      ROCKS.remove();
    }
    window.requestAnimationFrame(step);
  }

  moveRock();
  ROCKS.push(rock);
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  // End the game by clearing removing all ROCKS from the DOM,
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  let eventKey = e;
  if (eventKey.key == 37) {
    moveDodgerLeft();
    e.stopPropagation();
    e.preventDefault();
  }else if (eventKey.key == 39){
    moveDodgerRight();
    e.stopPropagation();
    e.preventDefault();
  }

}

function moveDodgerLeft() {
  let dodgerLeft = positionToInteger(DODGER.style.left);
  function step() {
    if (dodgerLeft > 3) {
      dodgerLeft -= 4;
      DODGER.style.left = `${dodgerLeft}px`;
      window.requestAnimationFrame(step);
    }
  }
    
  window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  let dodgerRight = positionToInteger(DODGER.style.right);
  function step() {
    if (dodgerRight < 397) {
      dodgerRight += 4;
      DODGER.style.right = `${dodgerRight}px`;
      window.requestAnimationFrame(step);
    }
  }
  
  window.requestAnimationFrame(step);
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger(e));

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
