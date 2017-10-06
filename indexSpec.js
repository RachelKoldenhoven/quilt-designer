import init from './init.js';

describe('init', function () {

  it('should display welcome message', function () {

    // setup
    let element = document.createElement('div');
    element.id = 'hello';
    document.body.appendChild(element);

    let files = document.createElement('div');
    files.id = 'files';
    document.body.appendChild(files);

    // exercise
    init();

    // assert
    expect(element.innerText).toEqual('Welcome to Quilt Planner!');

    // teardown
    element.remove();
    files.remove();
  })
});
