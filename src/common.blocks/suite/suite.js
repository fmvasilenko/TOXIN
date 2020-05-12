import Component from "@frontend/component";
import RateButton from "@blocks/rate-button/rate-button";

export default class Suite extends Component {

  constructor(root, parent = {}) {
    super({root: root, parent: parent});

    this.setConsts();
    this.setInitialState();
  }

  setState() {
    this.state = {
      imageDisplayed: {
        value: 0,
        subscribers: [
          this.changeImage.bind(this)
        ]
      }
    }
  }

  setChildren() {
    this.children = [
      new RateButton(this.root.find(".rate-button"), this)
    ]
  }

  setConsts() {
    this.CLASSES = {
      DOT: "suite__dot",
      LEFT_ARROW: "suite__left-arrow",
      RIGHT_ARROW: "suite__right-arrow",
      IMAGE_INPUT: "suite__image-input"
    }

    this.DOM = {
      LEFT_ARROW: this.root.find(`.${this.CLASSES.LEFT_ARROW}`),
      RIGHT_ARROW: this.root.find(`.${this.CLASSES.RIGHT_ARROW}`),
      DOTS: this.root.find(`.${this.CLASSES.DOT}`),
      IMAGES_INPUTS: this.root.find(`.${this.CLASSES.IMAGE_INPUT}`)
    }
  }

  setInitialState() {
    this.imagesNumber = this.DOM.DOTS.length - 1;
    this.imageDisplayed = this.imagesNumber;
  }

  clickHandler(event) {
    switch (event.target) {
      case this.DOM.LEFT_ARROW[0]: {
        if (this.imageDisplayed == this.imagesNumber) this.imageDisplayed = 0;
        else this.imageDisplayed++;
        break;
      }
      case this.DOM.RIGHT_ARROW[0]: {
        if (this.imageDisplayed == 0) this.imageDisplayed = this.imagesNumber;
        else this.imageDisplayed--;
        break;
      }
    }
  }

  changeImage() {
    this.DOM.IMAGES_INPUTS[this.imageDisplayed].checked = true;
  }

}