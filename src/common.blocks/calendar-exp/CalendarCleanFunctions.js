/* eslint-disable class-methods-use-this */
class CalendarCleanFunctions {
  arrivalDate(value, leavingDate) {
    if (value < leavingDate) return value;
    return null;
  }
}

export default CalendarCleanFunctions;
