import GroupWidget from './GroupWidget.js';

export default class ColorPicker {
    constructor() {
        this.el = document.createElement('div');

        this.groups = [];
        this._selectedGroup = undefined;
    }

    set selectedGroup(group) {
        this._selectedGroup = group;
    }

    addGroup() {
        const group = new GroupWidget(this.groups.length + 1);
        group.onChange = (color) => this.onGroupChange(color);
        
        this.groupsEl.appendChild(group.render());
        this.groups.push(group);
        this.selectedGroup = group;
    }

    onGroupChange(group) {
        this.selectedGroup = group;
        if(this.groupChange) this.groupChange(this.selectedGroup);
    }

    render() {
        this.el.innerHTML =
            `<h3>Color Groups</h3>
            <div class="groups">
            </div>
            <button>Add a Group</button>`;

        // Grab elements
        this.groupsEl = this.el.querySelector('.groups');
        this.addButton = this.el.querySelector('button');

        // Attach listeners
        this.addButton.addEventListener('click', e => this.addGroup(e));

        return this.el;
    }
}