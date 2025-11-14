import "./style.css";
import { ProjectDialog } from './projectDialog.js';
import { LocalStorage } from './storage.js';
import { Todo } from './project.js';
import { taskDialog } from "./taskDialog.js";

const sideBar = document.getElementById('side-bar');
const content = document.getElementById('content');

const projectDialog = new ProjectDialog('content');
const storage = new LocalStorage();

function renderProjects() {
  sideBar.querySelectorAll('.project-item').forEach(el => el.remove());

  const projects = storage.getAllProjects();
  Object.keys(projects).forEach(name => {

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-item');

    const projectName = document.createElement('div');
    projectName.textContent = `${name}`;
    projectName.classList.add('project-name');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.id = 'delete';

    delBtn.addEventListener('click', () => {
      storage.deleteProject(name);
      delBtn.parentElement.remove();
    })

    projectContainer.appendChild(projectName);
    projectContainer.appendChild(delBtn);
    sideBar.appendChild(projectContainer);

    projectName.addEventListener('click', () => {
      renderProjectContent(name);
    });
  });
}

function renderProjectContent(projectName) {
  content.innerHTML = '';

  const header = document.createElement('h2');
  header.textContent = `Project: ${projectName}`;
  header.id = 'header';

  const addTodoBtn = document.createElement('button');
  addTodoBtn.textContent = 'Add Task';
  addTodoBtn.id = 'addTodo';

  const todoContainer = document.createElement('div');
  todoContainer.id = 'todoContainer';

  addTodoBtn.addEventListener('click', async () => {

  const dialog = new taskDialog('content');
  const data = await dialog.open();
  if (!data) return;

  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const todo = new Todo(data.taskName, data.taskDesc, data.priority, null, formattedDate);

  const projects = storage.getAllProjects();
  projects[projectName].push({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    time: todo.time
  });

  storage.saveAllProjects(projects);
  todoContainer.appendChild(todo.renderTodo(projectName));
});

  const project = storage.getAllProjects();
  const todos = project[projectName] || [];
  todos.forEach(t => {
    const todo = new Todo(t.title, t.description, t.priority, t.id, t.time);
    todo.time = t.time;
    todoContainer.appendChild(todo.renderTodo(projectName));
  });

  content.append(header, addTodoBtn, todoContainer);
}

const addProjectBtn = document.createElement('button');
addProjectBtn.id = 'addProject';
addProjectBtn.textContent = 'Add New Project';
sideBar.appendChild(addProjectBtn);

const hr = document.createElement('hr');
hr.id = 'divisor';
sideBar.appendChild(hr);

addProjectBtn.addEventListener('click', async () => {
  const name = await projectDialog.open();
  if (name) {
    storage.addProject(name);
    renderProjects();
  }
})

renderProjects();
