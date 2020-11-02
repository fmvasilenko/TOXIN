import Calendar from '@blocks/calendar/Calendar';
import DateDropdownLogic from './DateDropdownLogic';

class DateDropdownConnector {
  constructor(container) {
    this.calendar = new Calendar(container);
    this.dateDropdownLogic = new DateDropdownLogic(container);
    this._defineSubscriptions();
    this._setInitialState();
  }

  getArrivalDate() {
    return this.calendar.getArrivalDate();
  }

  getLeavingDate() {
    return this.calendar.getLeavingDate();
  }

  setArrivalDate(date) {
    this.calendar.setArrivalDate(date);
  }

  setLeavingDate(date) {
    this.calendar.setLeavingDate(date);
  }

  setArrivalDateSubscriber(subscriber) {
    this.arrivalDateExternalSubscriber = subscriber;
  }

  setLeavingDateSubscriber(subscriber) {
    this.leavingDateExternalSubscriber = subscriber;
  }

  _defineSubscriptions() {
    this.arrivalDateExternalSubscriber = () => {};
    this.leavingDateExternalSubscriber = () => {};

    this.calendar.setArrivalDateSubscriber(this._arrivalDateSubscriber.bind(this));
    this.calendar.setLeavingDateSubscriber(this._leavingDateSubscriber.bind(this));
    this.calendar.setSubmitSubscriber(this.dateDropdownLogic.closeCalendar.bind(this.dateDropdownLogic));
    this.dateDropdownLogic.setPickingDateSubscriber(this.calendar.setPickingDate.bind(this.calendar));
    this.dateDropdownLogic.setCalendarClickSubscriber(this.calendar.clickHandler);
  }

  _arrivalDateSubscriber(date) {
    this.dateDropdownLogic.setArrivalDate(date);
    this.arrivalDateExternalSubscriber(date);
  }

  _leavingDateSubscriber(date) {
    this.dateDropdownLogic.setLeavingDate(date);
    this.leavingDateExternalSubscriber(date);
  }

  _setInitialState() {
    this.calendar.setArrivalDate(this.dateDropdownLogic.getArrivalDate());
    this.calendar.setLeavingDate(this.dateDropdownLogic.getLeavingDate());
  }
}

export default DateDropdownConnector;
