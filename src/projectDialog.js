class ProjectDialog {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  open() {
    return new Promise((resolve)=>{
      const dialog = document.createElement('dialog');
      dialog.id = 'projectDialog';

      const form = document.createElement('form')
      form.id = 'form';
      form.method = 'dialog';

      const projectName = document.createElement('label');
      projectName.id = 'p-title';
      projectName.setAttribute('for', 'title');
      projectName.textContent = 'Project Name';

      const input = document.createElement('input');
      input.id = 'title';
      input.placeholder = 'Project Name';
      input.type = 'text';
      input.name = 'project-name';
      input.required = true;
  
      const btnContainer = document.createElement('div');
      btnContainer.id = 'btnContainer';

      const submitBtn = document.createElement('button');
      submitBtn.id = 'create';
      submitBtn.textContent = 'Create';
      submitBtn.type = 'submit';

      const cancelBtn = document.createElement('button');
      cancelBtn.id = 'cancel';
      cancelBtn.textContent = 'Cancel';
      cancelBtn.type = 'button';
      cancelBtn.addEventListener('click', () => dialog.close());

      btnContainer.appendChild(submitBtn);
      btnContainer.appendChild(cancelBtn);

      form.appendChild(projectName);
      form.appendChild(input);
      form.appendChild(btnContainer);
      dialog.appendChild(form);
      this.container.appendChild(dialog);

      dialog.showModal();

      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectName = input.value;
        dialog.close();
        resolve(projectName);
      });
    });
  }
}

export { ProjectDialog };