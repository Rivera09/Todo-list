//Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const body = document.querySelector("#body");
//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//Functions
function addTodo(event) {
  if (todoInput.value.replace(" ", "") == "") {
    return alert("The todo must have a text");
  }
  //Prevent form from submitting
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCALSTORAGE
  saveLocalTodo(todoInput.value);
  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Apend to list
  todoList.appendChild(todoDiv);
  // Clrear input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  const todoDiv = item.parentElement;
  if (item.classList[0] === "trash-btn") {
    // Animation
    todoDiv.classList.add("fall");
    removeLocalTodos(todoDiv.innerText);
    todoDiv.addEventListener("transitionend", function () {
      todoDiv.remove();
    });
  }

  // Check mark
  if (item.classList[0] === "complete-btn") {
    todoDiv.classList.toggle("completed");
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const indexTodo = todos.findIndex(
      (todo) => todoDiv.innerText === todo.todo
    );
    todos[indexTodo] = {
      todo: todos[indexTodo].todo,
      completed: !todos[indexTodo].completed,
    };
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  // Check -- Hey, Do I already have things in there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push({
    todo,
    completed: false,
  });
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  setTheme();
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.todo;
    newTodo.classList.add("todo-item");
    if (todo.completed == true) {
      todoDiv.classList.toggle("completed");
    }
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Apend to list
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todo);
  const indexTodo = todos.indexOf(todo);
  todos.splice(indexTodo, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function setTheme(){
  const themes = [
    {
      name:'Just black',
      background: 'black',
      primary: '#3d3d3d',
      secodary: 'white',
      completed: '#2f3640',
      delete:'#240000'
    },
    {
      name:'Bluish purple',
      background:'linear-gradient(120deg,#cd84f1,#7d5fff)',
      primary: '#7158e2',
      secodary:'',
      completed:'#00d2d3',
      delete:'#192a56'
    },
    {
      name:'Green lemon',
      background:'linear-gradient(120deg,#12CBC4,#C4E538)',
      primary:'#d35400',
      secundary:'white',
      completed:'rgb(78, 236, 78)',
      delete:'red'
    },
    {
      name:'Warm orange',
      background:'linear-gradient(120deg,#f6d365,#fda085)',
      primary:'#f39c12',
    }
  ]
  let index = 2;
  document.documentElement.style.setProperty('--background-color',themes[index].background);
  document.documentElement.style.setProperty('--primary-color',themes[index].primary);
  // document.documentElement.style.setProperty('--completed-color',themes[index].completed);
  // document.documentElement.style.setProperty('--delete-color',themes[index].delete);
  
}