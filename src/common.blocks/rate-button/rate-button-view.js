import ComponentView from "@frontend/componentView";

export default class RateButtonView extends ComponentView {

  constructor(controller = {}) {
    super(controller);

    this.CLASSES = this.CONTROLLER.CLASSES;
    this.DOM = this.CONTROLLER.DOM;
    this.setConsts();
  }

  setState() {
    this.state = {
      rating: {
        value: 0,
        subscribers: [
          this.renderRating.bind(this)
        ]
      }
    }
  }

  setConsts() {
    this.VOCABULARY = {
      CHECKED_STAR: "star",
      UNCHECKED_STAR: "star_border"
    }
  }

  renderRating() {
    this.DOM.STARS.forEach( function(star, index) {
      if (index < this.rating) {
        star.icon.html(this.VOCABULARY.CHECKED_STAR);
      }
      else
        star.icon.html(this.VOCABULARY.UNCHECKED_STAR);
    }.bind(this));
  }

}