import { createRecordStatistic, fillTable, overlay, statisticRecordType } from "./utils";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

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
export const realtime = getDatabase(app);
const dbRef = ref(realtime, "aim-statistic");


const globalStatisticTable = document.querySelector(".global-games.statistic-board").querySelector("tbody");
const congratulationWindow = document.querySelector(".congratulation.screen-popup");
const inputName: HTMLInputElement = congratulationWindow.querySelector(".top-name");
const infoBlock: HTMLElement = congratulationWindow.querySelector(".info");
const refusalBlock: HTMLElement = congratulationWindow.querySelector(".refusal");
const setSpinner: HTMLElement = congratulationWindow.querySelector(".waiting");
const doneBlock: HTMLElement = congratulationWindow.querySelector(".done");
const placeInfo = congratulationWindow.querySelector(".place");
const bucket: HTMLInputElement = document.querySelector(".bucket");

let agreement: boolean, index: number, currentScore: number;
let globalStatistic: statisticRecordType[];
inputName.addEventListener("input", nameIsEmpty);
congratulationWindow.addEventListener("click", getConsent);
document.addEventListener("DOMContentLoaded", getGlobalStatistic);

/**
 * Поиск места в глобальном рейтинге
 * @param score{Number} кол-во набранных очков
 */
export function findGlobalPlace(score: number): void {
  if (globalStatistic.length === 0) return;
  currentScore = score;
  index = globalStatistic.findIndex(el => el.score < currentScore);
  if (index > -1) showCongratulation(index + 1);
}

/**
 * Проверяет заполенено ли поле
 */
function nameIsEmpty(): void {
  let value = inputName.value.trim();
  let submitButton = congratulationWindow.querySelector(`.agree-btn[data-agree="true"]`);
  submitButton.classList.toggle("disabled", value.length === 0);
}

/**
 * Сохраняет/обновляет глобальную статистику и обновляет глобальную таблицу
 * @param player{String} Имя игрока для записи
 * @returns {Promise<void>} результат записи
 */
async function setGlobalStatistic(player: string): Promise<void> {
  globalStatistic.splice(index, 0, createRecordStatistic(currentScore, player));
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
function showCongratulation(place: number): void {
  placeInfo.innerHTML = `${place}`;
  overlay.classList.add("open");
  congratulationWindow.classList.add("open");
}

/**
 * Закрытие окна с поздравлениями
 */
function hideCongratulation(): void {
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
 */
export function getGlobalStatistic(): void {
  onValue(dbRef, snapshot => {
    globalStatistic = snapshot.val();
    if (globalStatistic.length) fillTable(globalStatisticTable, globalStatistic);
  });
}

/**
 * Предложение игроку оставить записать свой результат в таблицу лидеров
 * @param e{Event} событие клика
 */
async function getConsent(e: Event) {
  let bucketValue: string = bucket.value;
  let target = e.target as HTMLElement;
  if (bucketValue.length > 0) return;
  if (!target.classList.contains("agree-btn")) return;
  agreement = target.getAttribute("data-agree") === "true";
  const player: string = inputName.value.trim();
  if (agreement && player.length > 0) {
    await setGlobalStatistic(player);
    infoBlock.style.display = "none";
    setSpinner.style.display = "block ";
  } else {
    setTimeout(hideCongratulation, 1000);
    infoBlock.style.display = "none";
    refusalBlock.style.display = "block";
  }
}