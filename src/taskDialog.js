class taskDialog{
  constructor(containerId) {
    this.container = document.getElementById(containerId)
  }

  open() {
    return new Promise((resolve) => {
      const dialog = document.createElement('dialog');
      dialog.id = 'taskDialog';
      
      const form = document.createElement('form');
      form.id = 'form';
      form.method = 'dialog';

      const title = document.createElement('h2');
      title.textContent = 'New Task';

      const titleLabel = document.createElement('label');
      titleLabel.id = 't-title';
      titleLabel.setAttribute('for', 'title');
      titleLabel.textContent = 'Title';

      const input = document.createElement('input');
      input.id = 'titleTask';
      input.placeholder = 'Task Name';
      input.type = 'text';
      input.name = 'task-name';
      input.required = true;

      const textarea = document.createElement('textarea');
      textarea.placeholder = 'Description';
      textarea.rows = 3;
      textarea.id = 'textarea';
      textarea.required = true;

      const divOne = document.createElement('div');
      divOne.classList.add('label-input');

      const labelOne = document.createElement('label');
      labelOne.textContent = 'Date';
      labelOne.setAttribute('for', 'date');

      const inputOne = document.createElement('input');
      inputOne.id = 'date'
      inputOne.type = 'date';
      inputOne.required = true;

      const divTwo = document.createElement('div');
      divTwo.classList.add('label-input');

      const labelTwo = document.createElement('label');
      labelTwo.textContent = 'Priority';
      const select = document.createElement('select');
      const optionOne = document.createElement('option');
      optionOne.value = 'Low';
      optionOne.textContent = 'Low';
      const optionTwo = document.createElement('option');
      optionTwo.value = 'Medium';
      optionTwo.textContent = 'Medium';
      const optionThree = document.createElement('option');
      optionThree.value = 'High';
      optionThree.textContent = 'High';
      
      const btnContainer = document.createElement('div');
      btnContainer.id = 'btnContainer';

      const submitBtn = document.createElement('button');
      submitBtn.id = 'dialogBtn';
      submitBtn.textContent = 'Create';
      submitBtn.type = 'submit';

      const cancelBtn = document.createElement('button');
      cancelBtn.id = 'dialogBtn';
      cancelBtn.textContent = 'Cancel';
      cancelBtn.type = 'button';

      form.appendChild(title);
      form.appendChild(titleLabel);
      form.appendChild(input);
      form.appendChild(textarea);

      divOne.appendChild(labelOne);
      divOne.appendChild(inputOne);
      form.appendChild(divOne);

      divTwo.appendChild(labelTwo);
      select.appendChild(optionOne);
      select.appendChild(optionTwo);
      select.appendChild(optionThree);
      divTwo.appendChild(select);
      form.appendChild(divTwo);

      btnContainer.appendChild(submitBtn);
      btnContainer.appendChild(cancelBtn);
      
      form.appendChild(btnContainer);
      dialog.appendChild(form);
      this.container.appendChild(dialog);

      dialog.showModal();

      const cleanupAndResolveNull = () => {
        if (this.container.contains(dialog)) this.container.removeChild(dialog);
        resolve(null);
      };

      cancelBtn.addEventListener('click', () => {
        dialog.close();
        cleanupAndResolveNull();
      });

      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const taskName = input.value.trim();
        const taskDesc = textarea.value.trim();
        const date = inputOne.value;
        const priority = select.value;

        if (this.container.contains(dialog)) this.container.removeChild(dialog);


        dialog.close();
        resolve({taskName, taskDesc, date, priority})
      })
    })
  }
}

export { taskDialog };