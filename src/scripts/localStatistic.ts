import { createRecordStatistic, fillTable, prepareDate, statisticRecordType } from "./utils";

let lastGames: statisticRecordType[];
let topRecord: statisticRecordType;

const topRecordInfo: HTMLElement = document.querySelector(".top-record");
const localStatisticTable: HTMLTableSectionElement = document.querySelector(".local-games").querySelector("tbody");

/**
 * Сохранение данных в localStorage
 * @param score{Number} набранные очки
 */
export function setLocalStatistic(score: number): void {
  let currentGameStatistic: statisticRecordType = createRecordStatistic(score);
  setLocalStory(currentGameStatistic);
  setLocalTopScore(currentGameStatistic);
}

/**
 * Запрос данных из localStorage и заполнение таблицы локальной статистики
 */
export function getLocalStatistic(): void {
  getLocalStory();
  getLocalTopScore();
  document.querySelector(".local-games-full").classList.toggle("hide", !topRecord?.date);
  document.querySelector(".local-games-empty").classList.toggle("hide", Boolean(topRecord?.date));
  if (!topRecord) return;
  fillTopLocalScore();
  fillTable(localStatisticTable, lastGames);
}

/**
 * Запрос из localStorage и парсинг данных последних 10 игр
 */
function getLocalStory(): void {
  let lastGamesJSON = window.localStorage.getItem("lastGames");
  lastGames = JSON.parse(lastGamesJSON) || [];
}

/**
 * Сохранение/обновление в localStorage данных последних 10 игр
 * @param currentGameStatistic{statisticRecordType} статистика текущей игры
 */
function setLocalStory(currentGameStatistic: statisticRecordType): void {
  getLocalStory();
  lastGames.push(currentGameStatistic);
  while (lastGames.length > 10) {
    lastGames.shift();
  }
  window.localStorage.setItem("lastGames", JSON.stringify(lastGames));
}

/**
 * Запрос из localStorage данные о лучшей игре
 */
function getLocalTopScore(): void {
  let topRecordJSON = window.localStorage.getItem("topRecord");
  topRecord = JSON.parse(topRecordJSON);
}

/**
 * Сохранение/обновление в localStorage данных о лучшей игре
 * @param currentGameStatistic{statisticRecordType} статистика текущей игры
 */
function setLocalTopScore(currentGameStatistic: statisticRecordType): void {
  console.log("top", topRecord);
  console.log("current", currentGameStatistic.score);
  console.log(topRecord.score < currentGameStatistic.score);
  if (!topRecord?.score || topRecord.score < currentGameStatistic.score) {
    topRecord = currentGameStatistic;
    window.localStorage.setItem("topRecord", JSON.stringify(topRecord));
  }
}

/**+
 * Заполнение поля лучшей локальной игры
 */
function fillTopLocalScore(): void {
  topRecordInfo.querySelector(".top-score").innerHTML = `${topRecord.score}`;
  topRecordInfo.querySelector(".top-date").innerHTML = prepareDate(topRecord.date);
}

getLocalStatistic();