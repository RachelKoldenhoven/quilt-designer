export default class MyBlocksComponent {
    constructor() {
        this.element = document.createElement('div');
        this.element.innerHTML = `
        <p>My Blocks</p>
        `;
    }

    render() {
        return this.element;
    }
}