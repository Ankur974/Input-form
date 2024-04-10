// Define sample data
const sampleData = [
  {
    "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
    "type": "input",
    "label": "Sample Label",
    "placeholder": "Sample placeholder"
  },
  {
    "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
    "type": "select",
    "label": "Sample Label",
    "options": ["Sample Option", "Sample Option", "Sample Option"]
  },
  {
    "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
    "type": "input",
    "label": "Sample Label",
    "placeholder": "Sample Placeholder"
  },
  {
    "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
    "type": "textarea",
    "label": "Sample Label",
    "placeholder": "Sample Placeholder"
  }
];

document.addEventListener('DOMContentLoaded', function() {
  const formElementsContainer = document.querySelector('.container');
  const saveButton = document.querySelector('.button');

  // Function to add a new input element
  function addInput() {
      const newInput = createInput(sampleData[0]);
      formElementsContainer.appendChild(newInput);
  }

  // Function to add a new select element
  function addSelect() {
      const newSelect = createSelect(sampleData[1]);
      formElementsContainer.appendChild(newSelect);
  }

  // Function to add a new textarea element
  function addTextarea() {
      const newTextarea = createTextarea(sampleData[3]);
      formElementsContainer.appendChild(newTextarea);
  }

  // Function to create a new input element
  function createInput(data) {
      const component = document.createElement('div');
      component.classList.add('component');
      component.setAttribute('draggable', true); // Make the component draggable

      const label = document.createElement('label');
      const labelInput = document.createElement('input');
      labelInput.setAttribute('type', 'text');
      labelInput.value = data.label;
      labelInput.addEventListener('input', function() {
          data.label = labelInput.value;
      });
      label.appendChild(labelInput);
      label.classList.add('label');

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('bi', 'bi-trash', 'delete-icon');
      deleteIcon.addEventListener('click', function() {
          component.remove();
      });

      label.appendChild(deleteIcon);

      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', data.placeholder);
      input.value = data.placeholder;
      input.classList.add('input');
      input.addEventListener('input', function() {
          data.placeholder = input.value;
      });

      component.appendChild(label);
      component.appendChild(input);

      // Add event listeners for drag-and-drop
      component.addEventListener('dragstart', dragStart);
      component.addEventListener('dragover', dragOver);
      component.addEventListener('drop', drop);

      return component;
  }

  // Function to create a new select element
  function createSelect(data) {
      const component = document.createElement('div');
      component.classList.add('component');
      component.setAttribute('draggable', true); // Make the component draggable

      const label = document.createElement('label');
      const labelInput = document.createElement('input');
      labelInput.setAttribute('type', 'text');
      labelInput.value = data.label;
      labelInput.addEventListener('input', function() {
          data.label = labelInput.value;
      });
      label.appendChild(labelInput);
      label.classList.add('label');

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('bi', 'bi-trash', 'delete-icon');
      deleteIcon.addEventListener('click', function() {
          component.remove();
      });

      label.appendChild(deleteIcon);

      const select = document.createElement('select');
      select.classList.add('select');

      data.options.forEach(optionText => {
          const option = document.createElement('option');
          option.textContent = optionText;
          select.appendChild(option);
      });

      component.appendChild(label);
      component.appendChild(select);

      // Add event listeners for drag-and-drop
      component.addEventListener('dragstart', dragStart);
      component.addEventListener('dragover', dragOver);
      component.addEventListener('drop', drop);

      return component;
  }

  // Function to create a new textarea element
  function createTextarea(data) {
      const component = document.createElement('div');
      component.classList.add('component');
      component.setAttribute('draggable', true); // Make the component draggable

      const label = document.createElement('label');
      const labelInput = document.createElement('input');
      labelInput.setAttribute('type', 'text');
      labelInput.value = data.label;
      labelInput.addEventListener('input', function() {
          data.label = labelInput.value;
      });
      label.appendChild(labelInput);
      label.classList.add('label');

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('bi', 'bi-trash', 'delete-icon');
      deleteIcon.addEventListener('click', function() {
          component.remove();
      });

      label.appendChild(deleteIcon);

      const textarea = document.createElement('textarea');
      textarea.setAttribute('placeholder', data.placeholder);
      textarea.value = data.placeholder;
      textarea.classList.add('textarea');
      textarea.addEventListener('input', function() {
          data.placeholder = textarea.value;
      });

      component.appendChild(label);
      component.appendChild(textarea);

      // Add event listeners for drag-and-drop
      component.addEventListener('dragstart', dragStart);
      component.addEventListener('dragover', dragOver);
      component.addEventListener('drop', drop);

      return component;
  }
  

  // Event listeners for add button clicks
  document.getElementById('add-input').addEventListener('click', addInput);
  document.getElementById('add-select').addEventListener('click', addSelect);
  document.getElementById('add-textarea').addEventListener('click', addTextarea);

  // Save button click event
  saveButton.addEventListener('click', function() {
      const components = document.querySelectorAll('.component');
      const formData = [];

      components.forEach(component => {
          const label = component.querySelector('.label input').value;
          const type = component.querySelector('input, select, textarea').nodeName.toLowerCase();
          const placeholder = component.querySelector('input, textarea').getAttribute('placeholder');
          const options = Array.from(component.querySelectorAll('select option')).map(option => option.textContent);

          formData.push({
              label,
              type,
              placeholder,
              options
          });
      });

      console.log(formData); // Log the updated JSON data
  });

  // Function to handle drag start event
  function dragStart(event) {
      event.dataTransfer.setData('text/plain', ''); // Necessary for Firefox
      event.target.style.opacity = '0.4'; // Set the opacity when dragging
  }

  // Function to handle drag over event
  function dragOver(event) {
      event.preventDefault();
  }

// Function to handle drop event
function drop(event) {
  console.log('Drop function called');
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  console.log('Data:', data);
  const draggableElement = document.getElementById(data);
  console.log('Draggable element:', draggableElement);
  const dropzone = event.target.closest('.container');
  console.log('Dropzone:', dropzone);

  // Determine the position to insert the dragged element
  const rect = dropzone.getBoundingClientRect();
  const dropPosition = event.clientY - rect.top;
  const components = Array.from(dropzone.querySelectorAll('.component'));

  let insertIndex = components.findIndex(component => {
      const componentRect = component.getBoundingClientRect();
      const componentTop = componentRect.top - rect.top;
      const componentBottom = componentTop + componentRect.height;
      return dropPosition < (componentTop + componentBottom) / 2;
  });

  if (insertIndex === -1) {
      insertIndex = components.length;
  }

  dropzone.insertBefore(draggableElement, components[insertIndex]);
}

});
