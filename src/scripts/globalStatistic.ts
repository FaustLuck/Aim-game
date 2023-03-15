import { createRecordStatistic, fillTable, overlay, statisticRecordType } from "./utils";

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
 * Проверяет заполнено ли поле
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
  const record = createRecordStatistic(currentScore, player);
  await updateStatistic(record);
  await getGlobalStatistic();
  doneBlock.style.display = "block";
  setSpinner.style.display = "none";
  setTimeout(hideCongratulation, 1000);
}

async function updateStatistic(record: statisticRecordType) {
  fetch("https://englishspace-1-g1233964.deta.app/aim/place", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(record)
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
 * Запрос данных из БД
 */
export async function getGlobalStatistic(): Promise<void> {
  const response = await fetch("https://englishspace-1-g1233964.deta.app/aim/statistic");
  if (response.ok) globalStatistic = await response.json();
  fillTable(globalStatisticTable, globalStatistic);
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
    infoBlock.style.display = "none";
    setSpinner.style.display = "block";
    await setGlobalStatistic(player);
  } else {
    setTimeout(hideCongratulation, 1000);
    infoBlock.style.display = "none";
    refusalBlock.style.display = "block";
  }
}