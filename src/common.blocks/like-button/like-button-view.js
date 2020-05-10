import ComponentView from "@frontend/componentView";

export default class LikeButtonView extends ComponentView {

  constructor(controller = {}) {
    super(controller);

    this.CLASSES = this.CONTROLLER.CLASSES;
    this.DOM = this.CONTROLLER.DOM;
    this.VOCABULARY = this.CONTROLLER.VOCABULARY;
  }

  setState() {
    this.state = {
      liked: {
        value: true,
        subscribers: [
          this.renderLikeButton.bind(this)
        ]
      },
      likesNumber: {
        value: 0,
        subscribers: [
          this.changeNumber.bind(this)
        ]
      }
    }
  }

  renderLikeButton() {
    if (this.liked) {
      this.root.addClass(this.CLASSES.ROOT_LIKED);
      this.DOM.ICON.addClass(this.CLASSES.ICON_LIKED);
      this.DOM.INPUT.addClass(this.CLASSES.INPUT_LIKED);
      this.DOM.ICON.html(this.VOCABULARY.STAR);
    }
    else {
      this.root.removeClass(this.CLASSES.ROOT_LIKED);
      this.DOM.ICON.removeClass(this.CLASSES.ICON_LIKED);
      this.DOM.INPUT.removeClass(this.CLASSES.INPUT_LIKED);
      this.DOM.ICON.html(this.VOCABULARY.STAR_BORDER);
    }
  }

  changeNumber() {
    this.DOM.INPUT.val(this.likesNumber);
  }

}