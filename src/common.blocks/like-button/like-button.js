import Component from "@frontend/component";
import LikeButtonView from "./like-button-view";

export default class LikeButton extends Component {

  constructor(rootElement, parent = {}) {
    super({root: rootElement, parent: parent});

    this.setConsts();
    this.setInitialState();
    this.VIEW = new LikeButtonView(this);
  }

  setState() {
    this.state = {
      liked: {
        value: false,
        subscribers: [
          
        ]
      },
      likesNumber: {
        value: 0,
        subscribers: [

        ]
      }
    }
  }

  setConsts() {
    this.CLASSES = {
      ICON: "like-button__icon",
      INPUT: "like-button__number",
      ROOT_LIKED: "like-button_liked",
      ICON_LIKED: "like-button__icon_liked",
      INPUT_LIKED: "like-button__number_liked"
    }

    this.DOM = {
      ICON: this.root.find(`.${this.CLASSES.ICON}`),
      INPUT: this.root.find(`.${this.CLASSES.INPUT}`)
    }

    this.VOCABULARY = {
      STAR: "favorite",
      STAR_BORDER: "favorite_border"
    }
  }

  setInitialState() {    
    this.likesNumber = this.DOM.INPUT.val();
    
    if (this.root.hasClass(this.CLASSES.ROOT_LIKED)){
      this.liked = true;
    }
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

}