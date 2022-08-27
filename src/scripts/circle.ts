export let timerCircle: number;
import { difficultSettings } from "./utils";

type arrayColorsRecord = { color: string; position: number }

/**
 * Возвращает случайное целое число из заданного интервала
 * @param min минимальное значение
 * @param max максимальное значение
 * @returns {number} случайное число
 */
function getRandomNumber(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Генерирует случайный цвет в формате rgb(red,green,blue)
 * @returns {string} строка rgb для css свойства background-color
 */
function getRandomColor(): string {
  let r = getRandomNumber(0, 255);
  let g = getRandomNumber(0, 255);
  let b = getRandomNumber(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Генерация размера цели в зависимости от выбранной сложности
 * @param difficult {String}- уровень сложности
 * @returns {number} случайный размер
 */
function applyingDifficult(difficult: string): number {
  let param: number = difficultSettings.findIndex(el => el.difficult === difficult);
  return getRandomNumber(difficultSettings[param].min, difficultSettings[param].max);
}

/**
 * Создание случайного круга с указанными размерами
 * @param board {HTMLElement} эл-т для вставки круга
 * @param size {Number} размеры родительского эл-та
 * @param mini {Boolean} если true, осуществляется генерация маленьких шариков
 * @returns {HTMLDivElement} созданный круг
 */
function createRandomCircle(board: HTMLDivElement, size: number, mini: boolean = false): HTMLDivElement {
  const circle: HTMLDivElement = document.createElement("div");
  const { width, height }: { width: number, height: number } = board.getBoundingClientRect();
  const x: number = getRandomNumber(0, width - size);
  const y: number = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  Object.assign(circle.style, {
    width: `${size}px`,
    height: `${size}px`,
    top: `${mini ? size / 2 : y}px`,
    left: `${mini ? size / 2 : x}px`
  });
  circle.setAttribute("data-id", `${Date.now()}`);
  return circle;
}

/**
 * Вставка круга в элемент
 * @param board {HTMLElement} родительский эл-т
 * @param difficult {String} уровень сложности
 */
export function addRandomCircle(board: HTMLDivElement, difficult: string): void {
  const size = applyingDifficult(difficult);
  let circle = createRandomCircle(board, size);

  (difficult === "nightmare") ? circle.style.backgroundColor = "rgb(54 66 78)" : applyGradient(circle, size);
  if (difficult === "nightmare") {
    clearTimeout(timerCircle);
    timerCircle = window.setTimeout(function tmp() {
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
function getRandomGradient(size: number): { arrayColors: arrayColorsRecord[]; offset: number } {
  const colorsCount: number = getRandomNumber(0, Math.round(size / 10)) + 2;
  let arrayColors: arrayColorsRecord[] = [];
  let offset: number = +(100 / (colorsCount - 1)).toFixed(2);
  let position: number = 0;
  for (let i = 0; i < colorsCount; i++) {
    arrayColors.push({ color: getRandomColor(), position: +position.toFixed(2) });
    position += offset;
  }
  return { arrayColors, offset };
}

/**
 * Применение градиента к эл-ту
 * @param circle {HTMLElement} эл-т
 * @param size {Number} - размер эл-та
 * @returns {string} - строка для CSS-свойства
 * background:radial-gradient(...)
 */
function applyGradient(circle: HTMLDivElement, size: number): string {
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
function moveGradient(arrayColors: arrayColorsRecord[], offset: number): arrayColorsRecord[] {
  const moveOffset: number = 1;
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
function gradientToString(arrayColors: arrayColorsRecord[]): string {
  let str: string = `radial-gradient(`;
  for (let i = 0; i < arrayColors.length; i++) {
    str += `${arrayColors[i].color} ${arrayColors[i].position}%`;
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
function moving(circle: HTMLDivElement, arrayGradient: arrayColorsRecord[], offset: number): void {
  arrayGradient = moveGradient(arrayGradient, offset);
  circle.style.background = gradientToString((arrayGradient));
}

/**
 * Создание эл-та (доски) для маленьких кругов
 * @param board {HTMLElement} эл-та куда будет вставлена доска
 * @param size {Number} размер доски
 * @param circle {HTMLElement} круг, который "взорвется"
 */
function createMiniBoard(board: HTMLDivElement, size: number, circle: HTMLDivElement) {
  let id: string = circle.getAttribute("data-id");
  let miniBoard = document.createElement("div");
  Object.assign(miniBoard.style, {
    width: circle.style.width,
    height: circle.style.height,
    left: circle.style.left,
    top: circle.style.top,
    transform: `rotate(${getRandomNumber(0, 359)}deg)`
  });
  miniBoard.classList.add("mini-board");
  miniBoard.setAttribute("data-id", `${id}`);
  board.append(miniBoard);
  createMiniCircles(miniBoard, size);
}

/**
 * Создание мини кругов
 * @param miniBoard {HTMLElement} - доска для мини-шариков
 * @param size {Number} размер доски
 */
function createMiniCircles(miniBoard: HTMLDivElement, size: number): void {
  let id: string = miniBoard.getAttribute("data-id");
  let miniCircle: HTMLDivElement = createRandomCircle(miniBoard, size / 4, true);
  miniCircle.classList.add("circle", "mini");
  miniCircle.style.backgroundColor = getRandomColor();
  miniCircle.setAttribute("data-id", `${id}`);
  miniBoard.append(miniCircle);
}

/**
 * Перемещение мини-круга
 * @param circle мини-круг
 */
export function moveMiniCircle(circle: HTMLDivElement) {
  let x = Math.round(parseInt(circle.style.top));
  circle.style.transform = `translate(${-20 * x}px, ${-20 * x}px) scale(0)`;
}


export class Circle extends Object {
  protected readonly radius: number;
  protected readonly x: number;
  protected readonly y: number;
  private colors: arrayColorsRecord[] = [];
  private readonly color: string = "rgb(54 66 78)";
  private readonly offset: number;
  protected readonly context: CanvasRenderingContext2D;
  protected readonly board: HTMLCanvasElement;
  protected readonly id: number;

  /**
   *
   * @param difficult от выбранной сложности зависит размер круга и расцветка
   * @param board
   */
  constructor(difficult: string, board: HTMLCanvasElement) {
    super();
    this.radius = applyingDifficult(difficult);
    this.board = board;
    this.context = board.getContext("2d");
    const { width, height }: { width: number, height: number } = board.getBoundingClientRect();
    this.x = getRandomNumber(this.radius, width - this.radius);
    this.y = getRandomNumber(this.radius, height - this.radius);
    this.id = performance.now();
    if (difficult !== "nightmare") {
      ({
        offset: this.offset,
        array: this.colors
      } = this.createGradient());
    }
  }

  /**
   * Генерация случайного градиента
   * @returns {{arrayColors: String[], offset: number}} массив с цветом и смещением в '%' для CSS-свойства
   * background:radial-gradient(arrayColors[i]...)
   * offset смещение цветов относительно друг друга [0,1]
   */
  protected createGradient() {
    const colorsCount: number = getRandomNumber(2, Math.round(this.radius / 5)) + 2;
    let array: arrayColorsRecord[] = [];
    let offset: number = 1 / (colorsCount - 1);
    let position: number = 0;
    for (let i = 0; i < colorsCount; i++) {
      array.push({ color: getRandomColor(), position: Math.round(position * 100) / 100 });
      position += offset;
    }
    return { array, offset };
  }

  /**
   * Отрисовка круга
   */
  draw() {
    if (this.colors.length) {
      let gradient = this.context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      this.colors.forEach(({ color, position }) => gradient.addColorStop(position, color));
      this.context.fillStyle = gradient;
    } else {
      this.context.fillStyle = this.color;
    }
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

  getInfo() {
    return { x: this.x, y: this.y, radius: this.radius, id: this.id };
  }

  clear() {
    this.context.clearRect(this.x - this.radius, this.y - this.radius, this.x + this.radius, this.y + this.radius);
  }
}

export class MiniCircle {
  protected readonly radius: number;
  protected readonly x: number;
  protected readonly y: number;
  protected readonly radiusCircle: number;
  protected readonly xCircle: number;
  protected readonly yCircle: number;
  private readonly color: string;
  protected readonly context: CanvasRenderingContext2D;
  protected readonly board: HTMLCanvasElement;
  protected readonly id: number;

  constructor(board: HTMLCanvasElement, x: number, y: number, radius: number, id: number) {
    this.xCircle = x;
    this.yCircle = y;
    this.radiusCircle = radius;
    this.radius = radius / 4;
    this.board = board;
    this.context = board.getContext("2d");
    this.color = getRandomColor();
    this.id = id;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

  clear() {
    this.context.clearRect(this.x - this.radius, this.y - this.radius, this.x + this.radius, this.y + this.radius);
  }

}


/*
function createMiniCircles(miniBoard: HTMLDivElement, size: number): void {
  let id: string = miniBoard.getAttribute("data-id");
  let miniCircle: HTMLDivElement = createRandomCircle(miniBoard, size / 4, true);
  miniCircle.classList.add("circle", "mini");
  miniCircle.style.backgroundColor = getRandomColor();
  miniCircle.setAttribute("data-id", `${id}`);
  miniBoard.append(miniCircle);
}
 */