const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input"); //document.querSelector("todo-Form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];

function saveToDos(){
       localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //배열에 들어간 newTodo를 "newTodo"로 저장 
       //"todos"가 키값으로 대체 
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //toDo는 DB요소, li.id는 숫자 -> 스트링
    saveToDos();//다시 한번 저장해야지
}

function paintToDo(newTodo){// 밑에서 함수를 실행할 때 nowTodoObj로 되어있음, 이부분 어려움 함수의 이벤트 위치만 가르쳐주는 듯
  const li = document.createElement("li")
    li.id = newTodo.id;
    const span = document.createElement("span")
    const button = document.createElement("button") 
    span.innerText = newTodo.text;
    button.innerText = "❌"; //이모지가 뭔지 찾아봄
    button.addEventListener("click",deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
  }

function handleToDoSubmit(event){
 event.preventDefault();
 const newTodo = toDoInput.value;
 toDoInput.value = "";
 const newTodoObj = {// 스토리지에 아이디와 텍스트를 함께 저장하기 위해 
    text : newTodo,
    id : Date.now(),

 }

 toDos.push(newTodoObj); //입력받은 투두리스트를 배열에 푸시함, 새로덮어쓰게 되늰 것은 배열이 비어있어서임, 
 //후에 오브젝트로 변경
 paintToDo(newTodoObj);
 saveToDos();
}
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY); 

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);//
    toDos = parsedToDos; //원래 toDos를 복원함 어렵네
    parsedToDos.forEach(paintToDo)
  //  pareseToDos.forEach(); //(함수명) 함수이벤트에 파스드 된 배열이 들어감// =<function(이벤트)
  //console.log(parsedToDos); //Json.parse확인
 //parsedToDos.forEach((item) => console.log("this is the turn of", item));//위에 형식에 따라 괄호가 두개 쓰이게 됨, 함수 이름을 정의할 필요가 없음
}

