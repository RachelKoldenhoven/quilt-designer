// Constants
const COLORABLE_ELEMENTS = {
    "polygon": true,
    "rect": true
};

export default class BlockWidget {
    constructor() {
        this.el = document.createElement('div');
    }

    set currentGroup(group) {
        this.selectedGroup = group;
    }

    set svg(doc) {
        const addListener = (el) => {
            if (COLORABLE_ELEMENTS[el.nodeName]) {
                // add shapes to a group
                el.addEventListener('click', () => {
                    el.setAttribute('class', this.selectedGroup.name);
                    el.style.fill = this.selectedGroup.color;
                });
            }
            for (let child of el.childNodes) {
                addListener(child);
            }
        }
        addListener(doc);

        // Replace contents
        this.el.innerHTML = '';
        this.el.appendChild(doc.documentElement);
    }

    render() {
        return this.el;
    }
}