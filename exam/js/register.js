const form = document.querySelector("#register");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = event.target[0].value;
  const password = event.target[1].value;
  try {
    const response = await fetch(
      "https://todo-for-n92.cyclic.app/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    const errorEl = document.querySelector("#error");
    if (data.message == "Username is not available") {
      errorEl.textContent = "Bu username band";
    } else {
      localStorage.setItem("token", data.token);
      window.location.replace("index.html");
    }
  } catch (error) {
    console.log(error);
  }
});
