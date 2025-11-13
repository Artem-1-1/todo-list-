class LocalStorage {
  constructor() {
    this.storage = window.localStorage;
    this.key = "projects";
  }

  storageAvailable(type = "localStorage") {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        storage &&
        storage.length !== 0
      );
    }
  }

  saveData(key, value) {
    if (!this.storageAvailable()) {
      console.warn("Storage not available!");
      return;
    }
    this.storage.setItem(key, JSON.stringify(value));
  }

  readData(key) {
    if (!this.storageAvailable()) return null;
    const data = this.storage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key) {
    if (this.storageAvailable()) this.storage.removeItem(key);
  }

  clearAll() {
    if (this.storageAvailable()) this.storage.clear();
  }

  getAllProjects() {
    const data = this.readData(this.key);
    return data ? data : {};
  }

  saveAllProjects(projects) {
    this.saveData(this.key, projects);
  }

  addProject(name) {
    const projects = this.getAllProjects();
    if (!projects[name]) {
      projects[name] = [];
      this.saveAllProjects(projects);
    }
  }

  deleteProject(name) {
    const projects = this.getAllProjects();
    if (projects[name]) {
      delete projects[name];
      this.saveAllProjects(projects);
    }
  }
}

export { LocalStorage };