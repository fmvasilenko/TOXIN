import Component from "@frontend/component";
import RateButtonView from "./rate-button-view";

export default class RateButton extends Component {

  constructor(root, parent) {
    super({root: root, parent: parent});

    this.setConsts();
    this.setInitialState();
    this.VIEW = new RateButtonView(this);
  }

  setState() {
    this.state = {
      rating: {
        value: 0
      }
    }
  }

  setConsts() {
    this.CLASSES = {
      STAR_WRAPPER: "rate-button__star-wrapper",
      INPUT: "rate-button__input",
      STAR: "rate-button__label"
    }

    this.DOM = {}
  }

  setInitialState() {
    let stars = [];
    let rating = 0;

    this.root.find(`.${this.CLASSES.STAR_WRAPPER}`).each( function(index, element) {
      stars[index] = {};
      stars[index].icon = $(element).find(`.${this.CLASSES.STAR}`);

      let elementChecked = $(element).find(`.${this.CLASSES.INPUT}`).attr("checked");
      if (elementChecked)
        rating = index + 1;
    }.bind(this));

    this.DOM.STARS = stars;
    this.rating = rating;
  }

  clickHandler(event) {
    if(event.target.tagName == "INPUT")
      this.rating = $(event.target).val();
  }

}