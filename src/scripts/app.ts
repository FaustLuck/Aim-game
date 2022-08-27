import { calculateScore, overlay } from "./utils";
import { moveMiniCircle, timerCircle } from "./circle";
import { setLocalStatistic } from "./localStatistic";
import { findGlobalPlace } from "./globalStatistic";
import { PreTimer } from "./preTimer";


const startButton = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const settingsButtons = document.querySelector(".settings");
const timeEl = document.querySelector("#time");
const board: HTMLCanvasElement = document.querySelector("#board");
const warning = document.querySelector(".screen-popup.warning");

let time: number;
let difficult: string;
let score: number = 0;
let timer: number;

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
  let target: Element = e.target as Element;
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
 * "Лопает" нажатый круг
 * @param e{Event} клик на круге
 */
function clickOnCircle(e: Event): void {
  let target: HTMLElement = e.target as HTMLElement;
  if (!target.classList.contains("circle")) return;
  score++;
  let id = target.getAttribute("data-id");
  target.remove();
  if (difficult !== "nightmare") {
    let miniBoards = board.querySelectorAll(`.mini-board[data-id="${id}"]`);
    let miniCircles: NodeListOf<HTMLDivElement> = board.querySelectorAll(`.circle.mini[data-id="${id}"]`);
    miniBoards.forEach(el => el.classList.add("show"));
    miniCircles.forEach(el => {
      moveMiniCircle(el);
      el.addEventListener("transitionend", () => {
        let parentNode: HTMLElement = el.parentNode as HTMLElement;
        parentNode.remove();
      });
    });
  }
  // addRandomCircle(board, difficult);
}

/**
 * На основании выбранных настроек начинает игру
 */
function startGame(): void {
  ({ width: board.width, height: board.height } = board.getBoundingClientRect());
  difficult = document.querySelector(".difficult-btn.selected")?.getAttribute("data-difficult");
  time = +document.querySelector(".time-btn.selected")?.getAttribute("data-time");
  let parentNode: HTMLElement = timeEl.parentNode as HTMLElement;
  parentNode.classList.remove("hide");
  let preTimer = new PreTimer(board).start();
  preTimer.then(()=>{});
  // console.log('OK')
}




/**
 * Уменьшает счетчик времени на 1, если время истекло, завершает игру
 */
// function decreaseTime(): void {
//   time ? setTime(--time) : finishGame();
// }

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
  clearTimeout(timerCircle);
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
  let parentNode: HTMLElement = timeEl.parentNode as HTMLElement;
  parentNode.classList.add("hide");
  let time: number = +document.querySelector(".time-btn.selected")?.getAttribute("data-time");
  let points: number = calculateScore(score, difficult, time);
  setLocalStatistic(points);
  findGlobalPlace(points);
  setTimeout(() => {
    screens[1].classList.remove("up");
  }, 1500);
}

/**
 * Показать предупреждение при выборе уровня сложности "Кошмар"
 */
function showWarning(): void {
  const agreementWithNightmare: string = window.localStorage.getItem("agreementWithNightmare");
  if (agreementWithNightmare === "true") return;
  overlay.classList.add("open");
  warning.classList.add("open");
}

/**
 * Закрыть предупреждение при выборе уровня сложности "Кошмар"
 * сохранить согласие об этом в LocalStorage
 */
function closeWarning(): void {
  overlay.classList.remove("open");
  warning.classList.remove("open");
  window.localStorage.setItem("agreementWithNightmare", "true");
}

