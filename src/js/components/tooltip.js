class Tooltip {
  constructor() {
    this.activeTooltips = new Set();
    this.init();
  }

  showTooltip(tooltip, placement = "right") {
    if (this.activeTooltips.has(tooltip)) return;

    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";

    if (placement === "left") {
      tooltip.style.transform = "translate(-50px, -50%)";
    } else {
      tooltip.style.transform = "translate(30px, -50%)";
    }
    this.activeTooltips.add(tooltip);
  }

  hideTooltip(tooltip, placement = "right") {
    if (!this.activeTooltips.has(tooltip)) return;

    if (placement === "left") {
      tooltip.style.transform = "translate(-20px, -50%)";
    } else {
      tooltip.style.transform = "translate(20px, -50%)";
    }

    tooltip.style.opacity = "0";
    this.activeTooltips.delete(tooltip);

    return new Promise((resolve) => {
      setTimeout(() => {
        tooltip.style.visibility = "hidden";
        resolve();
      }, 300);
    });
  }

  init() {
    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest("[data-info]");
      if (!target) return;

      const tooltip = target.querySelector(".tooltip");
      if (tooltip) {
        // Проверяем атрибут placement на тултипе И на родителе
        const placement =
          tooltip.getAttribute("data-placement") ||
          target.getAttribute("data-placement") ||
          "right";

        // Запоминаем атрибут на тултипе для стилей
        if (!tooltip.getAttribute("data-placement") && placement) {
          tooltip.setAttribute("data-placement", placement);
        }

        // Показываем тултип
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        if (placement === "left") {
          tooltip.style.transform = "translate(-30px, -50%)";
        } else {
          tooltip.style.transform = "translate(30px, -50%)";
        }
      }
    });

    document.addEventListener("mouseout", async (e) => {
      const target = e.target.closest("[data-info]");
      if (!target) return;

      const tooltip = target.querySelector(".tooltip");
      if (tooltip) {
        // Получаем placement из тултипа или родителя
        const placement =
          tooltip.getAttribute("data-placement") ||
          target.getAttribute("data-placement") ||
          "right";

        // Скрываем тултип
        tooltip.style.opacity = "0";
        if (placement === "left") {
          tooltip.style.transform = "translate(-20px, -50%)";
        } else {
          tooltip.style.transform = "translate(20px, -50%)";
        }

        await new Promise((resolve) => setTimeout(resolve, 300));
        tooltip.style.visibility = "hidden";
      }
    });
  }
}

export default Tooltip;
