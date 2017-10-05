import hello from './helloWorld.js';

describe('hello', function () {

  it('should display hello world', function () {

    // setup
    let element = document.createElement('div');
    element.id = 'main';
    document.body.appendChild(element);

    // exercise
    hello();

    // assert
    expect(element.innerText).toEqual('Hello World');

    // teardown
    element.remove();
  })
});
