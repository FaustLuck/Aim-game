export let timerCircle;
import { difficultSettings } from "./utils.ts";
//todo ts 204
/**
 * Возвращает случайное целое число из заданного интервала
 * @param min минимальное значение
 * @param max максимальное значение
 * @returns {number} случайное число
 */
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Генерирует случайный цвет в формате rgb(red,green,blue)
 * @returns {string} строка rgb для css свойства background-color
 */
function getRandomColor() {
  let r = getRandomNumber(0, 255);
  let g = getRandomNumber(0, 255);
  let b = getRandomNumber(0, 255);
  return `rgb(${ r }, ${ g }, ${ b })`;
}

/**
 * Генерация рамера цели в зависимсти от выбранной сложности
 * @param difficult {String}- уровень сложности
 * @returns {number} случайный размер
 */
function applyingDifficult(difficult) {
  let param = difficultSettings.findIndex(el => el.difficult === difficult);
  return getRandomNumber(difficultSettings[param].min, difficultSettings[param].max);
}

/**
 * Создание случайного круга с указанными размерами
 * @param board {HTMLElement} эл-т для вставки круга
 * @param size {Number} размеры родительского эл-та
 * @param mini {Boolean} если true, осуществялется генерация маленьких шариков
 * @returns {HTMLDivElement} созданный круг
 */
function createRandomCircle(board, size, mini = false) {
  const circle = document.createElement("div");
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  Object.assign(circle.style, {
    width: `${ size }px`,
    height: `${ size }px`,
    top: `${ mini ? size / 2 : y }px`,
    left: `${ mini ? size / 2 : x }px`
  });
  circle.setAttribute("data-id", `${ Date.now() }`);
  return circle;
}

/**
 * Вставка круга в элемент
 * @param board {HTMLElement} родительский эл-т
 * @param difficult {String} уровень сложности
 */
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
    let countMiniCircles = getRandomNumber(6, 15);
    for (let i = 0; i < countMiniCircles; i++) {
      createMiniBoard(board, size, circle);
    }
  }
  board.append(circle);
}

/**
 * Генерация случайного градиента
 * @param size {Number} размер эл-та
 * @returns {{arrayColors: String[], offset: number}} массив с цветом и смещением в '%' для CSS-свойства
 * background:radial-gradient(arrayColors[i]...)
 * offset смещение цветов относительно друг друга в '%'
 */
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

/**
 * Применеие градиента к эл-ту
 * @param circle {HTMLElement} эл-т
 * @param size {Number} - размер эл-та
 * @returns {string} - строка для CSS-свойства
 * background:radial-gradient(...)
 */
function applyGradient(circle, size) {
  let { arrayColors, offset } = getRandomGradient(size);
  setInterval(moving, 10, circle, arrayColors, offset);
  return gradientToString(arrayColors);
}

/**
 * Удаление вышедшего за рамки цвета и добавление нового
 * @param arrayColors{Object[]} массив цветов для градиента
 * @param offset{Number} смещение цветов относительно друг друга в '%'
 * @returns {Object[]} массив цветов для градиента
 */
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

/**
 * Трансформирование объекта в строку для CSS-свойства background
 * @param arrayColors {Object[]} - массив цветов
 * @returns {string} строка для CSS-свойства background
 */
function gradientToString(arrayColors) {
  let str = `radial-gradient(`;
  for (let i = 0; i < arrayColors.length; i++) {
    str += `${ arrayColors[i].color } ${ arrayColors[i].position }%`;
    str += (i < arrayColors.length - 1) ? ", " : ")";
  }
  return str;
}

/**
 * Перемещение градиента
 * @param circle{HTMLElement} эл-т
 * @param arrayGradient{Object[]} массив цветов и их позиций в градиенте
 * @param offset{Number}смещение цветов в градиенте
 */
function moving(circle, arrayGradient, offset) {
  arrayGradient = moveGradient(arrayGradient, offset);
  circle.style.background = gradientToString((arrayGradient));
}

/**
 * Создание эл-та (доски) для маленьких кругов
 * @param board {HTMLElement} эл-та куда будет втавлена доска
 * @param size {Number} размер доски
 * @param circle {HTMLElement} круг, который "взорвется"
 */
function createMiniBoard(board, size, circle) {
  let id = circle.getAttribute("data-id");
  let miniBoard = document.createElement("div");
  Object.assign(miniBoard.style, {
    width: circle.style.width,
    height: circle.style.height,
    left: circle.style.left,
    top: circle.style.top,
    transform: `rotate(${ getRandomNumber(0, 359) }deg)`
  });
  miniBoard.classList.add("mini-board");
  miniBoard.setAttribute("data-id", `${ id }`);
  board.append(miniBoard);
  createMiniCircles(miniBoard, size);
}

/**
 * Создание мини кругов
 * @param miniBoard {HTMLElement} - доска для мини-шариков
 * @param size {Number} размер доски
 */
function createMiniCircles(miniBoard, size) {
  let id = miniBoard.getAttribute("data-id");
  let miniCircle = createRandomCircle(miniBoard, size / 4, true);
  miniCircle.classList.add("circle", "mini");
  miniCircle.style.backgroundColor = getRandomColor();
  miniCircle.setAttribute("data-id", `${ id }`);
  miniBoard.append(miniCircle);
}

/**
 * Перемещение мини-шарика
 * @param circle мини-шарик
 */
export function moveMiniCircle(circle) {
  let x = Math.round(parseInt(circle.style.top));
  circle.style.transform = `translate(${ -20 * x }px, ${ -20 * x }px) scale(0)`;
}