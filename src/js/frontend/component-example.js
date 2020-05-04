import Component from './component.js';

class RateButton extends Component {

  constructor(rootElement, parentState = {}) {
    super(parentState);

    this.root = rootElement;
    this.bindEventListeners();
  }

  setState() {
    this.state = {
      pressed: {
        value: false,
        isGlobal: true,
        subscribers: [
          this.changeSomething.bind(this)
        ]
      },
      var: {
        value: "someValue"
      }
    };
  }

  changeSomething() {
    if (this.state.pressed.value)
      this.root.css("background", "red");
    else
      this.root.css("background", "white");
  }

  bindEventListeners() {
    this.root.on("click", this.handler.bind(this));
  }

  handler() {
    this.pressed = !this.pressed;
  }

}

class ParentClass extends Component {

  constructor(rootElement) {
    super();

    this.root = rootElement;
    this.setChildren();
    this.bindListeners();
  }

  setState() {
    this.state = {
      pressed: {
        value: true,
        subscribers: [
          this.changeSomething.bind(this)
        ]
      }
    };
  }

  setChildren() {
    this.children = [
      new RateButton($(".block"), this.state)
    ];
  }

  changeSomething() {
    if (this.state.pressed.value)
      this.root.css("background", "red");
    else
      this.root.css("background", "white");
  }

  bindListeners() {
    this.root.on("click", this.handler.bind(this));
  }

  handler() {
    this.pressed = !this.pressed;
  }
}

let testComponent = new ParentClass($(".testComponent"));
console.log(testComponent);