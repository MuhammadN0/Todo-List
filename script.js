let buildTodos = () => {
  todos.innerHTML = '';
  let mainH2 = document.createElement('h2');
  mainH2.appendChild(document.createTextNode('Your Todo list:'));
  todos.appendChild(mainH2);
  todoArray.forEach((item) => {
    let todoDiv = document.createElement('div');
    todoDiv.classList.add(`todo`);
    todoDiv.classList.add(item.type);
    let todoLineDiv = document.createElement('div');
    todoLineDiv.classList.add('todo-line');
    let todoCheck = document.createElement('input');
    todoCheck.type = 'checkbox';
    let todoTextInput = document.createElement('input');
    todoTextInput.type = 'text';
    todoTextInput.value = item.name;
    todoTextInput.disabled = true;

    let todoEdit = document.createElement('button');
    todoEdit.classList.add('edit');
    let todoDelete = document.createElement('button');
    todoDelete.classList.add('delete');
    todoEdit.appendChild(document.createTextNode('Edit'));
    todoDelete.appendChild(document.createTextNode('Delete'));

    todoLineDiv.appendChild(todoCheck);
    todoLineDiv.appendChild(todoTextInput);
    todoLineDiv.appendChild(todoEdit);
    todoLineDiv.appendChild(todoDelete);

    todoDiv.appendChild(todoLineDiv);

    let dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    let h3 = document.createElement('h3');
    let dateTextpar = document.createElement('p');
    h3.appendChild(document.createTextNode('Date:'));
    dateTextpar.appendChild(document.createTextNode(item.date));
    dateDiv.appendChild(h3);
    dateDiv.appendChild(dateTextpar);
    todoDiv.appendChild(dateDiv);

    todos.appendChild(todoDiv);

    todoEdit.addEventListener('click' , ()=>{
      todoEdit.parentElement.children[1].disabled = !todoEdit.parentElement.children[1].disabled
      if(!todoEdit.parentElement.children[1].disabled){
        todoEdit.parentElement.children[1].focus();
      }
      item.name = todoEdit.parentElement.children[1].value
      localStorage.setItem('todoArray', JSON.stringify(todoArray))
    })

    todoDelete.addEventListener('click', ()=>{
      newTodo = todoArray.filter(e => e.id !== item.id)
      todoArray = newTodo;
      localStorage.setItem('todoArray', JSON.stringify(todoArray))
      todoDelete.parentElement.parentElement.remove()
    })

    todoCheck.addEventListener('click', ()=>{
      item.isDone = !item.isDone;
      todoDiv.classList.toggle('done')
      localStorage.setItem('todoArray', JSON.stringify(todoArray))
    })

    if(item.isDone){
      todoCheck.checked = true;
      todoDiv.classList.add('done')
    }
  });
};

let form = document.getElementById('form');
let todos = document.getElementById('todos');
let todoName = document.getElementById('todo-name');
let todoDate = document.getElementById('todo-date');

let todoArray = [];
if (localStorage.getItem('todoArray')) {
  todoArray = JSON.parse(localStorage.getItem('todoArray'));
  buildTodos();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let todoType = document.querySelector('input[name="type"]:checked');
  if (todoName.value === '' || todoDate.value === '') {
    alert('You have to enter a task and a date');
    return;
  }
  createItem(todoName.value, todoDate.value, todoType.value);
  todoName.value=''
  todoDate.value =''
});

const createItem = (name, date, type) => {
  const newItem = {
    id: Date.now(),
    name: name,
    date: date,
    type: type,
    isDone: false,
  };
  let newArray = todoArray.concat(newItem);
  todoArray = newArray;
  localStorage.setItem('todoArray', JSON.stringify(todoArray));
  buildTodos();
};
