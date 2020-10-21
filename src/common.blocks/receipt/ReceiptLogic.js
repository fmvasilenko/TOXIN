/* eslint-disable class-methods-use-this */
import ReceiptStateItem from './ReceiptStateItem';

class ReceiptLogic {
  constructor(container) {
    this.classes = require('./receipt.classes.json');
    this.currencySign = require('./receipt.config.json').vocabulary.currencySign;
    this.dayWordForms = require('./receipt.config.json').vocabulary.dayWordForms;
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.pricePerNight = this.getPricePerNight(container);
    this.discount = this.getDiscount(container);
    this.extraCosts = this.getExtraCosts(container);
    this.totalPriceExternalSubscriber = () => {};
    this.defineSubscriptions();
    this.changeTotalPrice();
    this.changeCost();
  }

  setArrivalDate(date) {
    this.state.arrivalDate.set(date);
  }

  setLeavingDate(date) {
    this.state.leavingDate.set(date);
  }

  setGuestsNumber(value) {
    this.state.guestsNumber.set(value);
  }

  getTotalPrice() {
    return this.calculateTotalPrice();
  }

  setTotalPriceSubscriber(subscriber) {
    this.totalPriceExternalSubscriber = subscriber;
  }

  findDOMNodes(container) {
    return {
      totalPrice: container.querySelector(`.${this.classes.totalPrice}`),
      costTitle: container.querySelector(`.${this.classes.costTitle}[data-cost-type="cost"]`),
      costValue: container.querySelector(`.${this.classes.costValue}[data-cost-type="cost"]`),
    };
  }

  getInitialState() {
    return {
      arrivalDate: new ReceiptStateItem(null),
      leavingDate: new ReceiptStateItem(null),
      daysNumber: new ReceiptStateItem(0),
      guestsNumber: new ReceiptStateItem(0),
    };
  }

  defineSubscriptions() {
    this.state.arrivalDate.addSubscriber(this.calculateDaysNumber.bind(this));
    this.state.leavingDate.addSubscriber(this.calculateDaysNumber.bind(this));
    this.state.daysNumber.addSubscriber(this.changeTotalPrice.bind(this));
    this.state.daysNumber.addSubscriber(this.changeCost.bind(this));
    this.state.guestsNumber.addSubscriber(this.changeTotalPrice.bind(this));
    this.state.guestsNumber.addSubscriber(this.changeCost.bind(this));
  }

  getPricePerNight(container) {
    const pricePerNight = container.querySelector(`.${this.classes.pricePerNight}`).innerHTML;
    return parseInt(pricePerNight.replace(/[^\d]/g, ''), 10);
  }

  getDiscount(container) {
    const discount = container.querySelector(`.${this.classes.costTitle}[data-cost-type="discount"]`).innerHTML;
    return parseInt(discount.replace(/[^\d]/g, ''), 10);
  }

  getExtraCosts(container) {
    const extraCosts = container.querySelector(`.${this.classes.costValue}[data-cost-type="extraCost"]`).innerHTML;
    return parseInt(extraCosts.replace(/[^\d]/g, ''), 10);
  }

  calculateDaysNumber() {
    if (this.state.arrivalDate.get() && this.state.leavingDate.get()) {
      const daysNumber = Math.ceil(Math.abs(this.state.leavingDate.get().getTime() - this.state.arrivalDate.get().getTime()) / (1000 * 3600 * 24));
      this.state.daysNumber.set(daysNumber);
    } else this.state.daysNumber.set(0);
  }

  changeTotalPrice() {
    const str = this.prepareStr(`${this.calculateTotalPrice()}${this.currencySign}`);
    this.totalPriceExternalSubscriber(this.calculateTotalPrice());
    this.DOM.totalPrice.innerHTML = str;
  }

  changeCost() {
    const wordForm = this.getWordForm(this.state.daysNumber.get(), this.dayWordForms);
    const costTitle = this.prepareStr(`${this.pricePerNight}${this.currencySign} x ${this.state.daysNumber.get()} ${wordForm}`);
    const costValue = this.prepareStr(`${this.state.daysNumber.get() * this.pricePerNight}${this.currencySign}`);

    this.DOM.costTitle.innerHTML = costTitle;
    this.DOM.costValue.innerHTML = costValue;
  }

  calculateTotalPrice() {
    if (!this.state.daysNumber.get()) return 0;

    return this.state.daysNumber.get() * this.pricePerNight + this.extraCosts - this.discount;
  }

  prepareStr(str) {
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  getWordForm(value, wordForms) {
    if (!wordForms) return '';

    let n = value % 100;

    if (n < 10 || n > 20) {
      n %= 10;

      if (n === 1) return wordForms[0];
      if (n > 1 && n < 5) return wordForms[1];
    }

    return wordForms[2];
  }
}

export default ReceiptLogic;
