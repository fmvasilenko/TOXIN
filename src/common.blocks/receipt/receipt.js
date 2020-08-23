import Component from '@frontend/Component';
import DateDropdown from '@blocks/date-dropdown/DateDropdown';
import Dropdown from '@blocks/dropdown/Dropdown';

class Receipt extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });

    this.setDOM();
    this.setInitialState();
  }

  setState() {
    this.state = {
      leavingDate: {
        subscribers: [
          this.calculateDaysBetween.bind(this),
        ],
      },
      arrivalDate: {
        subscribers: [
          this.calculateDaysBetween.bind(this),
        ],
      },
      daysNumber: {
        value: 0,
        subscribers: [
          this.changeCost.bind(this),
        ],
      },
      cost: {
        value: 0,
        subscribers: [
          this.displayCost.bind(this),
          this.displayCostTitle.bind(this),
          this.calculateTotalAmount.bind(this),
        ],
      },
      total: {
        value: 0,
        subscribers: [
          this.displayTotal.bind(this),
        ],
      },
    };
  }

  setClasses() {
    this.CLASSES = {
      DROPDOWN: 'js-dropdown',
      DATE_DROPDOWN: 'js-date-dropdown',
      PRICE_PER_NIGHT: 'js-receipt__title-price',
      COST_TITLE: 'js-receipt__cost-title',
      COST: 'js-receipt__cost-price',
      DISCOUNT: 'js-receipt__cost-title',
      EXTRA_COSTS: 'js-receipt__cost-price',
      TOTAL: 'js-receipt__total-number',
    };
  }

  setDOM() {
    this.DOM = {
      PRICE_PER_NIGHT: this.root.querySelector(`.${this.CLASSES.PRICE_PER_NIGHT}`),
      COST_TITLE: this.root.querySelector(`.${this.CLASSES.COST_TITLE}`),
      COST: this.root.querySelector(`.${this.CLASSES.COST}`),
      DISCOUNT: this.root.querySelectorAll(`.${this.CLASSES.DISCOUNT}`)[1],
      EXTRA_COSTS: this.root.querySelectorAll(`.${this.CLASSES.EXTRA_COSTS}`)[2],
      TOTAL: this.root.querySelector(`.${this.CLASSES.TOTAL}`),
    };
  }

  setChildren() {
    this.children = [
      new DateDropdown(this.root.querySelector(`.${this.CLASSES.DATE_DROPDOWN}`), this),
      new Dropdown(this.root.querySelector(`.${this.CLASSES.DROPDOWN}`), this),
    ];
  }

  setInitialState() {
    this.pricePerNight = parseInt(this.DOM.PRICE_PER_NIGHT.innerHTML.replace(/[^\d]/g, ''), 10);
    this.discount = parseInt(this.DOM.DISCOUNT.innerHTML.replace(/[^\d]/g, ''), 10);
    this.extraCosts = parseInt(this.DOM.EXTRA_COSTS.innerHTML.replace(/[^\d]/g, ''), 10);
    this.changeCost();
  }

  calculateDaysBetween() {
    this.daysNumber = this.daysBetween(this.arrivalDate, this.leavingDate);
  }

  // eslint-disable-next-line class-methods-use-this
  daysBetween(arrivalDate, leavingDate) {
    const date1 = new Date(arrivalDate);
    const date2 = new Date(leavingDate);
    const daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return daysLag;
  }

  changeCost() {
    this.cost = this.pricePerNight * this.daysNumber;
  }

  displayCost() {
    let str = `${this.cost}₽`;
    str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    if (this.DOM) this.DOM.COST.innerHTML = str;
  }

  displayCostTitle() {
    let str = `${this.pricePerNight}₽ x ${this.daysNumber} суток`;
    str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    if (this.DOM) this.DOM.COST_TITLE.innerHTML = str;
  }

  calculateTotalAmount() {
    if (this.cost) this.total = this.cost + this.extraCosts - this.discount;
    else this.total = 0;
  }

  displayTotal() {
    let str = `${this.total}₽`;
    str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    if (this.DOM) this.DOM.TOTAL.innerHTML = str;
  }
}

export default Receipt;
