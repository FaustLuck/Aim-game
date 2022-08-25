export default {
  /**
   * Показывает предстартовый отсчет
   * @param board - canvas эл-т
   * @param context - 2d контекст
   */
  async start(board: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const pre: string[] = ["3", "2", "1", "GO!"];
    for (const timerString of pre) {
      await this.animate(timerString, performance.now(), 1000, board, context);
    }
  },
  /**
   * Начальные данные для отрисовки предстартового отсчета
   * @param text - рисуемый текст
   * @param start - таймстамп начала анимации
   * @param duration - продолжительность анимации
   * @param board - canvas эл-т
   * @param context - 2d контекст
   */
  animate(text: string, start: number, duration: number, board: HTMLCanvasElement, context: CanvasRenderingContext2D): Promise<number> {
    let opacity = 1;
    let scale = 0;
    let process = 0;
    let id = window.requestAnimationFrame(draw);

    /**
     * отрисовка отсчета в canvas
     */
    function draw() {
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.clearRect(0, 0, board.width, board.height);
      context.font = `${5 * scale}rem Khula sans-serif`;
      context.fillStyle = `rgba(255,255,255,${opacity})`;
      context.fillText(text, board.width / 2, board.height / 2);
      process = (performance.now() - start) * 100 / duration;
      if (process < 100 / 3) scale = process / 11;
      if (process >= 100 / 3 && process <= 2 * 100 / 3) opacity = .5 * 66 / process;
      if (process > 2 * 100 / 3) {
        scale = 50 - ((50 - 3) / (100 - 66)) * (100 - process);
        opacity = 1 - process / 100;
      }
      if (process < 100) {
        window.requestAnimationFrame(draw);
      } else {
        context.clearRect(0, 0, board.width, board.height);
        window.cancelAnimationFrame(id);
      }
    }

    return new Promise((resolve) => setTimeout(() => resolve(1), 1000));
  }

};