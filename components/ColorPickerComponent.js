import ColorGroup from './ColorGroup.js';

export default class ColorPickerComponent {
    constructor() {
        this.colorGroups = [];

        this.element = document.createElement('aside');
        this.element.innerHTML = `
            <h3>Color Groups</h3>
            <div class="groups">
            </div>
            <button>Add a Group</button>
            `;
        this.element.className = 'colorPicker';
        this.addGroupBtn = this.element.querySelector('button');
        this.groupContainer = this.element.querySelector('.groups');
        this.addGroupBtn.addEventListener('click', e => this.addGroup(e));
    }

    addGroup() {
        // TODO: what about if we can delete groups?
        const name = this.colorGroups.length + 1;
        let colorGroup = new ColorGroup(name);
        this.groupContainer.appendChild(colorGroup.render());
        this.colorGroups.push(colorGroup);
    }

    render() {
        return this.element;
    }
}