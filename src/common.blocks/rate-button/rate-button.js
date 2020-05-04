import Component from '../../js/frontend/component.js';

class RateButton extends Component {

  constructor(rootElement) {
    super();

    this.setConsts();

    this.root = rootElement;
    this.findElements();
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
    this.INPUT_CLASS = "rate-button__input";
    this.STAR_CLASS = "rate-button__label";
    this.CHECKED_STAR = "star";
    this.UNCHECKED_STAR = "star_border";
  }

  findElements() {
    let stars = [];

    this.root.find(`.${this.STAR_CLASS}`).each( function(index, element) {
      stars[index] = {};
      stars[index].icon = $(element);
    });

    this.stars = stars;
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

let rateButtons = []; 

$('.rate-button').each( function(index, element) {
  rateButtons[index] = new RateButton($(element));
});

console.log(rateButtons[0]);
