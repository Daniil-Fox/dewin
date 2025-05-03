document.addEventListener("DOMContentLoaded", function () {
  const achievementsModal = document.getElementById("achievementsFullscreen");
  const showButton = document.querySelector(".lk-achiv__showfull");
  const closeButton = document.querySelector(".lk-achiv-fullscreen__close");
  const overlay = document.querySelector(".lk-achiv-fullscreen__overlay");

  // Проверка на наличие элементов на странице
  if (!achievementsModal || !showButton) {
    return;
  }

  console.log("Achievement components initialized");

  // Открыть модальное окно
  showButton.addEventListener("click", function () {
    console.log("Show button clicked");
    achievementsModal.classList.add("active"); // Блокировка прокрутки
  });

  // Закрыть модальное окно по клику на кнопку
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      console.log("Close button clicked");
      achievementsModal.classList.remove("active");
    });
  }

  // Закрыть модальное окно по клику на оверлей
  if (overlay) {
    overlay.addEventListener("click", function () {
      console.log("Overlay clicked");
      achievementsModal.classList.remove("active");
    });
  }

  // Закрыть модальное окно по нажатию клавиши Escape
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      achievementsModal.classList.contains("active")
    ) {
      console.log("Escape pressed");
      achievementsModal.classList.remove("active");
    }
  });
});
