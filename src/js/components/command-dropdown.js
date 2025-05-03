document.addEventListener("DOMContentLoaded", () => {
  const commandDropdowns = document.querySelectorAll(".command__drop");

  // Функция для закрытия всех открытых дропдаунов
  const closeAllDropdowns = (exceptDropdown = null) => {
    commandDropdowns.forEach((dropdown) => {
      if (dropdown !== exceptDropdown) {
        const header = dropdown.querySelector(".command__header");
        const body = dropdown.querySelector(".command__body");

        if (header) {
          header.classList.remove("active");
        }

        // Сбрасываем высоту и добавляем transition для плавности
        if (body) {
          body.style.maxHeight = "0";
        }
      }
    });
  };

  // Функция для плавного открытия дропдауна
  const openDropdown = (dropdown) => {
    const header = dropdown.querySelector(".command__header");
    const body = dropdown.querySelector(".command__body");

    if (header && body) {
      header.classList.add("active");

      // Небольшая задержка перед анимацией для более плавного эффекта
      setTimeout(() => {
        const bodyContent = body.querySelector(".command__content");
        if (bodyContent) {
          body.style.maxHeight = bodyContent.scrollHeight + "px";
        }
      }, 10);
    }
  };

  // Функция для плавного закрытия дропдауна
  const closeDropdown = (dropdown) => {
    const header = dropdown.querySelector(".command__header");
    const body = dropdown.querySelector(".command__body");

    if (header && body) {
      header.classList.remove("active");
      body.style.maxHeight = "0";
    }
  };

  // Инициализация дропдаунов
  commandDropdowns.forEach((dropdown) => {
    const header = dropdown.querySelector(".command__header");
    const body = dropdown.querySelector(".command__body");

    // Найдем текущее выбранное значение в заголовке
    const currentValue = header
      ?.querySelector("span:first-child")
      ?.textContent.trim();

    // Скрываем все тела дропдаунов по умолчанию
    if (body) {
      body.style.maxHeight = "0";
      body.style.overflow = "hidden";
      body.style.transition = "max-height 0.3s ease-out";

      // Подсветим текущий активный пункт в дропдауне
      const items = dropdown.querySelectorAll(".command__item");
      items.forEach((item) => {
        if (item.textContent.trim() === currentValue) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }

    // Обработчик клика по заголовку
    if (header) {
      header.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isActive = header.classList.contains("active");

        // Закрываем все остальные дропдауны
        closeAllDropdowns(isActive ? null : dropdown);

        // Переключаем состояние текущего дропдауна
        if (isActive) {
          // Закрываем текущий дропдаун
          closeDropdown(dropdown);
        } else {
          // Открываем текущий дропдаун
          openDropdown(dropdown);
        }
      });
    }

    // Обработчик клика по элементам дропдауна
    const items = dropdown.querySelectorAll(".command__item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        // Получаем текст выбранного элемента
        const selectedText = item.textContent.trim();

        // Снимаем активное состояние со всех элементов
        items.forEach((i) => i.classList.remove("active"));

        // Устанавливаем активное состояние для выбранного элемента
        item.classList.add("active");

        // Обновляем текст в заголовке
        const headerText = header.querySelector("span:first-child");
        if (headerText) {
          headerText.textContent = selectedText;
        }

        // Закрываем дропдаун
        closeDropdown(dropdown);
      });
    });
  });

  // Закрываем дропдауны при клике вне их области
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".command__drop")) {
      closeAllDropdowns();
    }
  });
});
