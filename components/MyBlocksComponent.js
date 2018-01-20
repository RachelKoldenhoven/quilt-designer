import EventService from '../services/EventService.js';

export default class MyBlocksComponent {
    constructor() {
        EventService.addEventListener('save_block', e => this.addToMyBlocks(e));
        this.element = document.createElement('div');
        this.element.innerHTML = `
        <p>My Blocks</p>
        <div class="myBlocks"></div>
        `;
        this.myBlocks = this.element.querySelector('.myBlocks');
    }

    addToMyBlocks(event) {
        this.myBlocks.appendChild(event.block);
    }

    render() {
        return this.element;
    }
}