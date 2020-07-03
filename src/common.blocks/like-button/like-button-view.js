import ComponentView from '@frontend/componentView';

class LikeButtonView extends ComponentView {
  constructor(controller = {}) {
    super(controller);

    this.CLASSES = require('./like-button.classes');
    this.VOCABULARY = require('./like-button.config').vocabulary;
    this.DOM = this.CONTROLLER.DOM;
  }

  setState() {
    this.state = {
      liked: {
        value: true,
        subscribers: [
          this.renderLikeButton.bind(this),
        ],
      },
      likesNumber: {
        value: 0,
        subscribers: [
          this.changeNumber.bind(this),
        ],
      },
    };
  }

  renderLikeButton() {
    if (this.liked) {
      this.root.classList.add(this.CLASSES.ROOT_LIKED);
      this.DOM.ICON.classList.add(this.CLASSES.ICON_LIKED);
      this.DOM.INPUT.classList.add(this.CLASSES.INPUT_LIKED);
      this.DOM.ICON.innerHTML = this.VOCABULARY.iconLiked;
    } else {
      this.root.classList.remove(this.CLASSES.ROOT_LIKED);
      this.DOM.ICON.classList.remove(this.CLASSES.ICON_LIKED);
      this.DOM.INPUT.classList.remove(this.CLASSES.INPUT_LIKED);
      this.DOM.ICON.innerHTML = this.VOCABULARY.icon;
    }
  }

  changeNumber() {
    this.DOM.INPUT.value = this.likesNumber;
  }
}

export default LikeButtonView;
