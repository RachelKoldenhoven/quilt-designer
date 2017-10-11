export default class GroupWidget {
    constructor(name) {
        this.el = document.createElement('div');

        this.name = name;
        this.color = '#545454';
    }

    selectGroup() {
        if(this.onChange) this.onChange(this);
    }
    
    selectColor() {
        this.color = '#' + this.colorInput.value;
        this.colorSwab.style.background = this.color;
        if(this.onChange) this.onChange(this);
    }

    render() {
        this.el.innerHTML = `<div class="colorGroup">
            <h1>${this.name}</h1>
            <div class="colorInput">
                <label>Enter a hex color code</label>
                <input type="text" placeholder="545454">
            </div>
            <div class="selectedColor"></div>
          </div>`;

        // Grab elements
        this.colorInput = this.el.querySelector('input');
        this.colorSwab = this.el.querySelector('.selectedColor');

        // Hook up listeners
        this.colorInput.addEventListener('change', e => this.selectColor(e), false);
        this.colorInput.addEventListener('click', e => this.selectGroup(e), false);

        return this.el;
    }
}