import FilePicker from './FilePicker.js';
import BlockComponent from './BlockComponent.js';
import ColorPickerComponent from './ColorPickerComponent.js';

export default class App {
    constructor() {
        // Create child components
        this.filePicker = new FilePicker();
        this.blockComponent = new BlockComponent();
        this.colorPickerComponent = new ColorPickerComponent();

        // Wire up child event handlers
        this.filePicker.onBlockSelected = block => this.onBlockSelected(block);

        // Create my HTML
        this.element = document.createElement('div');
        this.element.innerHTML = `
        <main class="container">
        </main>
        `;

        // Obtain references to elements in HTML
        this.mainContainer = this.element.querySelector('.container');

        // insert child components into DOM
        this.mainContainer.appendChild(this.filePicker.render());
        this.mainContainer.appendChild(this.blockComponent.render());
        this.mainContainer.appendChild(this.colorPickerComponent.render());
    }

    onBlockSelected(block) {
        this.blockComponent.setBlock(block);
    }

    render() {
        return this.element;
    }
}