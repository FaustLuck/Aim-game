export const overlay: HTMLDivElement = document.querySelector(".overlay");
export type statisticRecordType = { date: number, score: number, player: string }

export const difficultSettings: {
  difficult: string, min: number, max: number, coefficient: number
}[] = [
  { difficult: "easy", min: 60, max: 80, coefficient: 1 },
  { difficult: "medium", min: 40, max: 60, coefficient: 3 },
  { difficult: "hard", min: 20, max: 40, coefficient: 6 },
  { difficult: "nightmare", min: 10, max: 15, coefficient: 10 }
];

/**
 * Преобразование таймстампа к дате
 * @param timestamp {Number}
 * @returns {string} дата вида ДД.ММ.ГГГГ
 */
export function prepareDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString("ru-RU").split(",")[0];
}

/**
 * Заполнение таблицы данными
 * @param table {HTMLElement} целевая таблица
 * @param statistic {Object[]} данные
 */
export function fillTable(table: HTMLTableSectionElement, statistic: statisticRecordType[]) {
  table.innerHTML = "";
  for (let item of statistic) {
    let tr = document.createElement("tr");
    if (item.player.length) {
      let tdPlayer = document.createElement("td");
      tdPlayer.innerHTML = item.player;
      tr.append(tdPlayer);
    }
    let tdScore = document.createElement("td");
    tdScore.innerHTML = `${item.score}`;
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
export function calculateScore(score: number, difficult: string, time: number): number {
  time = Math.floor(time / 10);
  let middleScore: number = +(score / time).toFixed(4);
  let index: number = difficultSettings.findIndex(el => el.difficult === difficult);
  let coefficient: number = difficultSettings[index].coefficient;
  return +(middleScore * coefficient).toFixed(2);
}

export function createRecordStatistic(score: number, player = ""): statisticRecordType {
  return {
    date: Date.now(),
    score,
    player
  };
}