export const overlay: HTMLDivElement = document.querySelector(".overlay");
export type statisticRecordType = { date: number, score: number, player: string }

export type difficultSettingsRecord = { difficult: string, min: number, max: number, coefficient: number }
export let difficultSettings: difficultSettingsRecord[];

export async function getSettings() {
  const response = await fetch("https://englishspace-1-g1233964.deta.app/aim/settings");
  if (response.ok) difficultSettings = await response.json();
}

/**
 * Преобразование таймштампа к дате
 * @param timestamp {Number}
 * @returns {string} дата вида ДД.ММ.ГГГГ
 */
export function prepareDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString("ru-RU").split(",")[0];
}

/**
 * Заполнение таблицы данными
 * @param table {HTMLTableSectionElement} целевая таблица
 * @param statistic {Object[]} данные
 */
export function fillTable(table: HTMLTableSectionElement, statistic: statisticRecordType[]): void {
  table.innerHTML = "";
  for (let item of statistic) {
    let tr = document.createElement("tr");
    if (item?.player && item.player.length) {
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

/**
 * Создает объект с данными текущей игры
 * @param score{Number} кол-во очков полученных за игру
 * @param player{String} имя игрока
 * @returns {statisticRecordType} данные текущей игры
 */
export function createRecordStatistic(score: number, player: string = ""): statisticRecordType {
  return {
    date: Date.now(),
    score,
    player
  };
}

/**
 * Возвращает случайное целое число из заданного интервала
 * @param min минимальное значение
 * @param max максимальное значение
 * @returns {number} случайное число
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Генерирует случайный цвет в формате rgb(red,green,blue)
 * @returns {string} строка rgb для css свойства background-color
 */
export function getRandomColor(): string {
  let r = getRandomNumber(0, 255);
  let g = getRandomNumber(0, 255);
  let b = getRandomNumber(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Генерация размера цели в зависимости от выбранной сложности
 * @param difficult {String}- уровень сложности
 * @returns {number} случайный размер
 */
export function applyingDifficult(difficult: string): number {
  let param: number = difficultSettings.findIndex(el => el.difficult === difficult);
  return getRandomNumber(difficultSettings[param].min, difficultSettings[param].max);
}