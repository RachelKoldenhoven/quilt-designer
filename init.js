export default function init() {
  document.getElementById('hello').innerHTML = 'Welcome to Quilt Planner!';

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  document.getElementById('colorChoice').addEventListener('change', selectColor, false);
}

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
      // function to change color of a shape on click
      let shade = function (e) {
        let node = e.target;
        node.style.fill = selectedColor;
        console.log('node: ', node);
      };
      
      let rawBlock = e.target.result;

      let parser = new DOMParser();
      let parsedBlock = parser.parseFromString(rawBlock, "image/svg+xml");
      // childNodes are [comment, <!DOCTYPE svg>, svg#Layer_1]
      console.log(parsedBlock.childNodes[2]);
      for(let i = 1; i < parsedBlock.childNodes[2].children.length; i++) {
        parsedBlock.childNodes[2].children[i].addEventListener('click', shade);
      }
      // returns a SVGDocument

      let svg = document.getElementById('selectedBlock');
      svg.appendChild(parsedBlock.documentElement);
    };
  })(block);

  reader.readAsText(block);
}

// color selection
let selectedColor = '#545454';
document.getElementById('selectedColor').style.background = selectedColor;

const selectColor = (event) => {
  selectedColor = '#' + event.target.value;
  document.getElementById('selectedColor').style.background = selectedColor;
};
