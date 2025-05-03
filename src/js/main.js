import "./_components.js";

// Обработчик для переключения блока достижений
document.addEventListener("DOMContentLoaded", function () {
  const achievementsShowBtn = document.querySelector(".lk-achiv__showfull");
  const achievementsContainer = document.querySelector(".lk-achiv");
  const achievementBlocks = document.querySelectorAll(".achiv-block__items");
  const modalFullscreen = document.getElementById("achievementsFullscreen");
  const modalCloseBtn = document.querySelector(".lk-achiv-fullscreen__close");
  const modalOverlay = document.querySelector(".lk-achiv-fullscreen__overlay");

  // Скрываем модальное окно при загрузке страницы
  if (modalFullscreen) {
    modalFullscreen.style.display = "none";
  }

  // Функция для определения типа устройства (мобильное или десктоп)
  const isMobile = () => window.innerWidth <= 576; // 576px - стандартная точка breakpoint для мобильных

  // Функция для показа компактного вида на мобильных устройствах
  const showCompactView = () => {
    // Меняем текст кнопки
    if (achievementsShowBtn) {
      achievementsShowBtn.textContent = "Все";
    }

    // Удаляем класс развернутого состояния
    if (achievementsContainer) {
      achievementsContainer.classList.remove("expanded");
    }

    // Ограничиваем высоту блоков достижений
    achievementBlocks.forEach((block) => {
      // Устанавливаем ограничение высоты для всех блоков
      block.style.maxHeight = "120px";
      block.style.overflow = "hidden";

      // Проверяем, принадлежит ли блок к категории "Полученные"
      const isReceivedBlock = block
        .closest(".achiv-block")
        .querySelector(".achiv-block__title")
        .textContent.includes("Полученные");

      if (isReceivedBlock) {
        // Показываем только первые два достижения
        const items = block.querySelectorAll(".achiv__item");
        items.forEach((item, index) => {
          if (index < 2) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
  };

  // Функция для показа развернутого вида на мобильных устройствах
  const showExpandedView = () => {
    // Меняем текст кнопки
    if (achievementsShowBtn) {
      achievementsShowBtn.textContent = "Скрыть";
    }

    // Добавляем класс развернутого состояния
    if (achievementsContainer) {
      achievementsContainer.classList.add("expanded");
    }

    // Показываем все блоки достижений
    achievementBlocks.forEach((block) => {
      // Показываем все элементы в блоке
      const items = block.querySelectorAll(".achiv__item");
      items.forEach((item) => {
        item.style.display = "flex";
      });

      // Убираем ограничения высоты
      block.style.maxHeight = "none";
      block.style.overflow = "visible";
    });

    // Корректируем скролл для мобильных устройств
    setTimeout(function () {
      window.scrollTo({
        top: window.pageYOffset,
        behavior: "smooth",
      });
    }, 50);
  };

  // Инициализация состояния при загрузке страницы
  if (achievementsContainer && isMobile()) {
    showCompactView();
  }

  if (achievementsShowBtn) {
    achievementsShowBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (isMobile()) {
        // МОБИЛЬНАЯ ВЕРСИЯ - раскрываем/сворачиваем блоки
        const isExpanded = this.textContent === "Скрыть";

        if (isExpanded) {
          // Сворачиваем блоки
          showCompactView();
        } else {
          // Разворачиваем блоки
          showExpandedView();
        }
      } else {
        // ДЕСКТОП ВЕРСИЯ - открываем модальное окно
        if (modalFullscreen) {
          modalFullscreen.style.display = "block";
          modalFullscreen.classList.add("active");
          document.body.style.overflow = "hidden"; // Блокируем скролл страницы
        }
      }
    });
  }

  // Обработчики закрытия модального окна (для десктопа)
  if (modalFullscreen) {
    // Обработчик клика на кнопку закрытия
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", function () {
        modalFullscreen.classList.remove("active");
        document.body.style.overflow = ""; // Восстанавливаем скролл страницы
        setTimeout(() => {
          modalFullscreen.style.display = "none";
        }, 300); // После завершения анимации
      });
    }

    // Обработчик клика на оверлей
    if (modalOverlay) {
      modalOverlay.addEventListener("click", function () {
        modalFullscreen.classList.remove("active");
        document.body.style.overflow = ""; // Восстанавливаем скролл страницы
        setTimeout(() => {
          modalFullscreen.style.display = "none";
        }, 300); // После завершения анимации
      });
    }

    // Закрытие по Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalFullscreen.classList.contains("active")) {
        modalFullscreen.classList.remove("active");
        document.body.style.overflow = ""; // Восстанавливаем скролл страницы
        setTimeout(() => {
          modalFullscreen.style.display = "none";
        }, 300); // После завершения анимации
      }
    });
  }

  // Обработчик изменения размера окна для правильного отображения
  window.addEventListener("resize", function () {
    // Если переключились с мобильного на десктоп и блоки были развернуты
    if (
      !isMobile() &&
      achievementsContainer &&
      achievementsContainer.classList.contains("expanded")
    ) {
      // Сбрасываем мобильное состояние
      achievementsContainer.classList.remove("expanded");

      if (achievementsShowBtn) {
        achievementsShowBtn.textContent = "Все";
      }

      // Восстанавливаем стандартное отображение для десктопа
      achievementBlocks.forEach((block) => {
        block.style.maxHeight = "";
        block.style.overflow = "";

        // Показываем все элементы
        const items = block.querySelectorAll(".achiv__item");
        items.forEach((item) => {
          item.style.display = "";
        });
      });
    }

    // Если переключились с десктопа на мобильный
    if (isMobile() && achievementsContainer) {
      // Если модальное окно было открыто, закрываем его
      if (modalFullscreen && modalFullscreen.classList.contains("active")) {
        modalFullscreen.classList.remove("active");
        document.body.style.overflow = "";
        modalFullscreen.style.display = "none";
      }

      // Инициализируем компактный вид, если нет класса expanded
      if (!achievementsContainer.classList.contains("expanded")) {
        showCompactView();
      }
    }
  });
});
