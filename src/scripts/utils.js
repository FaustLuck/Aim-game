export const overlay = document.querySelector(".overlay");

/**
 * Преобразование таймстампа к дате
 * @param timestamp {Number}
 * @returns {string} дата вида ДД.ММ.ГГГГ
 */
export function prepareDate(timestamp) {
  return new Date(timestamp).toLocaleString("ru-RU").split(",")[0];
}

/**
 * Заполнение таблицы данными
 * @param table {HTMLElement} целевая таблица
 * @param statistic {Object[]} данные
 */
export function fillTable(table, statistic) {
  table.innerHTML = "";
  for (let item of statistic) {
    let tr = document.createElement("tr");
    if (item.hasOwnProperty("player")) {
      let tdPlayer = document.createElement("td");
      tdPlayer.innerHTML = item.player;
      tr.append(tdPlayer);
    }
    let tdScore = document.createElement("td");
    tdScore.innerHTML = item.score;
    tr.append(tdScore);
    let tdDate = document.createElement("td");
    tdDate.innerHTML = prepareDate(item.date);
    tr.append(tdDate);
    table.append(tr);
  }
}

/**
 * Рассчет очков в зависимости от сложности
 * @param score{Number} кол-во кликнутых кругов
 * @param difficult{String} уровень сложности
 * @param time{Number} кол-во секунд игры
 * @returns {number} набранные очки
 */
export function calculateScore(score, difficult, time) {
  time = Math.floor(time / 10);
  let middleScore = +(score / time).toFixed(4);
  switch (difficult) {
    case "easy":
      return +(middleScore).toFixed(2);
    case "medium":
      return +(middleScore * 3).toFixed(2);
    case "hard":
      return +(middleScore * 6).toFixed(2);
    case "nightmare":
      return +(middleScore * 10).toFixed(2);
  }
}