import CalendarLogic from './CalendarLogic';

class Calendar {
  constructor(container) {
    const calendar = new CalendarLogic(container);

    this.setArrivalDate = (date) => calendar.setArrivalDate(date);

    this.setLeavingDate = (date) => calendar.setLeavingDate(date);

    this.getArrivalDate = () => calendar.getArrivalDate();

    this.getLeavingDate = () => calendar.getLeavingDate();

    this.setArrivalDateSubscriber = (subscriber) => calendar.setArrivalDateSubscriber(subscriber);

    this.setLeavingDateSubscriber = (subscriber) => calendar.setLeavingDateSubscriber(subscriber);

    this.setPickingDate = (str) => calendar.setPickingDate(str);

    this.setSubmitSubscriber = (subscriber) => calendar.setSubmitSubscriber(subscriber);

    this.clickHandler = (event) => calendar.clickHandler(event);
  }
}

export default Calendar;
