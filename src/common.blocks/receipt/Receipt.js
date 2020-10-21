import DateDropdown from '@blocks/date-dropdown/DateDropdown';
import Dropdown from '@blocks/dropdown/Dropdown';
import ReceiptLogic from './ReceiptLogic';

class Receipt {
  constructor(container) {
    this.dateDropdown = new DateDropdown(container);
    this.dropdown = new Dropdown(container);
    this.receiptLogic = new ReceiptLogic(container);
    this.defineSubscriptions();
    this.setInitialState();
  }

  getTotalPrice() {
    return this.receiptLogic.getTotalPrice();
  }

  setTotalPriceSubscriber(subscriber) {
    this.receiptLogic.setTotalPriceSubscriber(subscriber);
  }

  defineSubscriptions() {
    this.dateDropdown.setArrivalDateSubscriber(this.receiptLogic.setArrivalDate.bind(this.receiptLogic));
    this.dateDropdown.setLeavingDateSubscriber(this.receiptLogic.setLeavingDate.bind(this.receiptLogic));
    this.dropdown.setTotalNumberSubscriber(this.receiptLogic.setGuestsNumber.bind(this.receiptLogic));
  }

  setInitialState() {
    this.receiptLogic.setGuestsNumber(this.dropdown.getTotalNumber());
    this.receiptLogic.setArrivalDate(this.dateDropdown.getArrivalDate());
    this.receiptLogic.setLeavingDate(this.dateDropdown.getLeavingDate());
  }
}

export default Receipt;
