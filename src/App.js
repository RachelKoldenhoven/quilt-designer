import FilePicker from './FilePicker.js';
import ColorPicker from './ColorPicker.js';
import BlockWidget from './BlockWidget.js';

export default class App {
    constructor() {
        this.el = document.createElement('div');
        
        this.filePicker = new FilePicker();
        this.colorPicker = new ColorPicker();
        this.blockWidget = new BlockWidget();

        this.filePicker.onSelect = e => this.onFileSelect(e);
        this.colorPicker.onGroupChange = e => this.onGroupChange(e);
    }

    onFileSelect(doc) {
        this.blockWidget.svg = doc;
    }

    onGroupChange(group) {
        this.blockWidget.selectedGroup = group;
    }

    render() {
        this.el.innerHTML =
            `<div id="main">
                <header>Welcome to Quilt Planner!</header>
                <main class="container">
                    <aside class="fileUpload">
                    </aside>
                    <section class="center">
                        <article class="selectedBlock"></article>
                    </section>
                    <aside class="colorPicker">
                    </aside>
                </main>
            </div>`;

        // Store references
        this.uploadEl = this.el.querySelector('.fileUpload');
        this.colorPickerEl = this.el.querySelector('.colorPicker');
        this.selectedBlockEl = this.el.querySelector('.selectedBlock');
        
        // Append children
        this.uploadEl.appendChild(this.filePicker.render());
        this.colorPickerEl.appendChild(this.colorPicker.render());
        this.selectedBlockEl.appendChild(this.blockWidget.render());
        
        return this.el;
    }
}