export default class FilePicker {
    constructor() {
        this.el = document.createElement('div');
    }

    handleFileSelect(evt) {
        const block = evt.target.files[0];
        if (block.type !== 'image/svg+xml') {
            alert("Please choose a file with the extension '.svg'");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const parsedBlock = new DOMParser().parseFromString(e.target.result, "image/svg+xml");
            if(this.onSelect) this.onSelect(parsedBlock);
        };
        reader.readAsText(block);
    }

    render() {
        this.el.innerHTML =
            `<h5>Upload a quilt block file with an '.svg' extension.</h5>
            <input type="file">`;

        // Grab elements
        this.filesEl = this.el.querySelector('input[type=file]');

        // Attach event handlers
        this.filesEl.addEventListener('change', e => this.handleFileSelect(e), false);

        return this.el;
    }
}