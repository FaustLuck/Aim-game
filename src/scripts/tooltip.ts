document.addEventListener("mouseover", showTooltip);

/**
 * Показывает подсказку при наведение на элемент
 * @param e{Event} событие
 */
function showTooltip(e: Event) {
    const target: HTMLElement = e.target as HTMLElement;
    if (!window.matchMedia("(any-hover: hover)").matches) return;
    if (window.matchMedia('(max-width: 480px)').matches) return;
    if (!target.getAttribute("data-tooltip")) return;
    let tooltipElem: HTMLElement = document.createElement("div");
    let tooltipHtml: string | null = target.getAttribute("data-tooltip");
    tooltipElem.className = "tooltip";
    tooltipElem.innerHTML = tooltipHtml as string;
    document.body.append(tooltipElem);

    let coords: DOMRect = target.getBoundingClientRect();
    let left: Number = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0;
    let top: Number = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
    }
    tooltipElem.style.left = left + "px";
    tooltipElem.style.top = top + "px";
    target.addEventListener("mouseout", () => {
        tooltipElem.remove();
    });
}