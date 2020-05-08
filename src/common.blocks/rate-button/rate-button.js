import Component from '../../js/frontend/component.js';

export default class RateButton extends Component {

  constructor(rootElement, parent = {}) {
    super(parent);

    this.setConsts();

    this.root = rootElement;
    this.setInitialState();
    this.bindEventListeners();
  }

  setState() {
    this.state = {
      rating: {
        value: 0,
        subscribers: [
          this.renderRating.bind(this)
        ]
      }
    };
  }

  setConsts() {
    this.STAR_WRAPPER = "rate-button__star-wrapper";
    this.INPUT_CLASS = "rate-button__input";
    this.STAR_CLASS = "rate-button__label";
    this.CHECKED_STAR = "star";
    this.UNCHECKED_STAR = "star_border";
  }

  setInitialState() {
    let stars = [];
    let rating = 0;

    this.root.find(`.${this.STAR_WRAPPER}`).each( function(index, element) {
      stars[index] = {};
      stars[index].icon = $(element).find(`.${this.STAR_CLASS}`);

      let elementChecked = $(element).find(`.${this.INPUT_CLASS}`).attr("checked");
      if (elementChecked)
        rating = index + 1;
    }.bind(this));

    this.stars = stars;
    this.rating = rating;
  }

  bindEventListeners() {
    this.root.click(this.clickHandler.bind(this));
  }

  clickHandler(event) {
    if(event.target.tagName == "INPUT")
      this.rating = $(event.target).val();
  }

  renderRating() {
    this.stars.forEach( function(star, index) {
      if (index < this.rating) {
        star.icon.html(this.CHECKED_STAR);
      }
      else
        star.icon.html(this.UNCHECKED_STAR);
    }.bind(this));
  }
}
