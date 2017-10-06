export default function init() {
  document.getElementById('hello').innerHTML = 'Welcome to Quilt Planner!';

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(evt) {
  let files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  let output = [];
  for (let i = 0, f; f = files[i]; i++) {
    output.push('<li><strong>', f.name, '</strong>', ' (', f.type || 'n/a', ') - ',
      f.size, ' bytes, last modified: ',
      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
      '</li>');
  }
  document.querySelector('.fileList').innerHTML = '<ul>' + output.join('') + '</ul>';
}

