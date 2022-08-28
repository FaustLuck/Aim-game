import { calculateScore, overlay } from "./utils";
import { Circle, MiniCircle } from "./circle";
import { setLocalStatistic } from "./localStatistic";
import { findGlobalPlace } from "./globalStatistic";
// import { PreTimer } from "./preTimer";


const startButton = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const settingsButtons = document.querySelector(".settings");
const timeEl = document.querySelector("#time");
const board: HTMLCanvasElement = document.querySelector("#board");
const warningWindow = document.querySelector(".screen-popup.warning");

let time: number;
let difficult: string;
let score: number = 0;
let timer: number;
let circle: Circle;
let miniCircles: MiniCircle[] = [];

startButton.addEventListener("click", e => {
  e.preventDefault();
  screens[0].classList.add("up");
});
settingsButtons.addEventListener("click", saveSettings);
board.addEventListener("click", clickOnCircle);
document.querySelector(".warning-btn").addEventListener("click", closeWarning);
document.addEventListener("click", closePopup);

/**
 * Закрывает модальное окно
 * @param e{Event} событие клика
 */
function closePopup(e: Event): void {
  let target: HTMLElement = e.target as HTMLElement;
  if (!target.classList.contains("screen-popup")) return;
  if (!target.classList.contains("open")) return;
  target.classList.remove("open");
  let ledge: Element | null = target.querySelector(".ledge") || null;
  overlay.classList.remove("open");
  if (ledge) ledge.classList.remove("hide");
}

/**
 * Визуально отмечает какие настройки выбрал игрок
 * @param e{Event}клик по кнопкам
 */
function saveSettings(e: Event): void {
  let target: HTMLElement = e.target as HTMLElement;
  if (target.classList.contains("difficult-btn")) {
    settingsButtons.querySelectorAll(".difficult-btn").forEach(el => el.classList.remove("selected"));
    target.classList.add("selected");
    if (target.getAttribute("data-difficult") === "nightmare") showWarning();
  }
  if (target.classList.contains("time-btn")) {
    settingsButtons.querySelectorAll(".time-btn").forEach(el => el.classList.remove("selected"));
    target.classList.add("selected");
  }
  if (target.classList.contains("start-btn")) {
    score = 0;
    screens[1].classList.add("up");
    screens[1].addEventListener("transitionend", startGame);
  }
}

/**
 * Проверка координат клика
 * @param clickCoords  {x: number, y: number} координаты клика мышью
 * @return
 */
function checkClick(clickCoords: { x: number, y: number }): boolean {
  let { x, y, radius } = circle.getInfo();
  return (clickCoords.x - x) ** 2 + (clickCoords.y - y) ** 2 <= radius ** 2;
}

/**
 * "Лопает" нажатый круг
 * @param e{Event} клик на круге
 */
function clickOnCircle(e: MouseEvent): void {
  if (!circle) return;
  let { left, top } = board.getBoundingClientRect();
  let clickCoords = { x: e.x - left, y: e.y - top };
  if (!checkClick(clickCoords)) return;
  score++;
  let { x, y, radius } = circle.getInfo();
  circle.clear();
  if (difficult !== "nightmare") {
    for (let i = 0; i < 10; i++) {
      let miniCircle = new MiniCircle(board, x, y, radius, difficult);
      miniCircles.push(miniCircle);
      miniCircle.animate();
    }
  }
  circle = new Circle(difficult, board);
  circle.animate();
}

/**
 * На основании выбранных настроек начинает игру
 */
function startGame(): void {
  if (!screens[1].classList.contains("up")) return;
  clearBoard();
  ({ width: board.width, height: board.height } = board.getBoundingClientRect());
  difficult = document.querySelector(".difficult-btn.selected")?.getAttribute("data-difficult");
  time = +document.querySelector(".time-btn.selected")?.getAttribute("data-time");
  let parentNode: HTMLElement = timeEl.parentNode as HTMLHeadingElement;
  parentNode.classList.remove("hide");

  /*
   let preTimer = new PreTimer(board).start();
    preTimer.then(() => {
      circle = new Circle(difficult, board);
      circle.draw()

    });
    */
  // todo ^^ вернуть на место. вызов отсчета перед стартом. вызов отрисовки кругов
  setTime(time);
  circle = new Circle(difficult, board);
  circle.animate();
  timer = window.setInterval(decreaseTime, 1000);
}


/**
 * Уменьшает счетчик времени на 1, если время истекло, завершает игру
 */
function decreaseTime(): void {
  time ? setTime(--time) : finishGame();
}

/**
 * Вывод оставшегося времени над доской
 * @param value{Number} оставшееся время в секундах
 */
function setTime(value: number): void {
  let minute: string = `${Math.floor(value / 60)}`.padStart(2, "0");
  let second: string = `${Math.floor(value % 60)}`.padStart(2, "0");
  timeEl.innerHTML = `${minute}:${second}`;
}

/**
 * Завершение игры и возврат на экран настроек
 */
function finishGame(): void {
  clearInterval(timer);
  circle.clear();
  circle = null;
  miniCircles = miniCircles.map(miniCircle => {
    miniCircle.clear();
    return null;
  });
  miniCircles.length = 0;
  clearBoard();
  let parentNode: HTMLElement = timeEl.parentNode as HTMLHeadingElement;
  parentNode.classList.add("hide");
  showScore();
  let timeStart: number = +document.querySelector(".time-btn.selected")?.getAttribute("data-time");
  let points: number = calculateScore(score, difficult, timeStart);
  setLocalStatistic(points);
  findGlobalPlace(points);
  setTimeout(() => {
    screens[1].classList.remove("up");
  }, 1500);
}

function clearBoard() {
  let context = board.getContext("2d");
  context.clearRect(0, 0, board.width, board.height);
}


function showScore() {
  clearBoard();
  let context = board.getContext("2d");
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `7rem Khula sans-serif`;
  context.fillStyle = `#16D9E3`;
  let text = `Счет: ${score}`;
  context.fillText(text, board.width / 2, board.height / 2);
}

/**
 * Показать предупреждение при выборе уровня сложности "Кошмар"
 */
function showWarning(): void {
  const agreementWithNightmare: string = window.localStorage.getItem("agreementWithNightmare");
  if (agreementWithNightmare === "true") return;
  overlay.classList.add("open");
  warningWindow.classList.add("open");
}

/**
 * Закрыть предупреждение при выборе уровня сложности "Кошмар"
 * сохранить согласие об этом в LocalStorage
 */
function closeWarning(): void {
  overlay.classList.remove("open");
  warningWindow.classList.remove("open");
  window.localStorage.setItem("agreementWithNightmare", "true");
}


