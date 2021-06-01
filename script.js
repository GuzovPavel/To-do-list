let allTasks = [];
let valueInput = '';
let input = null;
let indexEdit = null;

window.onload = async function init() {
  input = document.getElementById('add-task');
  input.addEventListener('change', updateValue);
  input.addEventListener('keyup', updateValue1);
  const response = await fetch('http://localhost:8000/allTasks', {
    method: 'GET'
  });
  let result = await response.json();
  allTasks = result.data;
  render();
}


onClickButton = async () => {
  if (valueInput.trim()) {
    allTasks.push({
      text: valueInput.trim(),
      isCheck: false
    });
    const response = await fetch('http://localhost:8000/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        text: valueInput.trim(),
        isCheck: false
      })
    });
    let result = await response.json();
    allTasks = result.data;
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
        onClickImageDone(item, input.value, index);

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

onChangeCheckBox = async (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  const response = await fetch('http://localhost:8000/updateTask', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      text: allTasks[index].text,
      isCheck: allTasks[index].isCheck,
      id: allTasks[index].id
    })
  });
  let result = await response.json();
  allTasks = result.data;

  render();
};

onClickImageClose = async (index) => {
  const response = await fetch(`http://localhost:8000/deleteTask?id=${allTasks[index].id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
  let result = await response.json();
  allTasks = result.data;
  render();
};

onClickImageEdit = (index) => {
  indexEdit = index;
  render()
};

onClickImageDone = async (item, val, index) => {
  item.text = val;
  indexEdit = null;
  const response = await fetch('http://localhost:8000/updateTask', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      text: val,
      isCheck: false,
      id: allTasks[index].id
    })
  });
  let result = await response.json();
  console.log(result);
  allTasks = result.data;
  render();
}

onClickImageBack = (index) => {
  indexEdit = index;

  render();
}