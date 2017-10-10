export default function init() {
  document.getElementById('hello').innerHTML = 'Welcome to Quilt Planner!';

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(evt) {
  let files = evt.target.files; // FileList object

  // files is a FileList of File objects.
  let output = [];
  let block = files[0];

  // only handle svg files
  if(block.type !== 'image/svg+xml') {
    alert("Please choose a file with the extension '.svg'");
    return;
  }

  output.push('<li><strong>', block.name, '</strong>', ' (', block.type || 'n/a', ') - ',
    block.size, ' bytes, last modified: ',
    block.lastModifiedDate ? block.lastModifiedDate.toLocaleDateString() : 'n/a',
    '</li>');

  let reader = new FileReader;
  reader.onload = (function (theFile) {
    return function (e) {
      // function to change color of a shape on click
      let shade = function (e) {
        let node = e.target;
        node.style.fill = 'red';
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

  document.querySelector('.fileList').innerHTML = '<ul>' + output.join('') + '</ul>';
}

