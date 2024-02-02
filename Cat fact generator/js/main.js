const btn = document.querySelector(".btn");
const loader = document.querySelector(".loader");
const card = document.querySelector(".card");
const fact = document.querySelector(".fact");

window.addEventListener("load", () => {
  loader.classList.add("hidden");
  card.classList.remove("hidden");
});

(async function () {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  fact.textContent = data.fact;
})();

btn.addEventListener("click", async () => {
  loader.classList.remove("hidden");
  card.classList.add("hidden");
  try {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();

    fact.textContent = data.fact;
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add("hidden");
    card.classList.remove("hidden");
  }
});
