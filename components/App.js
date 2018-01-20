import FilePicker from './FilePicker.js';
import BlockComponent from './BlockComponent.js';
import ColorPickerComponent from './ColorPickerComponent.js';
import MyBlocksComponent from './MyBlocksComponent.js';

export default class App {
    constructor() {
        // Create child components
        this.filePicker = new FilePicker();
        this.blockComponent = new BlockComponent();
        this.colorPickerComponent = new ColorPickerComponent();
        this.myBlocksComponent = new MyBlocksComponent();

        // Wire up child event handlers
        this.filePicker.onBlockSelected = block => this.onBlockSelected(block);

        // Create my HTML
        this.element = document.createElement('div');
        this.element.innerHTML = `
            <main class="container">
                <div class="left"></div>
            </main>
            `;

        // Obtain references to elements in HTML
        this.mainContainer = this.element.querySelector('.container');
        this.leftContainer = this.element.querySelector('.left');

        // insert child components into DOM
        this.leftContainer.appendChild(this.filePicker.render());
        this.leftContainer.appendChild(this.myBlocksComponent.render());
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