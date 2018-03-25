import EventService from '../services/EventService.js';

export default class QuiltPlanComponent {
    constructor() {
        EventService.addEventListener('render_quilt', e => this.renderQuilt(e));
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

    setAcross(e) {
        this.blocksAcross = e.target.value;
    }

    setDown(e) {
        this.blocksDown = e.target.value;
    }

    renderQuilt(event) {
        const blockContainer = document.createElement('div');
        blockContainer.className = 'quiltPlanBlock';
        const block = event.block;
        blockContainer.appendChild(block);
        const row = document.createElement('div');
        row.className = 'blockRow';
        let i = 0;
        while (i < this.blocksAcross) {
            row.appendChild(blockContainer.cloneNode(true));
            i++;
        }
        let x = 0;
        while (x < this.blocksDown) {
            this.myQuilt.appendChild(row.cloneNode(true));
            x++;
        }
    }

    render() {
        return this.element;
    }
}