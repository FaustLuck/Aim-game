import { fillTable, overlay } from "./utils.ts";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
//todo ts 131
const firebaseConfig = {
  apiKey: "AIzaSyCukmuh4VplvLpM3XQzlkGCuyGgX7x2y18",
  authDomain: "grastor-messagestorage.firebaseapp.com",
  databaseURL: "https://grastor-messagestorage-default-rtdb.firebaseio.com",
  projectId: "grastor-messagestorage",
  storageBucket: "grastor-messagestorage.appspot.com",
  messagingSenderId: "189811633204",
  appId: "1:189811633204:web:cddbbdee2964375bd86e61",
  measurementId: "G-G4SXGQZLE1"
};

const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);
const dbRef = ref(realtime, "aim-statistic");


const globalStatisticTable = document.querySelector(".global-games.statistic-board").querySelector("tbody");
const congratulationWindow = document.querySelector(".congratulation.screen-popup");
const inputName = congratulationWindow.querySelector(".top-name");
const infoBlock = congratulationWindow.querySelector(".info");
const refusalBlock = congratulationWindow.querySelector(".refusal");
const setSpinner = congratulationWindow.querySelector(".waiting");
const doneBlock = congratulationWindow.querySelector(".done");
const placeInfo = congratulationWindow.querySelector(".place");

let agreement, index, currentScore;
let globalStatistic;
inputName.addEventListener("input", nameIsEmpty);
document.addEventListener("DOMContentLoaded", getGlobalStatistic);

/**
 * Поиск места в глобальном рейтинге
 * @param score{Number} кол-во набранных очков
 */
export function findGlobalPlace(score) {
  if (globalStatistic.length === 0) return;
  currentScore = score;
  index = globalStatistic.findIndex(el => el.score < currentScore);
  if (index > -1) showCongratulation(index + 1);
}

/**
 * Проверяет заполенено ли поле
 */
function nameIsEmpty() {
  let value = inputName.value.trim();
  let submitButton = congratulationWindow.querySelector(`.agree-btn[data-agree="true"]`);
  submitButton.classList.toggle("disabled", value.length === 0);
  (value.length) ?
    congratulationWindow.addEventListener("click", getConsent) :
    congratulationWindow.removeEventListener("click", getConsent);
}

/**
 * Сохраняет/обновляет глобальную статистику и обновляет глобальную таблицу
 * @param player{String} Имя игрока для записи
 * @returns {Promise<void>} результат записи
 */
async function setGlobalStatistic(player) {
  globalStatistic.splice(index, 0, {
    date: Date.now(),
    player,
    score: currentScore
  });
  if (globalStatistic.length > 10) --globalStatistic.length;
  set(dbRef, globalStatistic).then(() => {
    setSpinner.style.display = "none";
    doneBlock.style.display = "block";
    setTimeout(hideCongratulation, 1000);
    fillTable(globalStatisticTable, globalStatistic);
  });
}

/**
 * Открытие окна с поздравлениями
 * @param place{Number} место в глобальном
 */
function showCongratulation(place) {
  placeInfo.innerHTML = `${ place }`;
  overlay.classList.add("open");
  congratulationWindow.classList.add("open");
}

/**
 * Закрытие окна с поздравлениями
 */
function hideCongratulation() {
  overlay.classList.remove("open");
  congratulationWindow.classList.remove("open");
  congratulationWindow.addEventListener("transitionend", () => {
    refusalBlock.style.display = "none";
    doneBlock.style.display = "none";
    infoBlock.style.display = "block";
  });
}

/**
 * Запрос данных в firebase-database
 * @returns {Promise<void>} глобальная статистика
 */
export function getGlobalStatistic() {
  onValue(dbRef, snapshot => {
    globalStatistic = snapshot.val();
    if (globalStatistic.length) fillTable(globalStatisticTable, globalStatistic);
  });
}

/**
 * Предложение игроку оставить записать свой результат в таблицу лидеров
 * @param e{Event} событие клика
 */
async function getConsent(e) {
  let bucketValue = document.querySelector(".bucket").value;
  if (!bucketValue) return;
  if (!e.target.classList.contains("agree-btn")) return;
  agreement = e.target.getAttribute("data-agree") === "true";
  const player = congratulationWindow.querySelector(".top-name").value.trim();
  if (agreement && player) {
    await setGlobalStatistic(player);
    infoBlock.style.display = "none";
    setSpinner.style.display = "block ";
  } else {
    setTimeout(hideCongratulation, 1000);
    infoBlock.style.display = "none";
    refusalBlock.style.display = "block";
  }
}