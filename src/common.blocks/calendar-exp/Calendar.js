import CalendarData from './CalendarData';
import CalendarDisplay from './CalendarDisplay';

class Calendar {
  constructor(container) {
    this.data = new CalendarData();
    this.display = new CalendarDisplay(this.data, container);
  }
}

export default Calendar;
