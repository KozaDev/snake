createBoard();
const snakeElements = [];
let food;
let snakeDirection = translateNumberToDirection(getRandomInt(0, 3));
let gameOver = false;
initSnake();

function createBoard() {
  const board = document.getElementById("root");
  board.className = "board";

  for (let j = 1; j <= 20; j++) {
    for (let i = 1; i <= 20; i++) {
      const div = document.createElement("div");
      div.className = "board__element";
      div.dataset.y = j;
      div.dataset.x = i;

      board.appendChild(div);
    }
  }
}

function initSnake() {
  let xPoint = getRandomInt(5, 15);
  let yPoint = getRandomInt(5, 15);

  for (let i = 0; i < 3; i++) {
    if (snakeDirection === "up") yPoint++;
    if (snakeDirection === "rigth") xPoint++;
    if (snakeDirection === "down") yPoint--;
    if (snakeDirection === "left") xPoint--;

    const snakeElement = document.querySelector(
      `[data-x="${xPoint}"][data-y="${yPoint}"]`
    );
    snakeElement.classList.add("snake");
    snakeElements.unshift(snakeElement);
  }
  moveSnake();
  controlSnake();
  createFood();
}

function moveSnake() {
  let gameInterval = setInterval(function move() {
    let nextX = snakeElements[0]["dataset"]["x"];
    let nextY = snakeElements[0]["dataset"]["y"];

    if (snakeDirection === "up") nextY++;
    if (snakeDirection === "rigth") nextX++;
    if (snakeDirection === "down") nextY--;
    if (snakeDirection === "left") nextX--;

    if (isGameOver(nextX, nextY)) clearInterval(gameInterval);
    else {
      const nextSnakeElement = document.querySelector(
        `[data-x="${nextX}"][data-y="${nextY}"]`
      );

      nextSnakeElement.classList.add("snake");
      snakeElements.unshift(nextSnakeElement);

      if (nextSnakeElement !== food) {
        snakeElements.pop().classList.remove("snake");
      } else {
        food.classList.remove("food");
        createFood();
      }
    }
  }, 200);
}

function createFood() {
  let xPoint;
  let yPoint;
  do {
    xPoint = getRandomInt(1, 20);
    yPoint = getRandomInt(1, 20);
  } while (
    snakeElements.some(
      ({ dataset }) => dataset.x == xPoint && dataset.y == yPoint
    )
  );

  food = document.querySelector(`[data-x="${xPoint}"][data-y="${yPoint}"]`);
  food.classList.add("food");
}

function isGameOver(nextX, nextY) {
  if (
    nextX < 1 ||
    nextX > 20 ||
    nextY < 1 ||
    nextY > 20 ||
    snakeElements.some(
      ({ dataset }) => dataset.x == nextX && dataset.y == nextY
    )
  )
    return true;
  else return false;
}

function controlSnake() {
  window.addEventListener("keydown", function () {
    if (event.keyCode === 37) {
      if (snakeDirection !== "rigth") snakeDirection = "left";
    } else if (event.keyCode === 38) {
      if (snakeDirection !== "up") snakeDirection = "down";
    } else if (event.keyCode === 39) {
      if (snakeDirection !== "left") snakeDirection = "rigth";
    } else if (event.keyCode === 40) {
      if (snakeDirection !== "down") snakeDirection = "up";
    }
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function translateNumberToDirection(number) {
  if (number === 0) return "up";
  if (number === 1) return "rigth";
  if (number === 2) return "down";
  if (number === 3) return "left";
}
