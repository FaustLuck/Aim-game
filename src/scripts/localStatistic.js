import { fillTable, prepareDate } from "./utils.js";

let lastGames;
let topRecord;

const topRecordInfo = document.querySelector(".top-record");
const localStatisticTable = document.querySelector(".local-games").querySelector("tbody");

export function setLocalStatistic(score) {
  let date = Date.now();
  setTenLastGames({ date, score });
  setTopScore({ date, score });
}

export function getLocalStatistic() {
  getTenLastGames();
  getTopScore();
  fillTopLocalScore();
  fillTable(localStatisticTable, lastGames);
}

function getTenLastGames() {
  lastGames = window.localStorage.getItem("lastGames");
  lastGames = JSON.parse(lastGames) || [];
}

function setTenLastGames(currentGameStatistic) {
  getTenLastGames();
  lastGames.push(currentGameStatistic);
  while (lastGames.length > 10) {
    lastGames.shift();
  }
  window.localStorage.setItem("lastGames", JSON.stringify(lastGames));
}

function getTopScore() {
  topRecord = window.localStorage.getItem("topRecord");
  topRecord = JSON.parse(topRecord);
}

function setTopScore(currentGameStatistic) {
  if (!topRecord?.score || topRecord?.score < currentGameStatistic.score) {
    topRecord = currentGameStatistic;
    window.localStorage.setItem("topRecord", JSON.stringify(topRecord));
  }
}

function fillTopLocalScore() {
  topRecordInfo.querySelector(".top-score").innerHTML = topRecord.score;
  topRecordInfo.querySelector(".top-date").innerHTML = prepareDate(topRecord.date);
}
