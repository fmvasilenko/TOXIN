import Component from '@frontend/Component';
import RateButtonView from './RateButtonView';

class RateButton extends Component {
  constructor(root, parent) {
    super({ root, parent });

    this.CLASSES = require('./rate-button.classes.json');
    this.DOM = {};

    this.setInitialState();
    this.VIEW = new RateButtonView(this);
  }

  setState() {
    this.state = {
      rating: {
        value: 0,
      },
    };
  }

  setInitialState() {
    const stars = [];
    let rating = 0;

    this.root.querySelectorAll(`.${this.CLASSES.STAR_WRAPPER}`).forEach((element, index) => {
      stars[index] = {};
      stars[index].icon = element.querySelector(`.${this.CLASSES.STAR}`);

      const elementChecked = element.querySelector(`.${this.CLASSES.INPUT}`).checked;
      if (elementChecked) rating = index + 1;
    });

    this.DOM.STARS = stars;
    this.rating = rating;
  }

  clickHandler(event) {
    if (event.target.tagName === 'INPUT') this.rating = event.target.value;
  }
}

export default RateButton;
