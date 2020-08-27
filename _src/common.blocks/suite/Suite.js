import Component from '@frontend/Component';
import RateButton from '@blocks/rate-button/RateButton';

class Suite extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });

    this.setConsts();
    this.setInitialState();
  }

  setState() {
    this.state = {
      imageDisplayed: {
        value: 0,
        subscribers: [
          this.changeImage.bind(this),
        ],
      },
    };
  }

  setChildren() {
    this.children = [
      new RateButton(this.root.querySelector('.rate-button'), this),
    ];
  }

  setConsts() {
    this.CLASSES = {
      DOT: 'js-suite__dot',
      LEFT_ARROW: 'js-suite__left-arrow',
      RIGHT_ARROW: 'js-suite__right-arrow',
      IMAGE_INPUT: 'js-suite__image-input',
    };

    this.DOM = {
      LEFT_ARROW: this.root.querySelector(`.${this.CLASSES.LEFT_ARROW}`),
      RIGHT_ARROW: this.root.querySelector(`.${this.CLASSES.RIGHT_ARROW}`),
      DOTS: this.root.querySelectorAll(`.${this.CLASSES.DOT}`),
      IMAGES_INPUTS: this.root.querySelectorAll(`.${this.CLASSES.IMAGE_INPUT}`),
    };
  }

  setInitialState() {
    this.imagesNumber = this.DOM.DOTS.length - 1;
    this.imageDisplayed = this.imagesNumber;
  }

  clickHandler(event) {
    switch (event.target) {
      case this.DOM.LEFT_ARROW: {
        if (this.imageDisplayed === this.imagesNumber) this.imageDisplayed = 0;
        else this.imageDisplayed += 1;
        break;
      }
      case this.DOM.RIGHT_ARROW: {
        if (this.imageDisplayed === 0) this.imageDisplayed = this.imagesNumber;
        else this.imageDisplayed -= 1;
        break;
      }
      default: {
        break;
      }
    }
  }

  changeImage() {
    this.DOM.IMAGES_INPUTS[this.imageDisplayed].checked = true;
  }
}

export default Suite;
