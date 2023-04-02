const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "toDos";
const toDoListDelete = document.querySelector(".todo-deletebtn button");

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newToDoObj) {
  const li = document.createElement("li");
  li.id = newToDoObj.id;
  const span = document.createElement("span");
  span.innerText = newToDoObj.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

function allDeleteToDo(event) {
  const liList = toDoList.querySelectorAll("li");
  liList.forEach((li) => {
    li.remove();
  });
  toDos = [];
  saveToDos();
}

toDoListDelete.addEventListener("click", allDeleteToDo);

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

/*
function sayHello(item) {
  console.log("이제 준비~", item);
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  parsedToDos.forEach(sayHello);
}
이 코드와 

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  parsedToDos.forEach(item) =>console.log("이제 준비~", item);
}

이 코드는 근본적으로 같다. 동일한 것이다. 함수를 많이 작성하지 않고 싶으면
후자의 기능을 쓰도록하자 더 짧게 쓰는 방법이기 때문이다. 보다시피 
함수의 이름도 필요없고, funtion을 쓸 필요도 없다. 
각각의아이템에 대해서 콘솔로그를 할것이라는 뜻. 
이건 위 함수를 쓴것과 똑같다. 
밑의 방법으로 작성하는 것을 arrow funtion 화살표함수라고 부른다. 
우리는 에로우 함수를 사용할것이다. 
 */
