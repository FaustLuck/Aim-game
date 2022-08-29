import { authorInfo, overlay } from "./utils";
import {getLocalStatistic} from "./localStatistic";

const tabs: Element = document.querySelector(".tabs");
const infoDisplays: NodeListOf<Element> = document.querySelectorAll(".statistic-info ");
const closeInfoButton: Element = document.querySelector(".close-statistic");
const openButton: Element = document.querySelector(".ledge");
const screenStatistic: Element = document.querySelector(".screen-popup.statistic");


tabs.addEventListener("click", changeTab);
closeInfoButton.addEventListener("click", closeStatistic);
openButton.addEventListener("click", openStatistic);

/**
 * Переключение экранов при выборе вкладки
 * @param e{Event} клик по вкладке
 */
function changeTab(e: Event): void {
    let target: HTMLElement = e.target as HTMLElement;
    if (!target.closest(".tab-item")) return;
    Array.from(tabs.children).forEach(el => el.classList.toggle("open"));
    infoDisplays.forEach(el => el.classList.toggle("open"));
}

/**
 * Закрывает окно со статистикой
 */
function closeStatistic(): void {
    openButton.classList.remove("hide");
    screenStatistic.classList.remove("open");
    overlay.classList.remove("open");
    authorInfo.classList.remove('show')
}

/**
 * Открывает окно со статистикой
 */
function openStatistic(): void {
    openButton.classList.add("hide");
    screenStatistic.classList.add("open");
    overlay.classList.add("open");
    authorInfo.classList.add('show')
    getLocalStatistic();
}