/**
 * @constructor
 */
export class PreTimer {
  protected opacity: number;
  protected scale: number;
  protected process: number;
  protected id: number;
  protected startTimestamp: number;
  protected text: string;
  protected readonly duration: number = 1000;
  protected readonly board: HTMLCanvasElement;
  protected readonly context: CanvasRenderingContext2D;

  /**
   * Создание предстартового отсчета перед игрой
   * @param board {HTMLCanvasElement}
   */
  constructor(board: HTMLCanvasElement) {
    this.board = board;
    this.context = this.board.getContext("2d");
    this.draw = this.draw.bind(this);
  }

  /**
   * Показывает предстартовый отсчет
   */
  async start() {
    const pre: string[] = ["3", "2", "1", "GO!"];
    for (this.text of pre) {
      this.startTimestamp = performance.now();
      await this.animate();
    }
  }

  /**
   * Начальные данные для отрисовки предстартового отсчета
   */
  animate(): Promise<number> {
    this.opacity = 1;
    this.scale = 0;
    this.process = 0;
    this.id = window.requestAnimationFrame(this.draw);
    return new Promise((resolve) => setTimeout(() => resolve(1), 1000));
  }

  /**
   * отрисовка отсчета в canvas
   */
  draw() {
    this.context.textBaseline = "middle";
    this.context.textAlign = "center";
    this.context.clearRect(0, 0, this.board.width, this.board.height);
    this.context.font = `${5 * this.scale}rem Khula sans-serif`;
    this.context.fillStyle = `rgba(255,255,255,${this.opacity})`;
    this.context.fillText(this.text, this.board.width / 2, this.board.height / 2);
    this.process = (performance.now() - this.startTimestamp) * 100 / this.duration;
    if (this.process < 100 / 3) this.scale = this.process / 11;
    if (this.process >= 100 / 3 && this.process <= 2 * 100 / 3) this.opacity = .5 * 66 / this.process;
    if (this.process > 2 * 100 / 3) {
      this.scale = 50 - ((50 - 3) / (100 - 66)) * (100 - this.process);
      this.opacity = 1 - this.process / 100;
    }
    if (this.process < 100) {
      window.requestAnimationFrame(this.draw);
    } else {
      this.context.clearRect(0, 0, this.board.width, this.board.height);
      window.cancelAnimationFrame(this.id);
    }
  }

}