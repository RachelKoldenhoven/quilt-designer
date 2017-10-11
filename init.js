export default function init() {
  document.getElementById('hello').innerHTML = 'Welcome to Quilt Planner!';

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  document.getElementById('1').addEventListener('change', selectColor, false);
  document.getElementById('1').addEventListener('click', selectGroup, false);

  document.getElementById('addGroup').addEventListener('click', addGroup);
}

let selectedGroup = 1;
let color1 = '#545454';
document.getElementById('color1').style.background = color1;
let selectedColor = color1;

function handleFileSelect(evt) {
  let files = evt.target.files; // FileList object

  // files is a FileList of File objects.
  let block = files[0];

  // only handle svg files
  if(block.type !== 'image/svg+xml') {
    alert("Please choose a file with the extension '.svg'");
    return;
  }

  let reader = new FileReader;
  reader.onload = (function (theFile) {
    return function (e) {
      // add shapes to a group
      let group =  (e) => {
        let node = e.target;
        node.setAttribute('class', selectedGroup);
        node.style.fill = selectedColor;
      };
      
      let rawBlock = e.target.result;

      let parser = new DOMParser();
      let parsedBlock = parser.parseFromString(rawBlock, "image/svg+xml");
      // childNodes are [comment, <!DOCTYPE svg>, svg#Layer_1]
      console.log(parsedBlock.childNodes[2]);
      for(let i = 1; i < parsedBlock.childNodes[2].children.length; i++) {
        parsedBlock.childNodes[2].children[i].addEventListener('click', group);
      }
      // returns a SVGDocument

      let svg = document.getElementById('selectedBlock');
      svg.appendChild(parsedBlock.documentElement);
    };
  })(block);

  reader.readAsText(block);
}

// color selection
const selectColor = (event) => {
  selectedColor = '#' + event.target.value;
  let shapes = document.getElementsByClassName(selectedGroup);
  console.log(shapes);
  for(let i = 0; i< shapes.length; i++) {
    shapes[i].style.fill = selectedColor;
  }
  document.getElementById(`color${selectedGroup}`).style.background = selectedColor;
};

// add shape/color groups
const addGroup = () => {
  // append group info to DOM
  // change selected group
  selectedGroup += 1;
  let newGroup = document.createElement('div');
  newGroup.innerHTML =
    `<div class="colorGroup">
        <h1>${selectedGroup}</h1>
        <div class="colorInput">
            <label for="${selectedGroup}">Enter a hex color code</label>
            <input type="text" 
                   name="${selectedGroup}" 
                   id="${selectedGroup}" 
                   placeholder="545454">
        </div>
        <div class="selectedColor" id="color${selectedGroup}"></div>
    </div>`;
  document.querySelector('div.groups').appendChild(newGroup);
  document.getElementById(`${selectedGroup}`).addEventListener('change', selectColor, false);
};

// select a group to edit
const selectGroup = (event) => {
  console.log("selected group: ", event.target);
  selectedGroup = event.target.id;
};