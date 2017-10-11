// Constants
const COLORABLE_ELEMENTS = {
  "polygon": true,
  "rect": true
};

// Mutable app state
const state = {
  groups: [],
  selectedGroupIdx: -1
}

// Grab elements
const groupsEl = document.querySelector('div.groups');
const filesEl = document.getElementById('files');
const groupBtn = document.getElementById('addGroup');
const svg = document.getElementById('selectedBlock');

// add shape/color groups
const addGroup = () => {
  const currentGroupIdx = state.selectedGroupIdx + 1;
  const groupObj = {
    color: '#545454'
  }

  // append group info to DOM
  const groupEl = document.createElement('div');
  groupEl.innerHTML = `<div class="colorGroup">
      <h1>${currentGroupIdx+1}</h1>
      <div class="colorInput">
          <label>Enter a hex color code</label>
          <input type="text" placeholder="545454">
      </div>
      <div class="selectedColor"></div>
    </div>`;

  // Grab elements
  const colorInput = groupEl.querySelector('input');
  const colorSwab = groupEl.querySelector('.selectedColor');
  
  // Define event handlers
  const selectGroup = () => {
    console.log("selected group: ", currentGroupIdx);
    state.selectedGroupIdx = currentGroupIdx;
  };
  const selectColor = () => {
    const currentGroup = state.groups[state.selectedGroupIdx];
    currentGroup.color = '#' + colorInput.value;
    const shapes = document.getElementsByClassName(state.selectedGroupIdx);
    console.log(shapes);
    for(let shape of shapes) {
      shape.style.fill = currentGroup.color;
    }
    colorSwab.style.background = currentGroup.color;
  };

  // Hook up listeners
  colorInput.addEventListener('change', selectColor, false);
  colorInput.addEventListener('click', selectGroup, false);

  // change selected group
  state.groups.push(groupObj);
  state.selectedGroupIdx = currentGroupIdx;
  groupsEl.appendChild(groupEl);
};

const handleFileSelect = (evt) => {
  const block = evt.target.files[0];
  if (block.type !== 'image/svg+xml') {
    alert("Please choose a file with the extension '.svg'");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const parsedBlock = new DOMParser().parseFromString(e.target.result, "image/svg+xml");
    const addListener = (el) => {
      if (COLORABLE_ELEMENTS[el.nodeName]) {
        // add shapes to a group
        el.addEventListener('click', () => {
          el.setAttribute('class', state.selectedGroupIdx);
          el.style.fill = state.groups[state.selectedGroupIdx].color;
        });
      }
      for (let child of el.childNodes) {
        addListener(child);
      }
    }
    addListener(parsedBlock);

    svg.innerHTML = '';
    svg.appendChild(parsedBlock.documentElement);
  };
  reader.readAsText(block);
}

// Hook up listeners
filesEl.addEventListener('change', handleFileSelect, false);
groupBtn.addEventListener('click', addGroup);

// Add the initial group
addGroup();

