document.addEventListener("DOMContentLoaded", function () {
  const collapsibleButtons = document.querySelectorAll(".lk__showmore");

  // Инициализация начального состояния
  collapsibleButtons.forEach((button) => {
    const parentBlock =
      button.closest(".lk__block") || button.closest(".lk-aside__achievements");

    let itemsBlock;
    if (parentBlock.classList.contains("lk__block")) {
      itemsBlock = parentBlock.querySelector(".lk__items");
    } else if (parentBlock.classList.contains("lk-aside__achievements")) {
      itemsBlock = parentBlock.querySelector(".lk-achiv__items");
    }

    if (itemsBlock) {
      // По умолчанию все блоки свернуты
      itemsBlock.style.maxHeight = null;
      button.textContent = "/развернуть";
    }
  });

  // Обработчик клика на кнопки
  collapsibleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Ищем ближайший блок-контейнер (может быть lk__block или lk-aside__achievements)
      const parentBlock =
        this.closest(".lk__block") || this.closest(".lk-aside__achievements");

      // Находим контейнер с элементами в зависимости от типа блока
      let itemsBlock;
      if (parentBlock.classList.contains("lk__block")) {
        itemsBlock = parentBlock.querySelector(".lk__items");
      } else if (parentBlock.classList.contains("lk-aside__achievements")) {
        itemsBlock = parentBlock.querySelector(".lk-achiv__items");
      }

      // Проверяем, что удалось найти контейнер с элементами
      if (!itemsBlock) return;

      // Переключаем класс active на кнопке
      const isCollapsed = button.classList.toggle("active");

      // Обновляем текст кнопки и состояние контейнера
      if (isCollapsed) {
        this.textContent = "/свернуть";
        itemsBlock.style.maxHeight = itemsBlock.scrollHeight + "px";
      } else {
        this.textContent = "/развернуть";
        itemsBlock.style.maxHeight = null;
      }
    });
  });
});
