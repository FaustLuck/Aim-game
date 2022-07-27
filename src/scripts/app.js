import { addRandomCircle, moveMiniCircle, timerCircle } from "./circle.js";
import { setLocalStatistic } from "./localStatistic.js";
import { findGlobalPlace } from "./globalStatistic.js";
import { calculateScore, overlay } from "./utils.js";

const startButton = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const settingsButtons = document.querySelector(".settings");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const warning = document.querySelector(".screen-popup.warning");

let time = 30;
let difficult = "easy";
let score = 0;
let i;
let timer, preTimer;

startButton.addEventListener("click", e => {
  e.preventDefault();
  screens[0].classList.add("up");
});
settingsButtons.addEventListener("click", saveSettings);
board.addEventListener("click", clickOnCircle);
document.querySelector(".warning-btn").addEventListener("click", closeWarning);
document.addEventListener("click", closePopup);

function closePopup(e) {
  if (!e.target.classList.contains("screen-popup")) return;
  if (!e.target.classList.contains("open")) return;
  e.target.classList.remove("open");
  let ledge = e.target.querySelector(".ledge") || null;
  overlay.classList.remove("open");
  if (ledge) ledge.classList.remove("hide");
}

/**
 * Визульно отмечает какие настройки выбрал игрок
 * @param e{Event}клик по кнопкам
 */
function saveSettings(e) {
  if (e.target.classList.contains("difficult-btn")) {
    settingsButtons.querySelectorAll(".difficult-btn").forEach(el => el.classList.remove("selected"));
    e.target.classList.add("selected");
    if (e.target.getAttribute("data-difficult") === "nightmare") showWarning();
  }
  if (e.target.classList.contains("time-btn")) {
    settingsButtons.querySelectorAll(".time-btn").forEach(el => el.classList.remove("selected"));
    e.target.classList.add("selected");
  }
  if (e.target.classList.contains("start-btn")) {
    startGame();
  }
}

/**
 * "Лопает" нажатый круг
 * @param e{Event} клик на круге
 */
function clickOnCircle(e) {
  if (!e.target.classList.contains("circle")) return;
  score++;
  let id = e.target.getAttribute("data-id");
  e.target.remove();
  if (difficult !== "nightmare") {
    let miniBoards = board.querySelectorAll(`.mini-board[data-id="${ id }"]`);
    let miniCircles = board.querySelectorAll(`.circle.mini[data-id="${ id }"]`);
    miniBoards.forEach(el => el.classList.add("show"));
    miniCircles.forEach(el => {
      moveMiniCircle(el);
      el.addEventListener("transitionend", () => {
        el.parentNode.remove();
      });
    });
  }
  addRandomCircle(board, difficult);
}

/**
 * На основании выбранных настроек начинает игру
 */
function startGame() {
  i = 0;
  score = 0;
  screens[1].classList.add("up");
  board.innerHTML = "";
  difficult = document.querySelector(".difficult-btn.selected")?.getAttribute("data-difficult") || "easy";
  time = +document.querySelector(".time-btn.selected")?.getAttribute("data-time") || 30;
  timeEl.parentNode.classList.remove("hide");
  preTimer = setTimeout(preTimerShow, 1000);
}

/**
 * Показывает предстартовых отсчет
 */
function preTimerShow() {
  const pre = ["3", "2", "1", "GO!"];
  let div = document.createElement("div");
  div.classList.add("pre-timer");
  div.innerHTML = pre[i];
  board.append(div);
  div.classList.add("go");
  div.addEventListener("animationend", () => {
    board.innerHTML = "";
    ++i;
    if (i < pre.length) {
      console.log(i)
      console.log(i)
      preTimer = setTimeout(preTimerShow, 1000);
    } else {
      clearTimeout(preTimer);
      timer = setInterval(decreaseTime, 1000);
      addRandomCircle(board, difficult);
      setTime(time);
    }

  });

}

/**
 * Уменьшает счетчик времени на 1, если время истекло, завершает игры
 */
function decreaseTime() {
  time ? setTime(--time) : finishGame();
}

/**
 * Вывод оставшегося времени на доской
 * @param value{Number} оставшееся время в секундах
 */
function setTime(value) {
  let minute = `${ Math.floor(value / 60) }`.padStart(2, "0");
  let second = `${ Math.floor(value % 60) }`.padStart(2, "0");
  timeEl.innerHTML = `${ minute }:${ second }`;
}

/**
 * Завершение игры и возврат на экран настроек
 */
function finishGame() {
  clearInterval(timer);
  clearTimeout(timerCircle);
  board.innerHTML = `<h1>Счет: <span class="primary">${ score }</span></h1>`;
  timeEl.parentNode.classList.add("hide");
  let time = +document.querySelector(".time-btn.selected")?.getAttribute("data-time");
  let points = calculateScore(score, difficult, time);
  setLocalStatistic(points);
  findGlobalPlace(points);
  setTimeout(() => {
    screens[1].classList.remove("up");
  }, 1500);
}

/**
 * Показать предупреждение при выборе уровня сложности "Кошмар"
 */
function showWarning() {
  const agreementWithNightmare = window.localStorage.getItem("agreementWithNightmare");
  if (agreementWithNightmare === "true") return;
  overlay.classList.add("open");
  warning.classList.add("open");
}

/**
 * Закрыть предупреждение при выборе уровня сложности "Кошмар"
 * сохранить согласие об этом в LocalStorage
 */
function closeWarning() {
  overlay.classList.remove("open");
  warning.classList.remove("open");
  window.localStorage.setItem("agreementWithNightmare", "true");
}