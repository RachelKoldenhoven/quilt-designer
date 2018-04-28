import EventService from '../services/EventService.js';

export default class FilePicker {
    constructor() {
        this.element = document.createElement('aside');
        this.element.innerHTML = `
            <h5>Upload a quilt block file with an '.svg' extension.</h5>
            <input type="file">
            `;
        this.element.className = 'fileUpload';
        this.fileInputEl = this.element.querySelector('input[type=file]');
        this.fileInputEl.addEventListener('change', e => this.handleFileSelect(e), false);
    }

    handleFileSelect(event) {
        let reader = new FileReader;
        reader.onload = e => this.onFileLoaded(e);
        reader.readAsText(event.target.files[0]);
    }

    generateBlockID () {
        // TODO: Use a UUID
        return 'id-' + Math.random().toString(36).substr(2, 16);
    }

    onFileLoaded(event) {
        let parser = new DOMParser();
        let parsedBlock = parser.parseFromString(event.target.result, "image/svg+xml");
        const blockID = this.generateBlockID();
        parsedBlock.documentElement.setAttribute('id', blockID);
        EventService.dispatch({
            type: 'block_file_loaded',
            block: parsedBlock.documentElement
        });
    }

    render() {
        return this.element;
    }
}