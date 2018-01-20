import EventService from '../services/EventService.js';

const ClickableShapes = {
    polygon: true,
    rect: true,
    path: true
};

export default class BlockComponent {
    constructor() {
        EventService.addEventListener('ColorGroup_change', e => this.onColorGroupChange(e));
        this.element = document.createElement('section');
        this.element.innerHTML = `
            <article class="selectedBlock"></article>
            `;
        this.element.className = 'center';
        this.blockContainer = this.element.querySelector('.selectedBlock');
    }

    setBlock(block) {
        this.addClickHandler(block);
        this.blockContainer.appendChild(block);
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

    render() {
        return this.element;
    }
}