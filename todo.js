
const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const finishList = document.querySelector(".js-finishList");

const TODOS_LS = "toDos";
const FINISHS_LS = "finishs";

let toDos = [];
let finishs = [];

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveFinishs() {
  localStorage.setItem(FINISHS_LS, JSON.stringify(finishs));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishList.removeChild(li);
  const cleanfinishs = finishs.filter(function(finish) {
    return finish.id !== parseInt(li.id);
  });
  finishs = cleanfinishs;
  saveFinishs();
}

function moveFinish(event) {
  deleteToDo(event)
  const span = event.target.parentNode.querySelector('span');
  paintFinish(span.textContent)  
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("a");
  const okBtn = document.createElement("a");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  okBtn.innerHTML = "✅";
  okBtn.addEventListener("click", moveFinish)
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(okBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}
function moveTodos(event) {
  deleteFinish(event);
  const span = event.target.parentNode.querySelector('span');
  paintToDo(span.textContent);
}

function paintFinish(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("a");
  const backBtn = document.createElement("a");
  const span = document.createElement("span");
  const newId = finishs.length + 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteFinish);
  backBtn.innerHTML = "⏮️";
  backBtn.addEventListener("click", moveTodos)
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  finishList.appendChild(li);
  const finishObj = {
    text: text,
    id: newId
  };
  finishs.push(finishObj);
  saveFinishs();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}
function loadFinishs() {
  const loadedFinishs = localStorage.getItem(FINISHS_LS);
  if (loadedFinishs !== null) {
    const parsedFinishs = JSON.parse(loadedFinishs);
    parsedFinishs.forEach(function(finish) {
      paintFinish(finish.text);
    });
  }
}

function init() {
  loadToDos();
  loadFinishs();

  toDoForm.addEventListener("submit", handleSubmit);
}

init();
