import { fillTable, prepareDate } from "./utils.js";

let lastGames;
let topRecord;

const topRecordInfo = document.querySelector(".top-record");
const localStatisticTable = document.querySelector(".local-games").querySelector("tbody");

/**
 * Сохранение данных в localStorage
 * @param score{Number} набранные очки
 */
export function setLocalStatistic(score) {
  let date = Date.now();
  setTenLastGames({ date, score });
  setTopScore({ date, score });
}

/**
 * Запрос данных из localStorage и заполнение таблицы локальной статистики
 */
export function getLocalStatistic() {
  getTenLastGames();
  getTopScore();
  document.querySelector(".local-games-full").classList.toggle("hide", !topRecord);
  document.querySelector(".local-games-empty").classList.toggle("hide", topRecord);
  if (!topRecord) return;
  fillTopLocalScore();
  fillTable(localStatisticTable, lastGames);
}

/**
 * Запрос из localStorage и парсинг данных последних 10 игр
 */
function getTenLastGames() {
  lastGames = window.localStorage.getItem("lastGames");
  lastGames = JSON.parse(lastGames) || [];
}

/**
 * Сохрание/обновление в localStorage данных последних 10 игр
 * @param currentGameStatistic{{date:Number,score:Number}} статистика текущей игры
 */
function setTenLastGames(currentGameStatistic) {
  getTenLastGames();
  lastGames.push(currentGameStatistic);
  while (lastGames.length > 10) {
    lastGames.shift();
  }
  window.localStorage.setItem("lastGames", JSON.stringify(lastGames));
}

/**
 * Запрос из localStorage данные о лучшей игре
 */
function getTopScore() {
  topRecord = window.localStorage.getItem("topRecord");
  topRecord = JSON.parse(topRecord);
}

/**
 * Сохрание/обновление в localStorage данных о лучшей игре
 * @param currentGameStatistic{{date:Number,score:Number}} статистика текущей игры
 */
function setTopScore(currentGameStatistic) {
  if (!topRecord?.score || topRecord?.score < currentGameStatistic.score) {
    topRecord = currentGameStatistic;
    window.localStorage.setItem("topRecord", JSON.stringify(topRecord));
  }
}

/**+
 * Заполнение поля лучшей локальной игры
 */
function fillTopLocalScore() {
  topRecordInfo.querySelector(".top-score").innerHTML = topRecord.score;
  topRecordInfo.querySelector(".top-date").innerHTML = prepareDate(topRecord.date);
}
