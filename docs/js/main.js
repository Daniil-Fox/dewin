/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_collapsible_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/collapsible.js */ "./src/js/components/collapsible.js");
/* harmony import */ var _components_dropdown_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dropdown.js */ "./src/js/components/dropdown.js");
/* harmony import */ var _components_settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/settings.js */ "./src/js/components/settings.js");
/* harmony import */ var _components_hello_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/hello.js */ "./src/js/components/hello.js");
/* harmony import */ var _components_denied_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/denied.js */ "./src/js/components/denied.js");






/***/ }),

/***/ "./src/js/components/collapsible.js":
/*!******************************************!*\
  !*** ./src/js/components/collapsible.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const collapsibleButtons = document.querySelectorAll(".lk__showmore");
collapsibleButtons.forEach(button => {
  button.addEventListener("click", function () {
    const parentBlock = this.closest(".lk__block");
    const itemsBlock = parentBlock.querySelector(".lk__items");
    const isCollapsed = button.classList.toggle("active");
    if (!isCollapsed) {
      this.textContent = "/свернуть";
      itemsBlock.style.maxHeight = null;
    } else {
      this.textContent = "/развернуть";
      itemsBlock.style.maxHeight = itemsBlock.scrollHeight + "px"; // Возвращаем к исходному значению
    }
  });
});

/***/ }),

/***/ "./src/js/components/denied.js":
/*!*************************************!*\
  !*** ./src/js/components/denied.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
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
    const createWordElement = text => {
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
        words.forEach(word => {
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
      dropdownBtn.addEventListener("click", e => {
        e.stopPropagation();
        dropdownBtn.classList.toggle("active");
        dropdownContent.classList.toggle("active");
      });

      // Выбор элемента из дропдауна
      dropdownItems.forEach(item => {
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
      document.addEventListener("click", e => {
        if (!dropdownBtn.contains(e.target)) {
          dropdownBtn.classList.remove("active");
          dropdownContent.classList.remove("active");
        }
      });
    }

    // Предотвращение закрытия при клике внутри формы
    messageWrapper.addEventListener("click", e => {
      e.stopPropagation();
    });
  }
});

/***/ }),

/***/ "./src/js/components/dropdown.js":
/*!***************************************!*\
  !*** ./src/js/components/dropdown.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".setting-item__dropdown");
  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector(".setting-item__dropdown-btn");
    const content = dropdown.querySelector(".setting-item__dropdown-content");

    // Открытие/закрытие по клику на кнопку
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const isActive = btn.classList.contains("active");

      // Закрываем все открытые дропдауны
      document.querySelectorAll(".setting-item__dropdown-btn.active").forEach(activeBtn => {
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
    document.addEventListener("click", e => {
      if (!dropdown.contains(e.target)) {
        btn.classList.remove("active");
        content.classList.remove("active");
      }
    });

    // Обработка клика по элементам дропдауна
    const items = dropdown.querySelectorAll(".setting-item__dropdown-item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        // Убираем активный класс у всех элементов
        items.forEach(i => i.classList.remove("active"));
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

/***/ }),

/***/ "./src/js/components/hello.js":
/*!************************************!*\
  !*** ./src/js/components/hello.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.querySelector(".hello__create");
  if (createBtn) {
    const messageBlock = document.querySelector(".hello__message");
    const messageWrapper = document.querySelector(".hello__wrapper");
    const messageContent = messageWrapper.querySelector(".hello__message-content");
    const messageInput = messageWrapper.querySelector(".hello__message-input");
    const messagePreview = messageWrapper.querySelector(".hello__message-preview");
    const messageText = messageWrapper.querySelector(".hello__message-text");
    const saveBtn = messageWrapper.querySelector(".hello__message-save");
    const editBtn = messageWrapper.querySelector(".hello__message-edit");
    const deleteBtn = messageWrapper.querySelector(".hello__message-delete");
    const sendBtn = messageWrapper.querySelector(".hello__message-send");
    let savedText = "";

    // Функция переключения кнопки сохранить/изменить
    const toggleSaveEditButton = function () {
      let toEdit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (toEdit) {
        saveBtn.textContent = "/изменить";
        saveBtn.classList.remove("btn--primary");
      } else {
        saveBtn.textContent = "/сохранить";
        saveBtn.classList.add("btn--primary");
      }
    };

    // Функция сброса состояния кнопки отправки
    const resetSendButton = () => {
      sendBtn.textContent = "/отправить тестовое сообщение";
      sendBtn.disabled = false;
    };

    // Открытие окна при клике на кнопку создания
    createBtn.addEventListener("click", () => {
      messageWrapper.classList.add("active");
      messageInput.focus();
      toggleSaveEditButton(false);
    });

    // Отслеживаем изменения в input
    messageInput.addEventListener("input", () => {
      if (messageInput.hasAttribute("readonly")) return;

      // Если текст изменился после сохранения, меняем кнопку на "сохранить"
      if (messageInput.value.trim() !== savedText) {
        toggleSaveEditButton(false);
        resetSendButton();
      }
    });

    // Сохранение/редактирование сообщения
    saveBtn.addEventListener("click", () => {
      const text = messageInput.value.trim();
      if (saveBtn.textContent === "/сохранить") {
        // Сохраняем
        if (text) {
          messageInput.setAttribute("readonly", "readonly");
          savedText = text;
          sendBtn.disabled = false;
          toggleSaveEditButton(true);
        }
      } else {
        // Редактируем
        messageInput.removeAttribute("readonly");
        messageInput.focus();
        resetSendButton();
      }
    });

    // Удаление сообщения
    const deleteMessage = () => {
      messageWrapper.classList.remove("active");
      messageInput.value = "";
      messageInput.removeAttribute("readonly");
      sendBtn.disabled = false;
      savedText = "";
      toggleSaveEditButton(false);
      resetSendButton();
    };
    deleteBtn.addEventListener("click", deleteMessage);

    // Отправка тестового сообщения
    sendBtn.addEventListener("click", () => {
      sendBtn.disabled = true;
      sendBtn.textContent = "/тестовое сообщение отправлено";
      messageInput.setAttribute("readonly", "readonly");
    });

    // Закрытие окна при клике вне его
    document.addEventListener("click", e => {
      if (!messageBlock.contains(e.target) && !createBtn.contains(e.target)) {
        messageBlock.classList.remove("active");
      }
    });

    // Предотвращение закрытия при клике внутри окна
    messageBlock.addEventListener("click", e => {
      e.stopPropagation();
    });
  }
});

/***/ }),

/***/ "./src/js/components/settings.js":
/*!***************************************!*\
  !*** ./src/js/components/settings.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const settingItems = document.querySelectorAll(".setting");
settingItems.forEach(item => {
  const body = item.querySelector(".setting__body");
  const btn = item.querySelector(".setting__button");
  btn.addEventListener("click", () => {
    let isActive = item.classList.toggle("active");
    if (isActive) {
      body.style.maxHeight = `${body.scrollHeight}px`;
      setTimeout(() => {
        body.style.overflow = "visible";
      }, 300);
    } else {
      body.style.maxHeight = "0";
      body.style.overflow = "hidden";
    }
  });
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components.js */ "./src/js/_components.js");

})();

/******/ })()
;
//# sourceMappingURL=main.js.map