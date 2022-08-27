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

export class Circle {
  protected readonly radius: number;
  protected readonly x: number;
  protected readonly y: number;
  private colors: arrayColorsRecord[] = [];
  private readonly color: string = "rgb(54 66 78)";
  private readonly offset: number;
  private readonly movingOffset: number = .01;
  protected readonly context: CanvasRenderingContext2D;
  protected readonly board: HTMLCanvasElement;
  protected id: number;
  private readonly duration: number = 100;
  private readonly start: number;

  /**
   * @param difficult от выбранной сложности зависит размер круга и расцветка
   * @param board
   */
  constructor(difficult: string, board: HTMLCanvasElement) {
    this.radius = applyingDifficult(difficult);
    this.board = board;
    this.context = board.getContext("2d");
    const { width, height }: { width: number, height: number } = board.getBoundingClientRect();
    this.x = getRandomNumber(this.radius, width - this.radius);
    this.y = getRandomNumber(this.radius, height - this.radius);
    if (difficult !== "nightmare") {
      ({
        offset: this.offset,
        array: this.colors
      } = this.createGradient());
    }
    this.draw = this.draw.bind(this);
    this.start = performance.now();
  }

  /**
   * Генерация случайного градиента
   * @returns {{arrayColors: String[], offset: number}} массив с цветом и смещением в '%'
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
    if (this.colors?.length) {
      let gradient = this.context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      this.colors.forEach(({ color, position }) => gradient.addColorStop(position, color));
      this.context.fillStyle = gradient;
      this.moveGradient();
      window.requestAnimationFrame(this.draw);
    } else {
      this.context.fillStyle = (this.colors) ? this.color : "rgba(0,0,0,0)";
    }
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

  animate() {
    (this.colors.length) ? this.id = window.requestAnimationFrame(this.draw) : this.draw();
  }

  moveGradient() {
    if (performance.now() - this.start < this.duration) return;
    const length = this.colors.length;
    for (let i = 0; i < length; i++) {
      if (i === 0 && this.colors[i + 1].position - this.colors[i].position < this.offset) continue;
      this.colors[i].position = Math.round((this.colors[i].position + this.movingOffset) * 100) / 100;

    }
    if (this.colors[length - 1].position >= 1) this.colors[length - 1].position = 1;
    if (this.colors[length - 2].position >= 1) this.colors.length--;
    if (this.colors[0].position > 0) this.colors.unshift({
      color: getRandomColor(),
      position: 0
    });
  }

  getInfo() {
    return { x: this.x, y: this.y, radius: this.radius, id: this.id };
  }

  clear() {
    this.colors = null;
    window.cancelAnimationFrame(this.id);
    this.context.clearRect(this.x - this.radius, this.y - this.radius, this.x + this.radius, this.y + this.radius);
  }
}

/*
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
 */

export class MiniCircle {
  protected readonly radius: number;
  protected readonly x: number;
  protected readonly y: number;
  protected readonly angle: number;
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
    this.angle = getRandomNumber(0, 360) * (Math.PI / 180);
    this.radiusCircle = radius;
    this.radius = radius / 4;
    this.board = board;
    this.context = board.getContext("2d");
    this.color = getRandomColor();
    this.id = id;

    this.x = (radius / 2) * Math.cos(this.angle) + this.xCircle;
    this.y = (-radius / 2) * Math.sin(this.angle) + this.yCircle;
    console.log(this.angle);
    console.log({ title: "parent", x, y, radius });
    console.log({ title: "mini", x: this.x, y: this.y, radius: this.radius });
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