import Component from "@frontend/component";
import DateDropdown from "@blocks/date-dropdown/date-dropdown";
import Dropdown from "@blocks/drop-down/drop-down";

export default class Receipt extends Component {

  constructor(root, parent = {}) {
    super({root: root, parent: parent});

    this.setDOM();
    this.setInitialState();
  }

  setState() {
    this.state = {
      leavingDate: {
        subscribers: [
          this.calculateDaysBetween.bind(this)
        ]
      },
      arrivalDate: {
        subscribers: [
          this.calculateDaysBetween.bind(this)
        ]
      },
      daysNumber: {
        value: 0,
        subscribers: [
          this.changeCost.bind(this)
        ]
      },
      cost: {
        value: 0,
        subscribers: [
          this.displayCost.bind(this),
          this.displayCostTitle.bind(this),
          this.calculateTotalAmount.bind(this)
        ]
      },
      total: {
        value: 0,
        subscribers: [
          this.displayTotal.bind(this)
        ]
      }
    }
  }

  setClasses() {
    this.CLASSES = {
      DROPDOWN: "drop-down",
      DATE_DROPDOWN: "date-dropdown",
      PRICE_PER_NIGHT: "receipt__title-price",
      COST_TITLE: "receipt__cost-title",
      COST: "receipt__cost-price",
      DISCOUNT: "receipt__cost-title",
      EXTRA_COSTS: "receipt__cost-price",
      TOTAL: "receipt__total-number"
    }
  }

  setDOM() {
    this.DOM = {
      PRICE_PER_NIGHT: this.root.find(`.${this.CLASSES.PRICE_PER_NIGHT}`),
      COST_TITLE: this.root.find(`.${this.CLASSES.COST_TITLE}`).first(),
      COST: this.root.find(`.${this.CLASSES.COST}`).first(),
      DISCOUNT: this.root.find(`.${this.CLASSES.DISCOUNT}`).eq(1),
      EXTRA_COSTS: this.root.find(`.${this.CLASSES.EXTRA_COSTS}`).eq(2),
      TOTAL: this.root.find(`.${this.CLASSES.TOTAL}`)
    }
  }

  setChildren() {
    this.children = [
      new DateDropdown(this.root.find(`.${this.CLASSES.DATE_DROPDOWN}`), this),
      new Dropdown(this.root.find(`.${this.CLASSES.DROPDOWN}`), this)
    ]
  }

  setInitialState() {
    this.pricePerNight = parseInt(this.DOM.PRICE_PER_NIGHT.html().replace(/[^\d]/g, ''));
    this.discount = parseInt(this.DOM.DISCOUNT.html().replace(/[^\d]/g, ''));
    this.extraCosts = parseInt(this.DOM.EXTRA_COSTS.html().replace(/[^\d]/g, ''));
    this.changeCost();
  }

  calculateDaysBetween() {
    this.daysNumber = this.daysBetween(this.arrivalDate, this.leavingDate);
  }

  daysBetween(arrivalDate, leavingDate) {
    let date1 = new Date(arrivalDate);
    let date2 = new Date(leavingDate);
    let daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return daysLag;
  }

  changeCost() {
    this.cost = this.pricePerNight * this.daysNumber;
  }

  displayCost() {
    let str = `${this.cost}₽`;
    str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    if (this.DOM) this.DOM.COST.html(str);
  }

  displayCostTitle() {
    let str = `${this.pricePerNight}₽ x ${this.daysNumber} суток`;
    str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    
    if (this.DOM) this.DOM.COST_TITLE.html(str);
  }

  calculateTotalAmount() {
    if (this.cost) this.total = this.cost + this.extraCosts - this.discount;
    else this.total = 0;
  }

  displayTotal() {
    let str = `${this.total}₽`;
    str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    
    if (this.DOM) this.DOM.TOTAL.html(str);
  }

}