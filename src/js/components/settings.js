const settingItems = document.querySelectorAll(".setting");

settingItems.forEach((item) => {
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
