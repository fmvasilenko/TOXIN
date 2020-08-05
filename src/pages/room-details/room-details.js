import '../../scss/main.scss';

import Component from '@frontend/Component';
import Receipt from '@blocks/receipt/Receipt';
import LikeButton from '@blocks/like-button/LikeButton';

class RoomDetails extends Component {
  constructor() {
    // eslint-disable-next-line no-undef
    super({ root: document, parent: null });

    this.setDOM();
    this.setInitialState();
  }

  setState() {
    this.state = {
      coverImage: {
        value: '',
        subscribers: [
          this.changecoverImage.bind(this),
        ],
      },
      miniImage1: {
        value: '',
        subscribers: [
          this.changeMiniImage1.bind(this),
        ],
      },
      miniImage2: {
        value: '',
        subscribers: [
          this.changeMiniImage2.bind(this),
        ],
      },
    };
  }

  setClasses() {
    this.CLASSES = {
      COVER_IMAGE: 'js-room-details__cover-image',
      MINI_IMAGE: 'js-room-details__mini-image',
    };
  }

  setChildren() {
    this.children = [
      new Receipt(this.root.querySelector('.js-receipt'), this),
    ];

    const likeButtons = this.initLikeButtons();
    this.children = this.children.concat(likeButtons);
  }

  initLikeButtons() {
    const likeButtons = [];

    this.root.querySelectorAll('.js-like-button').forEach((element, index) => {
      likeButtons[index] = new LikeButton(element, this);
    });

    return likeButtons;
  }

  setDOM() {
    this.DOM = {
      COVER_IMAGE: this.root.querySelector(`.${this.CLASSES.COVER_IMAGE}`),
      MINI_IMAGE1: this.root.querySelectorAll(`.${this.CLASSES.MINI_IMAGE}`)[0],
      MINI_IMAGE2: this.root.querySelectorAll(`.${this.CLASSES.MINI_IMAGE}`)[1],
    };
  }

  setInitialState() {
    this.coverImage = this.DOM.COVER_IMAGE.src;
    this.miniImage1 = this.DOM.MINI_IMAGE1.src;
    this.miniImage2 = this.DOM.MINI_IMAGE2.src;
  }

  clickHandler(event) {
    if (this.miniImage1Clicked(event)) {
      const image = this.coverImage;
      this.coverImage = this.miniImage1;
      this.miniImage1 = image;
    } else if (this.miniImage2Clicked(event)) {
      const image = this.coverImage;
      this.coverImage = this.miniImage2;
      this.miniImage2 = image;
    }
  }

  changecoverImage() {
    this.DOM.COVER_IMAGE.src = this.coverImage;
  }

  changeMiniImage1() {
    this.DOM.MINI_IMAGE1.src = this.miniImage1;
  }

  changeMiniImage2() {
    this.DOM.MINI_IMAGE2.src = this.miniImage2;
  }

  miniImage1Clicked(event) {
    return event.target.closest(`.${this.CLASSES.MINI_IMAGE}`) === this.DOM.MINI_IMAGE1;
  }

  miniImage2Clicked(event) {
    return event.target.closest(`.${this.CLASSES.MINI_IMAGE}`) === this.DOM.MINI_IMAGE2;
  }
}

// eslint-disable-next-line no-unused-vars
const roomDetails = new RoomDetails();
