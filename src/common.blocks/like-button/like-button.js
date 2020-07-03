import Component from '@frontend/component';
import LikeButtonView from './like-button-view';

class LikeButton extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });

    this.CLASSES = require('./like-button.classes');
    this.DOM = this.getDOM();

    this.setInitialState();
    this.VIEW = new LikeButtonView(this);
  }

  setState() {
    this.state = {
      liked: {
        value: false,
        subscribers: [],
      },
      likesNumber: {
        value: 0,
        subscribers: [],
      },
    };
  }

  getDOM() {
    return {
      ICON: this.root.querySelector(`.${this.CLASSES.ICON}`),
      INPUT: this.root.querySelector(`.${this.CLASSES.INPUT}`),
    };
  }

  setInitialState() {
    this.likesNumber = parseInt(this.DOM.INPUT.value, 10);

    if (this.root.classList.contains(this.CLASSES.ROOT_LIKED)) {
      this.liked = true;
    }
  }

  clickHandler() {
    if (this.liked) this.decreaseNumber();
    else this.increaseNumber();

    this.liked = !this.liked;
  }

  increaseNumber() {
    this.likesNumber += 1;
  }

  decreaseNumber() {
    if (this.likesNumber > 0) this.likesNumber -= 1;
  }
}

export default LikeButton;
