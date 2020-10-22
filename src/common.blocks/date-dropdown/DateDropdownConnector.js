import Calendar from '@blocks/calendar/Calendar';
import DateDropdownLogic from './DateDropdownLogic';

class DateDropdownConnector {
  constructor(container) {
    this.calendar = new Calendar(container);
    this.dateDropdownLogic = new DateDropdownLogic(container);
    this.defineSubscriptions();
    this.setInitialState();
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

  defineSubscriptions() {
    this.arrivalDateExternalSubscriber = () => {};
    this.leavingDateExternalSubscriber = () => {};

    this.calendar.setArrivalDateSubscriber(this.arrivalDateSubscriber.bind(this));
    this.calendar.setLeavingDateSubscriber(this.leavingDateSubscriber.bind(this));
    this.calendar.setSubmitSubscriber(this.dateDropdownLogic.closeCalendar.bind(this.dateDropdownLogic));
    this.dateDropdownLogic.setPickingDateSubscriber(this.calendar.setPickingDate.bind(this.calendar));
    this.dateDropdownLogic.setCalendarClickSubscriber(this.calendar.clickHandler);
  }

  arrivalDateSubscriber(date) {
    this.dateDropdownLogic.setArrivalDate(date);
    this.arrivalDateExternalSubscriber(date);
  }

  leavingDateSubscriber(date) {
    this.dateDropdownLogic.setLeavingDate(date);
    this.leavingDateExternalSubscriber(date);
  }

  setInitialState() {
    this.calendar.setArrivalDate(this.dateDropdownLogic.getArrivalDate());
    this.calendar.setLeavingDate(this.dateDropdownLogic.getLeavingDate());
  }
}

export default DateDropdownConnector;
