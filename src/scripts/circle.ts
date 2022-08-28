import { applyingDifficult, getRandomColor, getRandomNumber } from "./utils";

export class Circle {
  protected readonly radius: number;
  protected readonly x: number;
  protected readonly y: number;
  private colors: { color: string; position: number }[] = [];
  private readonly offset: number;
  protected readonly context: CanvasRenderingContext2D;
  protected id: number;

  /**
   * @param difficult от выбранной сложности зависит размер круга и расцветка
   * @param board
   */
  constructor(difficult: string, board: HTMLCanvasElement) {
    this.radius = applyingDifficult(difficult);
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
  }

  /**
   * Генерация случайного градиента
   * @returns {{arrayColors: String[], offset: number}} массив с цветом и смещением в '%'
   * offset смещение цветов относительно друг друга [0,1]
   */
  private createGradient() {
    const colorsCount: number = getRandomNumber(2, Math.round(this.radius / 5)) + 2;
    let array: { color: string; position: number }[] = [];
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
  protected draw() {
    if (this.colors?.length) {
      let gradient = this.context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      this.colors.forEach(({ color, position }) => gradient.addColorStop(position, color));
      this.context.fillStyle = gradient;
      this.moveGradient();
      window.requestAnimationFrame(this.draw);
    } else {
      this.context.fillStyle = (this.colors) ? "rgb(54 66 78)" : "rgba(0,0,0,0)";
    }
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

 animate() {
    (this.colors?.length) ? this.id = window.requestAnimationFrame(this.draw) : this.draw();
  }

 protected clearArc() {
   this.context.save();
   this.context.globalCompositeOperation = "destination-out";
   this.context.beginPath();
   this.context.arc(this.x, this.y, this.radius + 2, 0, 2 * Math.PI);
   this.context.fill();
   this.context.restore();
 }

 private moveGradient() {
    const length = this.colors.length;
    const movingOffset = .01;
    for (let i = 0; i < length; i++) {
      if (i === 0 && this.colors[i + 1].position - this.colors[i].position < this.offset) continue;
      this.colors[i].position = Math.round((this.colors[i].position + movingOffset) * 100) / 100;

    }
    if (this.colors[length - 1].position >= 1) this.colors[length - 1].position = 1;
    if (this.colors[length - 2].position >= 1) this.colors.length--;
    if (this.colors[0].position > 0) this.colors.unshift({
      color: getRandomColor(),
      position: 0
    });
  }

 getInfo() {
    return { x: this.x, y: this.y, radius: this.radius };
  }

 clear() {
    window.cancelAnimationFrame(this.id);
    this.colors = null;
    this.clearArc();
  }
}

export class MiniCircle extends Circle {
  protected radius: number;
  protected x: number;
  protected y: number;
  private color: string;
  protected start: number;
  protected id: number;
  private readonly deltaRadius: number;
  private readonly deltaX: number;
  private readonly deltaY: number;

  constructor(board: HTMLCanvasElement, x: number, y: number, radius: number, difficult: string) {
    super(difficult, board);
    const angle = getRandomNumber(0, 360) * (Math.PI / 180);
    this.radius = radius / 4;
    this.color = getRandomColor();
    this.start = performance.now();
    this.x = (radius / 2) * Math.cos(angle) + x;
    this.y = (-radius / 2) * Math.sin(angle) + y;
    this.deltaX = 1.5 * radius * Math.cos(angle) / 100;
    this.deltaY = -1.5 * radius * Math.sin(angle) / 100;
    this.deltaRadius = -this.radius / 100;
  }

  protected draw() {
    if (this.radius + this.deltaRadius <= 0) return this.clear();
    this.clearArc();
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
    this.move();
    window.requestAnimationFrame(this.draw);
  }

  animate() {
    this.id = window.requestAnimationFrame(this.draw);
  }

  private move() {
    this.x += this.deltaX;
    this.y += this.deltaY;
    this.radius += this.deltaRadius;
  }

  clear() {
    window.cancelAnimationFrame(this.id);
    this.color = "rgba(0,0,0,0)";
    this.clearArc();
  }
}