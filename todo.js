const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; //빈 어레이를 만들어서 투두리스트를 다 넣어줄 거야

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
    console.log(toDo.id, li.id);
  });
  toDos = cleanToDos;
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //localStorage는 자바스크립트를 스트링으로 저장하기때문에
  //object를 스트링으로 변환시켜줘야해
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span"); //투두리스트 입력된 텍스트를 위한 엘리먼트
  const newId = toDos.length + 1;
  delBtn.innerText = "✔︎";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj); //toDoObj 내용을 toDo[어레이]안에 넣어줄 거야
  saveTodos(); //obj 넣어준 후에 불러야 안에 내용물이 담긴다능
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //텍스트를 다시 js 오브젝트로 전환
    parsedToDos.forEach(
      function (toDo) {
        paintToDo(toDo.text);
      } //어레이에 담겨있는 것들 각각에 한번씩 함수를 실행시켜준다
    );
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
