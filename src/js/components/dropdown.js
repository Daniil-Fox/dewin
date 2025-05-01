document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".setting-item__dropdown");

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".setting-item__dropdown-btn");
    const content = dropdown.querySelector(".setting-item__dropdown-content");

    // Открытие/закрытие по клику на кнопку
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = btn.classList.contains("active");

      // Закрываем все открытые дропдауны
      document
        .querySelectorAll(".setting-item__dropdown-btn.active")
        .forEach((activeBtn) => {
          if (activeBtn !== btn) {
            activeBtn.classList.remove("active");
            activeBtn.nextElementSibling.classList.remove("active");
          }
        });

      // Переключаем текущий дропдаун
      btn.classList.toggle("active");
      content.classList.toggle("active");
    });

    // Закрытие при клике вне дропдауна
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        btn.classList.remove("active");
        content.classList.remove("active");
      }
    });

    // Обработка клика по элементам дропдауна
    const items = dropdown.querySelectorAll(".setting-item__dropdown-item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        // Убираем активный класс у всех элементов
        items.forEach((i) => i.classList.remove("active"));
        // Добавляем активный класс выбранному элементу
        item.classList.add("active");

        // Обновляем кнопку
        const img = item.querySelector("img");
        const text = item.textContent.trim();

        const btnImg = btn.querySelector("img");
        if (btnImg && img) {
          btnImg.src = img.src;
          btnImg.alt = img.alt;
        }

        // Обновляем текст кнопки, сохраняя SVG
        const svg = btn.querySelector("svg");
        btn.innerHTML = "";
        if (btnImg) {
          btn.appendChild(btnImg.cloneNode(true));
        }
        btn.appendChild(document.createTextNode(text));
        if (svg) {
          btn.appendChild(svg.cloneNode(true));
        }

        // Закрываем дропдаун
        btn.classList.remove("active");
        content.classList.remove("active");

        // Здесь можно добавить дополнительную логику при смене языка
        // например, отправку запроса на сервер или сохранение в localStorage
      });
    });
  });
});
