export default function init() {
  document.getElementById('hello').innerHTML = 'Welcome to Quilt Planner!';

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(evt) {
  let files = evt.target.files; // FileList object
  console.log(evt.target.files);

  // files is a FileList of File objects.
  let output = [];
  let block = files[0];
  console.log(block);
  output.push('<li><strong>', block.name, '</strong>', ' (', block.type || 'n/a', ') - ',
    block.size, ' bytes, last modified: ',
    block.lastModifiedDate ? block.lastModifiedDate.toLocaleDateString() : 'n/a',
    '</li>');

  let reader = new FileReader;
  reader.onload = (function (theFile) {
    return function (e) {
      let svg = document.getElementById('selectedBlock');
      svg.innerHTML += e.target.result;
      console.log(e.target.result);
    };
  })(block);

  reader.readAsText(block);

  document.querySelector('.fileList').innerHTML = '<ul>' + output.join('') + '</ul>';
}

