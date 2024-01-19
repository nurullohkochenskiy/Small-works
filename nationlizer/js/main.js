const btnEl = document.querySelector("#button-addon2");
const nameEl = document.querySelector("#name");

btnEl.addEventListener("click", async () => {
  const name = nameEl.value;
  try {
    const response = await fetch(`https://api.nationalize.io?name=${name}`);
    const data = await response.json();
    const countrylistEl = document.querySelector("#list");
    if (data.count == 0) {
      countrylistEl.innerHTML = `<li>Ism topilmadi!</li>`;
    } else {
      function render() {
        countrylistEl.innerHTML = "";
        const countries = data.country;
        for (let i = 0; i < countries.length; i++) {
          const templete = `<li class="list-group-item">Country: ${countries[i].country_id},  probability: ${countries[i].probability} </li>`;
          countrylistEl.innerHTML += templete;
        }
      }
      render();
    }
    console.log(data.count);
  } catch (error) {
    console.log(error);
  }
});
