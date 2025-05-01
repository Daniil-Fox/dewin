document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".denied__add");

  if (addBtn) {
    const messageWrapper = document.querySelector(".denied__wrapper");
    const messageBlock = document.querySelector(".denied__message");
    const messageInput = messageBlock.querySelector(".denied__message-input");
    const saveBtn = messageBlock.querySelector(".denied__message-save");
    const cancelBtn = messageBlock.querySelector(".denied__message-cancel");
    const wordsContainer = document.querySelector(".denied__words");

    // Инициализация дропдауна
    const dropdownBtn = document.querySelector(".denied__dropdown-btn");
    const dropdownContent = document.querySelector(".denied__dropdown-content");
    const dropdownItems = document.querySelectorAll(".denied__dropdown-item");

    // Функция создания элемента слова
    const createWordElement = (text) => {
      const wordElement = document.createElement("div");
      wordElement.className = "denied__word";
      wordElement.innerHTML = `
        ${text}
        <button class="btn-reset denied__word-remove">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="white" stroke-width="2"/>
          </svg>
        </button>
      `;

      // Добавляем обработчик для удаления слова
      const removeBtn = wordElement.querySelector(".denied__word-remove");
      removeBtn.addEventListener("click", () => {
        wordElement.remove();
      });

      return wordElement;
    };

    // Открытие формы добавления
    addBtn.addEventListener("click", () => {
      messageWrapper.classList.add("active");
      messageInput.focus();
    });

    // Сохранение слова
    saveBtn.addEventListener("click", () => {
      const words = messageInput.value.trim().split(/\s+/);

      if (words.length && words[0] !== "") {
        words.forEach((word) => {
          const wordElement = createWordElement(word);
          wordsContainer.appendChild(wordElement);
        });

        messageInput.value = "";
        messageInput.focus();
      }
    });

    // Отмена добавления и закрытие окна
    cancelBtn.addEventListener("click", () => {
      messageInput.value = "";
      messageWrapper.classList.remove("active");
    });

    // Обработка дропдауна
    if (dropdownBtn && dropdownContent) {
      // Открытие/закрытие дропдауна
      dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownBtn.classList.toggle("active");
        dropdownContent.classList.toggle("active");
      });

      // Выбор элемента из дропдауна
      dropdownItems.forEach((item) => {
        item.addEventListener("click", () => {
          dropdownBtn.textContent = item.textContent;
          dropdownBtn.appendChild(document.createTextNode(" "));
          // Добавляем SVG обратно
          dropdownBtn.innerHTML += `
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 22L8.20577 13L23.7942 13L16 22Z" fill="currentColor"/>
            </svg>
          `;
          dropdownBtn.classList.remove("active");
          dropdownContent.classList.remove("active");
        });
      });

      // Закрытие дропдауна при клике вне его
      document.addEventListener("click", (e) => {
        if (!dropdownBtn.contains(e.target)) {
          dropdownBtn.classList.remove("active");
          dropdownContent.classList.remove("active");
        }
      });
    }

    // Предотвращение закрытия при клике внутри формы
    messageWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});
