import ComponentView from '@frontend/componentView';

class RateButtonView extends ComponentView {
  constructor(controller = {}) {
    super(controller);

    this.CLASSES = require('./rate-button.classes.json');
    this.VOCABULARY = require('./rate-button.config.json').vocabulary;
    this.DOM = this.CONTROLLER.DOM;
  }

  setState() {
    this.state = {
      rating: {
        value: 0,
        subscribers: [
          this.renderRating.bind(this),
        ],
      },
    };
  }

  renderRating() {
    this.DOM.STARS.forEach((star, index) => {
      if (index < this.rating) star.icon.innerHTML = this.VOCABULARY.checkedStar;
      else star.icon.innerHTML = this.VOCABULARY.uncheckedStar;
    });
  }
}

export default RateButtonView;
