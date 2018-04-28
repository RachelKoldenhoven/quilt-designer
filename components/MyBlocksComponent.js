import EventService from '../services/EventService.js';

export default class MyBlocksComponent {
    constructor() {
        EventService.addEventListener('update_block', e => this.updateBlock(e.block));
        EventService.addEventListener('block_file_loaded', e => this.addToMyBlocks(e.block));
        this.element = document.createElement('div');
        this.element.innerHTML = `
        <p>My Blocks</p>
        <div class="myBlocks"></div>
        `;
        this.myBlocks = this.element.querySelector('.myBlocks');
    }

    updateBlock(newBlock) {
        this.addClickHandler(newBlock);
        let blocks = this.myBlocks.childNodes;
        let blocksArray = [...blocks];
        for(let listBlock of blocksArray) {
            if(listBlock.id === newBlock.id) {
                this.myBlocks.replaceChild(newBlock, listBlock);
            }
        }
    }

    addToMyBlocks(block) {
        this.addClickHandler(block);
        this.myBlocks.appendChild(block);
    }

    // click to select block back to design area
    addClickHandler(block) {
        block.addEventListener('click', e => this.editBlock(e.currentTarget));
    }

    editBlock(block) {
        EventService.dispatch({
            type: 'block_selected',
            block: block.cloneNode(true)
        })
    }

    render() {
        return this.element;
    }
}