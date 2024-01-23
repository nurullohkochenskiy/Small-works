const token = localStorage.getItem("token");
const logout = document.querySelector("#logout");

if (!token) {
  window.location.replace("register.html");
}

render();

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("login.html");
});

const addEl = document.querySelector("#add");

addEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const todo = event.target[0].value;
  try {
    const response = await fetch("https://todo-for-n92.cyclic.app/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        task: todo,
      }),
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
  event.target[0].value = "";
  render();
});

async function render() {
  const todoListEl = document.querySelector("#TodoList");
  todoListEl.innerHTML = "";

  try {
    const response = await fetch("https://todo-for-n92.cyclic.app/todos/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    const data = await response.json();
    console.log(data);

    for (let i = 0; i < data.allTodos.length; i++) {
      const todo = data.allTodos[i];
      const template = `<li id="${
        todo._id
      }" class="list-group-item d-flex justify-content-between align-items-start" ondblclick="toggler('${
        todo._id
      }', 'complete')">
        <div class="ms-2 me-auto">
            <div style="width: 400px" class="fw-bold">${todo.task}</div>
            ${todo.completed ? "<span>Bajarildi</span>" : ""}
        </div>
        <div class="ms-3">
            <button class="btn btn-danger" onclick="deleteTodo('${
              todo._id
            }')">Delete</button>
            <button class="btn btn-primary" onclick="editToggle('${
              todo._id
            }')">Edit</button>
        </div>
    </li>`;

      todoListEl.innerHTML += template;
    }
  } catch (error) {
    console.log(error);
  }
}

async function toggler(id, type) {
  try {
    switch (type) {
      case "complete":
        const response = await fetch(
          `https://todo-for-n92.cyclic.app/todos?id=${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        break;
    }
    render();
  } catch (error) {
    console.log(error);
  }
}

async function deleteTodo(id) {
  const response = await fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  const data = await response.json();
  render();
  console.log(data);
}

async function editToggle(id) {
  const editformEl = document.getElementById(`${id}`);
  const response = await fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  const data = await response.json();
  console.log(data);
  const task = data.todo.task;
  const editFormTemplate = `<form id="editForm-${id}" class="d-flex flex-row align-items-center">
    <input
      id="update"
      style="width: 490px"
      type="text"
      class="form-control form-control-lg"
      id="exampleFormControlInput1"
      value="${task}"
    />
     <div>
        <button type="submit" class="btn btn-success">Update</button>
   </div>
    </form>`;
  editformEl.innerHTML = editFormTemplate;

  const editForm = document.getElementById(`editForm-${id}`);
  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedTask = document.getElementById(`update`).value;

    // Call the updateTodo function with the id and updated task
    await updateTodo(id, updatedTask);

    // After the update, re-render the todos or perform any other necessary actions
    render();
  });
}

async function updateTodo(id, updatedTask) {
  try {
    const response = await fetch(
      `https://todo-for-n92.cyclic.app/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ task: updatedTask }),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const updateEl = document.querySelector("update");
