/* eslint-disable class-methods-use-this */
import MemoryCell from '../../js/frontend/MemoryCell';
import CalendarCleanFunctions from './CalendarCleanFunctions';

class CalendarData {
  constructor() {
    this.arrivalDate = new MemoryCell(null, this.arrivalDateController.bind(this));
    this.leavingDate = new MemoryCell(null, this.leavingDateController.bind(this));
    this.monthDisplayed = new MemoryCell(null);
    this.isCalendarDisplayed = new MemoryCell(false);
    this.addSubscribers();
  }

  arrivalDateController(givenValue) {
    return CalendarCleanFunctions.arrivalDate(givenValue, this.leavingDate.get());
  }

  leavingDateController(givenValue) {
    return CalendarCleanFunctions.leavingDate(this.arrivalDate.get(), givenValue);
  }

  addSubscribers() {

  }
}

export default CalendarData;
