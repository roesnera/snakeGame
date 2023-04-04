const squares = document.querySelectorAll(".grid div");
console.log(squares);
const scoreDisplay = document.querySelector("span");
const startBtn = document.querySelector(".start");

const width = 10;
let currentIndex = 0; //first div in grid
let appleIndex = 0; //first div in grid
let currentSnake = [2, 1, 0];

let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
   (interval);

  score = 0;
  randomApple();
  direction = 1;
  scoreDisplay.innerText = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutcomes, intervalTime);
}

// deals with all outcomes of the snake
function moveOutcomes() {
  // hitting a border
  // hitting self
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //snake hits the bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || // snake hits the right
    (currentSnake[0] % width === 0 && direction === -1) || // snake hits the left
    (currentSnake[0] - width < 0 && direction === -width) || // snake hits the top
    squares[currentSnake[0] + direction].classList.contains("snake") // snake hits itself
  ) {
    return clearInterval(interval); // will clear the interval
  }

  const tail = currentSnake.pop();

  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  // squares[head+direction].classList.add('snake');
  // hitting apple

  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcomes, intervalTime);
  }

  squares[currentSnake[0]].classList.add("snake");
}

function randomApple() {
    do{
        appleIndex = Math.floor(Math.random() * squares.length);

    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

function control(e) {
  squares[currentIndex].classList.remove("snake"); //removes snake from the classlist for the current index

  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width; //if we press the up arrow, move the head up a row (back ten divs)
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width; //if we press the down arrow, move the head down a row (forward ten divs)
  }
}

document.addEventListener("keydown", control);
startBtn.addEventListener("click", startGame);
