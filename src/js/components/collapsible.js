const collapsibleButtons = document.querySelectorAll(".lk__showmore");

collapsibleButtons.forEach((button) => {
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
