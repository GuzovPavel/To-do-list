let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = '';
let input = null;
let indexEdit = null;

window.onload = init = () => {
  input = document.getElementById('add-task');
  input.addEventListener('change', updateValue);
  input.addEventListener('keyup', updateValue1);
  render();
}


onClickButton = () => {
  if (valueInput.trim()) {
    allTasks.push({
      text: valueInput.trim(),
      isCheck: false
    });
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    valueInput = '';
    input.value = '';
  }

  render();
};

updateValue = (event) => {
  valueInput = event.target.value;

}
updateValue1 = (event) => {
  if (event.keyCode === 13) {
    return onClickButton();
  }
}


render = () => {
  const content = document.getElementById('content-page')
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allTasks.map((item, index) => {
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task-container';
    const checkbox = document.createElement('input');



    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = item.isCheck;
    checkbox.onchange = function () {
      onChangeCheckBox(index);
    };
    container.appendChild(checkbox);
    if (index === indexEdit) {

      const input = document.createElement('input');
      input.className = 'newInput';
      input.type = 'text';
      input.value = item.text;
      container.appendChild(input);

      const imageDone = document.createElement('img');
      imageDone.src = 'images/done.png'
      imageDone.onclick = () => {
        onClickImageDone(item, input.value);

      }
      container.appendChild(imageDone);


      const imageBack = document.createElement('img');
      imageBack.src = 'images/back.png'
      imageBack.onclick = () => {
        onClickImageBack(index.text);
      }
      container.appendChild(imageBack);

    } else {
      const text = document.createElement('p');
      text.innerText = item.text;
      text.className = item.isCheck ? 'text-task done-text' : 'text-task';
      container.appendChild(text);
      if (!item.isCheck) {
        const imageEdit = document.createElement('img')
        imageEdit.src = 'images/edit.png';
        imageEdit.onclick = () => {
          onClickImageEdit(index);
        }
        container.appendChild(imageEdit);
      }



      const imageClose = document.createElement('img')
      imageClose.src = 'images/delete.png';
      imageClose.onclick = () => {
        onClickImageClose(index)
      };
      container.appendChild(imageClose);

    }

    content.appendChild(container);

  })
};

onChangeCheckBox = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
};

onClickImageClose = (index) => {
  allTasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
};

onClickImageEdit = (index) => {
  indexEdit = index;
  render()
};

onClickImageDone = (item, val) => { // trouble
  item.text = val;
  indexEdit = null;
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

onClickImageBack = (index) => {
  indexEdit = index;

  render();
}