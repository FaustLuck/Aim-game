import { calculateScore, difficultSettings, getRandomNumber, overlay } from "./utils";
import { Circle, MiniCircle } from "./circle";
import { setLocalStatistic } from "./localStatistic";
import { findGlobalPlace } from "./globalStatistic";
import { PreTimer } from "./preTimer";

const startButton = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const settingsButtons = document.querySelector(".settings");
const timeEl = document.querySelector("#time");
const board: HTMLCanvasElement = document.querySelector("#board");
const warningWindow = document.querySelector(".screen-popup.warning");

const context = board.getContext("2d");

let time: number;
let difficult: string;
let score: number = 0;
let timer: number;
let circles: (Circle | MiniCircle)[] = [];
let circleTimer: number;

startButton.addEventListener("click", e => {
  e.preventDefault();
  screens[0].classList.add("up");
});
settingsButtons.addEventListener("click", saveSettings);
board.addEventListener("pointerdown", clickOnCircle);
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
    setTimeout(startGame, 1000);
  }
}

/**
 * Проверка координат клика
 * @param clickCoords  {x: number, y: number} координаты клика мышью
 * @param circle {Circle} проверяемый круг
 * @return
 */
function checkClick(clickCoords: { x: number, y: number }, circle: Circle): boolean {
  let { x, y, radius } = circle.getInfo();
  return (clickCoords.x - x) ** 2 + (clickCoords.y - y) ** 2 <= radius ** 2;
}

/**
 * "Лопает" нажатый круг
 * @param e{Event} клик на круге
 */
function clickOnCircle(e: PointerEvent): void {
  if (!circles.length) return;
  const index = circles.findIndex(c => c.constructor.name === "Circle");
  const circle = circles[index];
  let { left, top } = board.getBoundingClientRect();
  let clickCoords = { x: e.clientX - left, y: e.clientY - top };
  if (!checkClick(clickCoords, circle)) return;
  score++;
  circles.splice(index, 1);
  let { x, y, radius } = circle.getInfo();
  if (difficult !== "nightmare") {
    let { min, max } = difficultSettings.find(el => el.difficult === difficult);
    max = Math.round(max / 3);
    min = Math.round(min / 3);
    let count = getRandomNumber(min, max);
    for (let i = 0; i <= count; i++) {
      let miniCircle = new MiniCircle(board, x, y, radius, difficult);
      circles.push(miniCircle);
    }
  }

  createCircle();
}

function createCircle() {
  const circle = new Circle(difficult, board);
  circles.push(circle);
  if (difficult === "nightmare") {
    window.clearTimeout(circleTimer);
    circleTimer = window.setTimeout(() => {
      circles = circles.filter(c => c.constructor.name === "MiniCircles");
      createCircle();
    }, 1500);
  }
}

/**
 * На основании выбранных настроек начинает игру
 */
function startGame(): void {
  context.clearRect(0, 0, board.width, board.height);
  ({ width: board.width, height: board.height } = board.getBoundingClientRect());
  difficult = document.querySelector(".difficult-btn.selected")?.getAttribute("data-difficult");
  time = +document.querySelector(".time-btn.selected")?.getAttribute("data-time");
  let parentNode: HTMLElement = timeEl.parentNode as HTMLHeadingElement;
  parentNode.classList.remove("hide");
  let preTimer = new PreTimer(board).start();
  preTimer.then(() => {
    setTime(time);
    createCircle();
    requestAnimationFrame(animate);
    timer = window.setInterval(decreaseTime, 1000);
  });
}

/**
 * Анимирование холста
 */
function animate(): void {
  if (circles.length) requestAnimationFrame(animate);
  context.clearRect(0, 0, board.width, board.height);
  circles = circles.filter(c => {
    c.draw();
    const { radius } = c.getInfo();
    return radius > 0;
  });
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
  circles.length = 0;
  context.clearRect(0, 0, board.width, board.height);
  let parentNode: HTMLElement = timeEl.parentNode as HTMLHeadingElement;
  parentNode.classList.add("hide");
  setTimeout(showScore, 0);
  let timeStart: number = +document.querySelector(".time-btn.selected")?.getAttribute("data-time");
  let points: number = calculateScore(score, difficult, timeStart);
  setLocalStatistic(points);
  findGlobalPlace(points);
  setTimeout(() => {
    screens[1].classList.remove("up");
  }, 1500);
}

/**
 * Отображение счета
 */
function showScore() {
  context.clearRect(0, 0, board.width, board.height);
  context.textBaseline = "middle";
  context.textAlign = "center";
  let size: number = 7;
  if (window.matchMedia("screen and (max-width: 768px)").matches) size = 4;
  context.font = `${size}rem Khula sans-serif`;
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


