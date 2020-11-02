/* eslint-disable class-methods-use-this */
import ReceiptStateItem from './ReceiptStateItem';

class ReceiptLogic {
  constructor(container) {
    this.classes = require('./receipt.classes.json');
    this.currencySign = require('./receipt.config.json').vocabulary.currencySign;
    this.dayWordForms = require('./receipt.config.json').vocabulary.dayWordForms;
    this.DOM = this._findDOMNodes(container);
    this.state = this._getInitialState();
    this.pricePerNight = this._getPricePerNight(container);
    this.discount = this._getDiscount(container);
    this.extraCosts = this._getExtraCosts(container);
    this.totalPriceExternalSubscriber = () => {};
    this._defineSubscriptions();
    this._changeTotalPrice();
    this._changeCost();
  }

  setArrivalDate(date) {
    this.state.arrivalDate.value = date;
  }

  setLeavingDate(date) {
    this.state.leavingDate.value = date;
  }

  setGuestsNumber(value) {
    this.state.guestsNumber.value = value;
  }

  getTotalPrice() {
    return this._calculateTotalPrice();
  }

  setTotalPriceSubscriber(subscriber) {
    this.totalPriceExternalSubscriber = subscriber;
  }

  _findDOMNodes(container) {
    return {
      totalPrice: container.querySelector(`.js-${this.classes.totalPrice}`),
      costTitle: container.querySelector(`.js-${this.classes.costTitle}[data-cost-type="cost"]`),
      costValue: container.querySelector(`.js-${this.classes.costValue}[data-cost-type="cost"]`),
    };
  }

  _getInitialState() {
    return {
      arrivalDate: new ReceiptStateItem(null),
      leavingDate: new ReceiptStateItem(null),
      daysNumber: new ReceiptStateItem(0),
      guestsNumber: new ReceiptStateItem(0),
    };
  }

  _defineSubscriptions() {
    this.state.arrivalDate.addSubscriber(this._calculateDaysNumber.bind(this));
    this.state.leavingDate.addSubscriber(this._calculateDaysNumber.bind(this));
    this.state.daysNumber.addSubscriber(this._changeTotalPrice.bind(this));
    this.state.daysNumber.addSubscriber(this._changeCost.bind(this));
    this.state.guestsNumber.addSubscriber(this._changeTotalPrice.bind(this));
    this.state.guestsNumber.addSubscriber(this._changeCost.bind(this));
  }

  _getPricePerNight(container) {
    const pricePerNight = container.querySelector(`.js-${this.classes.pricePerNight}`).innerHTML;
    return parseInt(pricePerNight.replace(/[^\d]/g, ''), 10);
  }

  _getDiscount(container) {
    const discount = container.querySelector(`.js-${this.classes.costTitle}[data-cost-type="discount"]`).innerHTML;
    return parseInt(discount.replace(/[^\d]/g, ''), 10);
  }

  _getExtraCosts(container) {
    const extraCosts = container.querySelector(`.js-${this.classes.costValue}[data-cost-type="extraCost"]`).innerHTML;
    return parseInt(extraCosts.replace(/[^\d]/g, ''), 10);
  }

  _calculateDaysNumber() {
    if (this.state.arrivalDate.value && this.state.leavingDate.value) {
      const daysNumber = Math.ceil(Math.abs(this.state.leavingDate.value.getTime() - this.state.arrivalDate.value.getTime()) / (1000 * 3600 * 24));
      this.state.daysNumber.value = daysNumber;
    } else this.state.daysNumber.value = 0;
  }

  _changeTotalPrice() {
    const str = this._prepareStr(`${this._calculateTotalPrice()}${this.currencySign}`);
    this.totalPriceExternalSubscriber(this._calculateTotalPrice());
    this.DOM.totalPrice.innerHTML = str;
  }

  _changeCost() {
    const wordForm = this._getWordForm(this.state.daysNumber.value, this.dayWordForms);
    const costTitle = this._prepareStr(`${this.pricePerNight}${this.currencySign} x ${this.state.daysNumber.value} ${wordForm}`);
    const costValue = this._prepareStr(`${this.state.daysNumber.value * this.pricePerNight}${this.currencySign}`);

    this.DOM.costTitle.innerHTML = costTitle;
    this.DOM.costValue.innerHTML = costValue;
  }

  _calculateTotalPrice() {
    if (!this.state.daysNumber.value) return 0;

    return this.state.daysNumber.value * this.pricePerNight + this.extraCosts - this.discount;
  }

  _prepareStr(str) {
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  _getWordForm(value, wordForms) {
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
