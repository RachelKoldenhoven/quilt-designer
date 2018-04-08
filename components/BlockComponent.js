import EventService from '../services/EventService.js';

const ClickableShapes = {
    polygon: true,
    rect: true,
    path: true
};

export default class BlockComponent {
    constructor() {
        EventService.addEventListener('ColorGroup_change', e => this.onColorGroupChange(e));
        EventService.addEventListener('edit_block', e => this.setBlock(e.block));
        this.element = document.createElement('section');
        this.element.innerHTML = `
            <article class="selectedBlock"></article>
            <div class="blockActions">
                <button class="save">Save to My Blocks</button>
                <button class="draw">Draw Quilt</button>
            </div>
            `;
        this.element.className = 'center';
        this.blockContainer = this.element.querySelector('.selectedBlock');
        this.saveBlockBtn = this.element.querySelector('.save');
        this.drawQuiltBtn = this.element.querySelector('.draw');
        this.saveBlockBtn.addEventListener('click', e => this.handleBlockSave(e), false);
        this.drawQuiltBtn.addEventListener('click', e => this.renderQuilt(e));
    }

    setBlock(block) {
        if (this.element.querySelector('.selectedBlock svg')) {
            alert('Block editing area must be empty to edit a block.  Please save the current block before editing another one.')
        } else {
            this.addClickHandler(block);
            this.blockContainer.appendChild(block);
            this.setBlockEvent(block);
        }
    }

    setBlockEvent(block) {
        EventService.dispatch({
            type: 'set_block',
            block: block
        });
    }

    addClickHandler(element) {
        if (ClickableShapes[element.tagName]) {
            element.addEventListener('click', e => this.onShapeClicked(e));
        }
        for (let child of element.childNodes) {
            this.addClickHandler(child);
        }
    }

    onShapeClicked(e) {
        e.target.setAttribute('class', this.selectedGroup.name);
        e.target.style.fill = this.selectedGroup.color;
    }

    onColorGroupChange(event) {
        this.selectedGroup = event.group;

        // TODO: control color groups through css classes, so exported SVG looks as one would expect
        // https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply
        let shapes = document.getElementsByClassName(this.selectedGroup.name);
        for (let shape of shapes) {
            shape.style.fill = this.selectedGroup.color;
        }
    }

    handleBlockSave() {
        const savedBlock = this.element.querySelector('.selectedBlock svg');
        const blockClone = savedBlock.cloneNode(true);
        EventService.dispatch({
            type: 'save_block',
            block: blockClone
        });
        this.blockContainer.removeChild(savedBlock);
    }

    renderQuilt() {
        const blockToDraw = this.element.querySelector('.selectedBlock svg');
        const blockClone = blockToDraw.cloneNode(true);
        EventService.dispatch({
            type: 'render_quilt',
            block: blockClone
        });
    }

    render() {
        return this.element;
    }
}