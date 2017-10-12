import App from './App.js';

describe('App', function () {

  it('should have welcome message', function () {
    const app = new App();

    const el = app.render();

    expect(el.querySelector('header').innerText).toBe('Welcome to Quilt Planner!');
  })

  it('should set blockWidget.svg when a file is selected', function () {
    const app = new App();
    const expected = {};
    let d = undefined;

    Object.defineProperty(app.blockWidget, 'svg', { set: (doc) => { d = doc } });
    
    const el = app.onFileSelect(expected);

    expect(d).toBe(expected);
  })

  it('should set blockWidget.selectedGroup when a file is selected', function () {
    const app = new App();
    const expected = {};
    let d = undefined;

    Object.defineProperty(app.blockWidget, 'selectedGroup', { set: (doc) => { d = doc } });
    
    const el = app.onGroupChange(expected);

    expect(d).toBe(expected);
  })
});
