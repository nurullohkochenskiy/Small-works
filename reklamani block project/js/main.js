const timer = document.querySelector("#timer");
const skipbtnEl = document.querySelector("#skipbtn");
const advid = document.querySelector("#ad");
const mainvid = document.querySelector("#vid");

window.addEventListener("load", () => {
  let timeleft = 5;
  const skipadtimeout = setInterval(() => {
    timeleft--;
    timer.textContent = `in ${timeleft} s`;
    if (timeleft === 0) {
      clearInterval(skipadtimeout);
      skipbtnEl.removeAttribute("disabled");
      timer.textContent = "";
    }
  }, 1000);
});

setTimeout(() => {}, 1000);

skipbtnEl.addEventListener("click", () => {
  advid.classList.add("hide");
  mainvid.classList.remove("hide");
  mainvid.play();
  skipbtnEl.classList.add("hide");
});
