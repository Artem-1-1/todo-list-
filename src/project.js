import { LocalStorage } from "./storage";

class Project{
  constructor(name) {
    this.name = name;
  }
}

class Todo{
  constructor(title, description, priority = 'Low', id = null, time = null){
    this.id = id || self.crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.time = time || new Date().toLocaleString();
  }
  renderTodo(projectName) {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-item');

    const title = document.createElement('h2');
    title.textContent = this.title;

    const description = document.createElement('p');
    description.textContent = this.description;

    const priority = document.createElement('span');
    priority.textContent = `Priority : ${this.priority}`;

    const date = document.createElement('span');
    date.textContent = `  | Added on: ${this.time}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-todo-btn');

    deleteBtn.addEventListener('click', () => {
    todoContainer.remove();

    const storage = new LocalStorage();
    const projects = storage.getAllProjects();

    projects[projectName] = projects[projectName].filter(t => t.id !== this.id);
      storage.saveAllProjects(projects);

  });

    todoContainer.append(title, description, priority, date, deleteBtn);
    return todoContainer;
  }
}

export { Todo, Project };
