export let timerCircle;

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  let r = getRandomNumber(0, 255);
  let g = getRandomNumber(0, 255);
  let b = getRandomNumber(0, 255);
  return `rgb(${ r }, ${ g }, ${ b })`;
}

function applyingDifficult(difficult) {
  switch (difficult) {
    case "easy":
      return getRandomNumber(60, 80);
    case "medium":
      return getRandomNumber(40, 60);
    case "hard":
      return getRandomNumber(20, 40);
    case "nightmare":
      return getRandomNumber(10, 15);
  }
}

function createRandomCircle(board, size) {
  const circle = document.createElement("div");
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  Object.assign(circle.style, {
    width: `${ size }px`,
    height: `${ size }px`,
    left: `${ x }px`,
    top: `${ y }px`,
  });
  circle.setAttribute("data-id", `${ Date.now() }`);
  return circle;
}

export function addRandomCircle(board, difficult) {
  const size = applyingDifficult(difficult);
  let circle = createRandomCircle(board, size);

  (difficult === "nightmare") ? circle.style.backgroundColor = "rgb(54 66 78)" : applyGradient(circle, size);
  if (difficult === "nightmare") {
    clearTimeout(timerCircle);
    timerCircle = setTimeout(function tmp() {
      circle.remove();
      addRandomCircle(board, difficult);
    }, 1000);
  } else {
    createMiniBoard(board, size, circle);
  }
  board.append(circle);
}


function getRandomGradient(size) {
  const colorsCount = getRandomNumber(0, Math.round(size / 10)) + 2;
  let arrayColors = [];
  let offset = +(100 / (colorsCount - 1)).toFixed(2);
  let position = 0;
  for (let i = 0; i < colorsCount; i++) {
    arrayColors.push({ color: getRandomColor(), position: +position.toFixed(2) });
    position += offset;
  }

  return { arrayColors, offset };
}


function applyGradient(circle, size) {

  let { arrayColors, offset } = getRandomGradient(size);
  moving(circle, arrayColors, offset);
  arrayColors = moveGradient(arrayColors, offset);
  return gradientToString(arrayColors);
}

function moveGradient(arrayColors, offset) {
  const moveOffset = 1;
  for (let i = 0; i < arrayColors.length; i++) {
    if (i === 0 && arrayColors[i + 1].position - arrayColors[i].position < offset) continue;

    arrayColors[i].position += moveOffset;
  }
  if (arrayColors[arrayColors.length - 1].position > 100 + offset) arrayColors.length--;
  if (arrayColors[0].position > 0) arrayColors.unshift({
    color: getRandomColor(),
    position: 0
  });
  return arrayColors;
}

function gradientToString(arrayColors) {
  let str = `radial-gradient(`;
  for (let i = 0; i < arrayColors.length; i++) {
    str += `${ arrayColors[i].color } ${ arrayColors[i].position }%`;
    str += (i < arrayColors.length - 1) ? ", " : ")";
  }
  return str;
}

function moving(circle, arrayGradient, offset) {
  setInterval(() => {
    arrayGradient = moveGradient(arrayGradient, offset);
    circle.style.background = gradientToString((arrayGradient));
  }, 10);
}

function createMiniBoard(board, size, circle) {
  let id = circle.getAttribute("data-id");
  let miniBoard = document.createElement("div");
  Object.assign(miniBoard.style, {
    width: circle.style.width,
    height: circle.style.height,
    left: circle.style.left,
    top: circle.style.top,
  });
  miniBoard.classList.add("mini-board");
  miniBoard.setAttribute("data-id", `${ id }`);
  board.append(miniBoard);
  createMiniCircles(miniBoard, size);
}

//todo сделать чтобы они располагались по кругу, а не кучкой
//todo чтобы уменьшались в свой центр, а не левый верхний угол
//todo расположить кружочки по окружности
//todo отказаться от getClientBoundingRect()?

function createMiniCircles(miniBoard, size) {
  let countMiniCircles = getRandomNumber(3, 10);
  let id = miniBoard.getAttribute("data-id");
  for (let i = 0; i < countMiniCircles; i++) {
    let miniCircle = createRandomCircle(miniBoard, size / 5);
    miniCircle.classList.add("circle", "mini");
    miniCircle.style.backgroundColor = getRandomColor();
    miniCircle.setAttribute("data-id", `${ id }`);
    miniBoard.append(miniCircle);
  }
}