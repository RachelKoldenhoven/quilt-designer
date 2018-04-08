import EventService from '../services/EventService.js';

export default class QuiltPlanComponent {
    constructor() {
        EventService.addEventListener('render_quilt', e => this.renderQuilt(e));
        EventService.addEventListener('edit_block', e => this.setChosenBlock(e));
        EventService.addEventListener('set_block', e => this.setChosenBlock(e));
        this.element = document.createElement('div');
        this.element.innerHTML = `
            <h3>Quilt Plan</h3>
            <label>
                Number of Blocks Across (Max 12)
                <input type="number" min="1" max="12" name="across">
            </label>
            <label>
                Number of Blocks Down (Max 12)
                <input type="number" min="1" max="12" name="down">            
            </label>
            <div class="myQuilt"></div>
            `;
        this.element.className = 'quiltPlanComp';
        this.across = this.element.querySelector('input[name="across"]');
        this.down = this.element.querySelector('input[name="down"]');
        this.myQuilt = this.element.querySelector('.myQuilt');
        this.across.addEventListener('change', e => this.setAcross(e));
        this.down.addEventListener('change', e => this.setDown(e));
    }

    setChosenBlock(e) {
        this.chosenBlock = e.block;
    }

    setAcross(e) {
        this.blocksAcross = e.target.value;
    }

    setDown(e) {
        this.blocksDown = e.target.value;
    }

    changeBlock(e) {
        const blockToReplace = e.target.parentNode.parentElement;
        const parent = blockToReplace.parentElement;
        const replacementBlock = this.chosenBlock.cloneNode(true);
        parent.replaceChild(replacementBlock, blockToReplace);
    }

    renderQuilt(event) {
        const blockContainer = document.createElement('div');
        blockContainer.className = 'quiltPlanBlock';
        const block = event.block;
        blockContainer.appendChild(block);
        for (let i = 0; i < this.blocksDown; i++) {
            const row = document.createElement('div');
            row.className = 'blockRow';
            for (let x = 0; x < this.blocksAcross; x++) {
                let rowBlock = blockContainer.cloneNode(true);
                rowBlock.addEventListener('click', e => this.changeBlock(e));
                row.appendChild(rowBlock);
                this.myQuilt.appendChild(row);
            }
        }
    }

    render() {
        return this.element;
    }
}