document.addEventListener("mouseover", showTooltip);

/**
 * Показывает подсказку при наведение на элемент
 * @param e{Event} событие
 */
function showTooltip(e) {
  if (!window.matchMedia("(any-hover: hover)").matches) return;
  if(window.matchMedia('(max-width: 480px)').matches) return;
  if (!e.target.getAttribute("data-tooltip")) return;
  let tooltipElem = document.createElement("div");
  let tooltipHtml = e.target.getAttribute("data-tooltip");
  tooltipElem.className = "tooltip";
  tooltipElem.innerHTML = tooltipHtml;
  document.body.append(tooltipElem);

  let coords = e.target.getBoundingClientRect();
  let left = coords.left + (e.target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0;
  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) {
    top = coords.top + e.target.offsetHeight + 5;
  }
  tooltipElem.style.left = left + "px";
  tooltipElem.style.top = top + "px";
  e.target.addEventListener("mouseout", () => {
    tooltipElem.remove();
  });
}