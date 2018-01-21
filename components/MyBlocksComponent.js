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
        this.addClickHandler(event.block);
        this.myBlocks.appendChild(event.block);
    }

    // click to select block back to design area
    addClickHandler(block) {
        block.addEventListener('click', e => this.editBlock(e.currentTarget));
    }

    editBlock(block) {
        EventService.dispatch({
            type: 'edit_block',
            block: block
        })
    }

    render() {
        return this.element;
    }
}