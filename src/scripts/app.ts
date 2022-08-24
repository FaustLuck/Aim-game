import { calculateScore, overlay } from "./utils";
import { /*addRandomCircle,*/ moveMiniCircle, timerCircle } from "./circle";
import { setLocalStatistic } from "./localStatistic";
import { findGlobalPlace } from "./globalStatistic";
import firebase from "firebase/compat";

const startButton = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const settingsButtons = document.querySelector(".settings");
const timeEl = document.querySelector("#time");
const board: HTMLCanvasElement = document.querySelector("#board");
const warning = document.querySelector(".screen-popup.warning");

let time: number;
let difficult: string;
let score: number = 0;
let i: number;
let timer: number, preTimer: number;

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
    startGame();
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
  i = 0;
  score = 0;
  screens[1].classList.add("up");
  ({ width: board.width, height: board.height } = board.getBoundingClientRect());
  let context = board.getContext("2d");
  difficult = document.querySelector(".difficult-btn.selected")?.getAttribute("data-difficult");
  time = +document.querySelector(".time-btn.selected")?.getAttribute("data-time");
  let parentNode: HTMLElement = timeEl.parentNode as HTMLElement;
  parentNode.classList.remove("hide");
  preTimer = window.setTimeout(preTimerShow, 1000, context);

  // i = 0; -
  // score = 0; -
  // screens[1].classList.add("up"); -
  // board.innerHTML = ""; -
  // difficult = document.querySelector(".difficult-btn.selected")?.getAttribute("data-difficult") || "easy"; -
  // time = +document.querySelector(".time-btn.selected")?.getAttribute("data-time") || 30; -
  // let parentNode: HTMLElement = timeEl.parentNode as HTMLElement;
  // parentNode.classList.remove("hide");
  // preTimer = window.setTimeout(preTimerShow, 1000);
}

/**
 * Показывает предстартовый отсчет
 */
function preTimerShow(ctx: CanvasRenderingContext2D): void {
  const pre: string[] = ["3", "2", "1", "GO!"];
  let i = 0;
  // animatePreTimer(ctx, pre[i], 5);
  animatePreTimer({
    duration: 1000,
    timing: function (process: number) {
      return process;
    },
    draw: drawPreTimer(ctx, pre[i])
  });
}


function animatePreTimer({ duration, drawPreTimer, timing }:any) {
  let start = performance.now();

  let id = requestAnimationFrame(function animatePreTimer(time) {
    let process = (time - start)*100 / duration;

    let progress = timing(process);

    drawPreTimer(progress);
    if (process < 100) {
      requestAnimationFrame(animatePreTimer);
    }
  });
}


function drawPreTimer(ctx: CanvasRenderingContext2D, text: string) {
  let opacity = 1;
  let textSize = 5;
  let scale = 0;

  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.clearRect(0, 0, board.width, board.height);
    ctx.font = `${textSize * scale}rem Khula sans-serif`;
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx.fillText(text, board.width / 2, board.height / 2);



}


// function animatePreTimer(ctx: CanvasRenderingContext2D, text: string, duration: number): void {
//   let start = performance.now();
//   let opacity = 1;
//   let textSize = 5;
//   let scale = 0;
//
//   ctx.textBaseline = "middle";
//   ctx.textAlign = "center";

//   function draw() {
//     ctx.clearRect(0, 0, board.width, board.height);
//     ctx.font = `${textSize * scale}rem Khula sans-serif`;
//     ctx.fillStyle = `rgba(255,255,255,${opacity})`;
//     ctx.fillText(text, board.width / 2, board.height / 2);
//     function animationProcess() {
//       return (performance.now() - start) / duration;
//     }
//     let process = animationProcess();
//     if (process < 34) scale = process / 11;
//     if (process >= 34 && process < 67) opacity = .5 * 66 / process;
//     if (process >= 67) {
//       scale = 50 - ((50 - 3) / (100 - 66)) * (100 - process);
//       opacity = 1 - process / 100;
//     }
//     if (process < 100) {
//       window.requestAnimationFrame(draw);
//     } else {
//       ctx.clearRect(0, 0, board.width, board.height);
//     }
//   }
//
//   draw();
// }

/**
 * Уменьшает счетчик времени на 1, если время истекло, завершает игры
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

