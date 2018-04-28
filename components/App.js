import FilePicker from './FilePicker.js';
import BlockComponent from './BlockComponent.js';
import ColorPickerComponent from './ColorPickerComponent.js';
import MyBlocksComponent from './MyBlocksComponent.js';
import QuiltPlanComponent from './QuiltPlanComponent.js';

export default class App {
    constructor() {
        // Create child components
        this.filePicker = new FilePicker();
        this.blockComponent = new BlockComponent();
        this.colorPickerComponent = new ColorPickerComponent();
        this.myBlocksComponent = new MyBlocksComponent();
        this.quiltPlanComponent = new QuiltPlanComponent();

        // Create my HTML
        this.element = document.createElement('div');
        this.element.innerHTML = `
            <main class="container">
                <div class="left"></div>
            </main>
            <div class="quiltPlanContainer"></div>
            `;

        // Obtain references to elements in HTML
        this.mainContainer = this.element.querySelector('.container');
        this.leftContainer = this.element.querySelector('.left');
        this.quiltPan = this.element.querySelector('.quiltPlanContainer');

        // insert child components into DOM
        this.leftContainer.appendChild(this.filePicker.render());
        this.leftContainer.appendChild(this.myBlocksComponent.render());
        this.mainContainer.appendChild(this.blockComponent.render());
        this.mainContainer.appendChild(this.colorPickerComponent.render());
        this.quiltPan.appendChild(this.quiltPlanComponent.render());
    }

    render() {
        return this.element;
    }
}