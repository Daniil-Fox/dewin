document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".setting-item__dropdown");
  let mediaQuery = window.matchMedia("(max-width: 576px)");

  // Функция трансформации дропдауна в радио-кнопки
  function transformDropdownToRadio(dropdown, isMobile) {
    const btn = dropdown.querySelector(".setting-item__dropdown-btn");
    const content = dropdown.querySelector(".setting-item__dropdown-content");
    const items = content.querySelectorAll(".setting-item__dropdown-item");
    const radioContainer = dropdown.querySelector(".setting-item__radio-group");

    // Если мы на мобильном и контейнер для радио еще не создан
    if (isMobile && !radioContainer) {
      // Создаем контейнер для радио-кнопок
      const newRadioContainer = document.createElement("div");
      newRadioContainer.className = "setting-item__radio-group";

      // Создаем радио-кнопки для каждого элемента дропдауна
      items.forEach((item, index) => {
        const isActive = item.classList.contains("active");
        const img = item.querySelector("img");
        const text = item.textContent.trim();

        // Создаем уникальный id для радио
        const radioId = `lang-${dropdown.dataset.group || "default"}-${index}`;

        // Создаем обертку для радио и лейбла
        const radioWrapper = document.createElement("label");
        radioWrapper.className = "setting-item__radio";

        // Создаем радио-кнопку
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `language-${dropdown.dataset.group || "default"}`;
        radio.className = "visually-hidden";
        radio.id = radioId;
        radio.checked = isActive;

        // Создаем лейбл с флагом и текстом
        const radioLabel = document.createElement("span");
        radioLabel.className = "setting-item__radio-label";

        if (img) {
          const imgClone = img.cloneNode(true);
          radioLabel.appendChild(imgClone);
        }

        radioLabel.appendChild(document.createTextNode(text));

        // Добавляем все в обертку
        radioWrapper.appendChild(radio);
        radioWrapper.appendChild(radioLabel);

        // Добавляем обработчик клика
        radio.addEventListener("change", () => {
          if (radio.checked) {
            // Обновить активный класс в оригинальном дропдауне
            items.forEach((i) => i.classList.remove("active"));
            item.classList.add("active");

            // Обновляем кнопку дропдауна для десктопа
            const btnImg = btn.querySelector("img");
            if (btnImg && img) {
              btnImg.src = img.src;
              btnImg.alt = img.alt;
            }

            const svg = btn.querySelector("svg");
            btn.innerHTML = "";
            if (btnImg && img) {
              btn.appendChild(img.cloneNode(true));
            }
            btn.appendChild(document.createTextNode(text));
            if (svg) {
              btn.appendChild(svg.cloneNode(true));
            }

            // Здесь можно добавить дополнительную логику при смене языка
            // например, отправку запроса на сервер или сохранение в localStorage
          }
        });

        // Добавляем в контейнер
        newRadioContainer.appendChild(radioWrapper);
      });

      // Добавляем контейнер с радио-кнопками после оригинального дропдауна
      dropdown.appendChild(newRadioContainer);
    }

    // Переключаем видимость между дропдауном и радио
    if (dropdown.querySelector(".setting-item__radio-group")) {
      if (isMobile) {
        btn.style.display = "none";
        content.style.display = "none";
        dropdown.querySelector(".setting-item__radio-group").style.display =
          "flex";
      } else {
        btn.style.display = "flex";
        content.style.display = ""; // возвращаем исходное значение
        if (dropdown.querySelector(".setting-item__radio-group")) {
          dropdown.querySelector(".setting-item__radio-group").style.display =
            "none";
        }
      }
    }
  }

  // Применяем трансформацию ко всем дропдаунам
  function handleViewportChange(e) {
    const isMobile = e.matches;
    dropdowns.forEach((dropdown) => {
      transformDropdownToRadio(dropdown, isMobile);
    });
  }

  // Инициализируем состояние при загрузке
  handleViewportChange(mediaQuery);

  // Добавляем слушатель изменения размера экрана
  mediaQuery.addEventListener("change", handleViewportChange);
});
