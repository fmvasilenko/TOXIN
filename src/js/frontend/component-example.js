import Component from './component.js';

class RateButton extends Component {

  constructor(rootElement, parent = {}) {
    super({root: rootElement, parent: parent});
  }

  setState() {
    this.state = {
      pressed: {
        value: false,
        alias: "likeButtonPressed",
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

  clickHandler() {
    this.pressed = !this.pressed;
  }

  changeSomething() {
    if (this.pressed)
      this.root.css("background", "red");
    else
      this.root.css("background", "white");
  }

}

class ParentClass extends Component {

  constructor(rootElement) {
    super({root: rootElement});
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
      new RateButton($(".block"), parent = this)
    ];
  }

  clickHandler() {
    this.pressed = !this.pressed;
  }

  changeSomething() {
    if (this.pressed)
      this.root.css("background", "green");
    else
      this.root.css("background", "white");
  }
  
}

//let testComponent = new ParentClass($(".testComponent"));
//console.log(testComponent);