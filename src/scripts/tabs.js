import { getLocalStatistic } from "./localStatistic.js";
import { overlay } from "./utils.js";

const tabs = document.querySelector(".tabs");
const infoDisplays = document.querySelectorAll(".statistic-info ");
const closeInfoButton = document.querySelector(".close-statistic");
const openButton = document.querySelector(".ledge");
const screenStatistic = document.querySelector(".screen-popup.statistic");

/**
 * Переключение экранов при выборе вкладки
 * @param e{Event} клик по вкладке
 */
function changeTab(e) {
  if (!e.target.closest(".tab-item")) return;
  Array.from(tabs.children).forEach(el => el.classList.toggle("open"));
  infoDisplays.forEach(el => el.classList.toggle("open"));
}

/**
 * Закрывает окно со статистикой
 */
function closeStatistic() {
  openButton.classList.remove("hide");
  screenStatistic.classList.remove("open");
  overlay.classList.remove("open");
}

/**
 * Открывает окно со статистикой
 */
function openStatistic() {
  openButton.classList.add("hide");
  screenStatistic.classList.add("open");
  overlay.classList.add("open");
  getLocalStatistic();
}

tabs.addEventListener("click", changeTab);
closeInfoButton.addEventListener("click", closeStatistic);
openButton.addEventListener("click", openStatistic);