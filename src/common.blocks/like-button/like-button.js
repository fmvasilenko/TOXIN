import Component from "@frontend/component";

export default class LikeButton extends Component {

  constructor(rootElement, parentState = {}) {
    super(parentState);

    this.root = rootElement;
    this.setConsts();
    this.setInitialState();
    this.bindEventListeners();
  }

  setState() {
    this.state = {
      liked: {
        value: false,
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

  setConsts() {
    this.ICON_CLASS = "like-button__icon";
    this.INPUT_CLASS = "like-button__number";
    this.ROOT_CLASS_LIKED = "like-button_liked";
    this.ICON_CLASS_LIKED = "like-button__icon_liked";
    this.INPUT_CLASS_LIKED = "like-button__number_liked";
  }

  setInitialState() {
    this.icon = this.root.find(`.${this.ICON_CLASS}`);
    this.input = this.root.find(`.${this.INPUT_CLASS}`);
    this.likesNumber = this.input.val();
    
    if (this.root.hasClass(this.ROOT_CLASS_LIKED)){
      this.liked = true;
    }
  }

  bindEventListeners() {
    this.root.click(this.clickHandler.bind(this));
  }

  clickHandler() {
    if (this.liked){
      this.decreaseNumber();
    }
    else {
      this.increaseNumber();
    }

    this.liked = !this.liked;
  }

  increaseNumber() {
    this.likesNumber++;
  }

  decreaseNumber() {
    if (this.likesNumber > 0)
      this.likesNumber--;
  }

  renderLikeButton() {
    if (this.liked) {
      this.root.addClass(this.ROOT_CLASS_LIKED);
      this.icon.addClass(this.ICON_CLASS_LIKED);
      this.input.addClass(this.INPUT_CLASS_LIKED);
    }
    else {
      this.root.removeClass(this.ROOT_CLASS_LIKED);
      this.icon.removeClass(this.ICON_CLASS_LIKED);
      this.input.removeClass(this.INPUT_CLASS_LIKED);
    }
  }

  changeNumber() {
    this.input.val(this.likesNumber);
  }

}