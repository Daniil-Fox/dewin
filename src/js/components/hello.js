document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.querySelector(".hello__create");
  if (createBtn) {
    const messageBlock = document.querySelector(".hello__message");
    const messageWrapper = document.querySelector(".hello__wrapper");
    const messageContent = messageWrapper.querySelector(
      ".hello__message-content"
    );
    const messageInput = messageWrapper.querySelector(".hello__message-input");
    const messagePreview = messageWrapper.querySelector(
      ".hello__message-preview"
    );
    const messageText = messageWrapper.querySelector(".hello__message-text");
    const saveBtn = messageWrapper.querySelector(".hello__message-save");
    const editBtn = messageWrapper.querySelector(".hello__message-edit");
    const deleteBtn = messageWrapper.querySelector(".hello__message-delete");
    const sendBtn = messageWrapper.querySelector(".hello__message-send");

    let savedText = "";

    // Функция переключения кнопки сохранить/изменить
    const toggleSaveEditButton = (toEdit = false) => {
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
    document.addEventListener("click", (e) => {
      if (!messageBlock.contains(e.target) && !createBtn.contains(e.target)) {
        messageBlock.classList.remove("active");
      }
    });

    // Предотвращение закрытия при клике внутри окна
    messageBlock.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});
