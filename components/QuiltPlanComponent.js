import EventService from '../services/EventService.js';

export default class QuiltPlanComponent {
    constructor() {
        // Event bus
        EventService.addEventListener('render_quilt', e => this.renderQuilt(e));
        EventService.addEventListener('block_selected', e => this.setChosenBlock(e));

        // Render
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
            <button class="downloadBtn">Generate My Quilt svg</button>
            <a href="javascript:void(0)" style="visibility: hidden" class="downloadLink">Download SVG</a>
            `;
        this.element.className = 'quiltPlanComp';

        // Get references
        this.across = this.element.querySelector('input[name="across"]');
        this.down = this.element.querySelector('input[name="down"]');
        this.myQuilt = this.element.querySelector('.myQuilt');
        this.downloadBtn = this.element.querySelector('.downloadBtn');
        this.downloadLink = this.element.querySelector('.downloadLink');

        // Hook up listeners
        this.across.addEventListener('change', e => this.setAcross(e));
        this.down.addEventListener('change', e => this.setDown(e));
        this.downloadBtn.addEventListener('click', () => this.startDownload());
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

    startDownload() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        for (let y = 0; y < this.blocksDown; y++) { // TODO: iterate over divs, not blocks down
            const row = document.createElementNS("http://www.w3.org/2000/svg", "g");
            row.setAttributeNS("http://www.w3.org/2000/svg", "transform", `translate(0,${y * 200})`);
            for (let x = 0; x < this.blocksAcross; x++) { // TODO: iterate over divs, not blocks down
                const cell = document.createElementNS("http://www.w3.org/2000/svg", "g");
                cell.setAttributeNS("http://www.w3.org/2000/svg", "transform", `translate(${x * 200},0)`);

                // TODO: dump contents of SVG into cell

                row.appendChild(cell);
            }
            svg.appendChild(row);
        }

        const text = svg.outerHTML;
        const file = new Blob([text], {type: 'image/svg+xml'});
        this.downloadLink.href = URL.createObjectURL(file);
        this.downloadLink.download = name;
        this.downloadLink.style.visibility = "visible";
    }

    render() {
        return this.element;
    }
}