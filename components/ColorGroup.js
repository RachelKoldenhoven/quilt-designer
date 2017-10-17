import EventService from '../services/EventService.js';

export default class ColorGroup {
  constructor(name) {
    this.name = name;
    this.element = document.createElement('div');
    this.element.innerHTML = `
      <h1>${this.name}</h1>
      <div class="colorInput">
          <label for="${this.name}">Enter a hex color code</label>
          <input type="text"
                 id="${this.name}"
                 placeholder="545454">
      </div>
      <div class="selectedColor"></div>
      `;
    this.element.className = 'colorGroup';
    this.colorInputEl = this.element.querySelector('input');
    this.selectedColorEl = this.element.querySelector('.selectedColor');
    this.colorInputEl.addEventListener('change', e => this.selectColor(e));
    this.colorInputEl.addEventListener('click', e => this.selectGroup(e));

    this.setColor('#545454');
  }

  selectColor(event) {
     this.setColor("#" + event.target.value);
  }

  selectGroup() {
    EventService.dispatch({
      type: 'ColorGroup_change',
      group: {
        color: this._selectedColor,
        name: this.name
      }
    });
  }

  setColor(color) {
    this._selectedColor = color;
    this.selectedColorEl.style.background = this._selectedColor;
    this.selectGroup();
  }

  render() {
    return this.element;
  }
}