import Component from '@frontend/Component';
import Calendar from '@blocks/calendar/Calendar';

class FilterDateDropdown extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });

    this.setConsts();
    this.setChildren();
    this.setInitialState();
  }

  setState() {
    this.state = {
      arrivalDate: {
        value: null,
        subscribers: [
          this.changeField.bind(this),
        ],
      },
      leavingDate: {
        value: null,
        subscribers: [
          this.changeField.bind(this),
        ],
      },
      calendarDisplayed: {
        value: false,
        subscribers: [
          this.toggleCalendar.bind(this),
        ],
      },
    };
  }

  setClosers() {
    this.closers = [
      this.closeCalendar.bind(this),
    ];
  }

  setConsts() {
    this.CLASSES = {
      FIELD: 'js-filter-date-dropdown__field',
      INPUT: 'js-filter-date-dropdown__input',
      ARRIVAL_DATE: 'js-filter-date-dropdown__arrival-date',
      LEAVING_DATE: 'js-filter-date-dropdown__leaving-date',
      ICON: 'js-filter-date-dropdown__icon',
      CALENDAR: 'js-filter-date-dropdown__calendar',
      CALENDAR_POPUP_DROPPED: 'filter-date-dropdown__calendar_dropped',
    };

    this.VOCABULARY = {
      MONTHS: ['янв', 'фев', 'март', 'апр', 'мая', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек'],
    };
  }

  setChildren() {
    const calendar = this.root.querySelector('.js-calendar');

    this.children = [
      new Calendar(calendar, this),
    ];
  }

  setInitialState() {
    this.field = this.root.querySelector(`.${this.CLASSES.FIELD}`);
    this.input = this.root.querySelector(`.${this.CLASSES.INPUT}`);
    this.arrivalDateInput = this.root.querySelector(`.${this.CLASSES.ARRIVAL_DATE}`);
    this.leavingDateInput = this.root.querySelector(`.${this.CLASSES.LEAVING_DATE}`);
    this.icon = this.root.querySelector(`.${this.CLASSES.ICON}`);
    this.calendar = this.root.querySelector(`.${this.CLASSES.CALENDAR}`);

    this.arrivalDate = this.getArrivalDate();
    this.leavingDate = this.getLeavingDate();
  }

  clickHandler(event) {
    if (this.fieldClicked(event)) this.fieldClickHandler();
  }

  fieldClicked(event) {
    return event.target.closest(`.${this.CLASSES.FIELD}`) === this.field;
  }

  fieldClickHandler() {
    this.calendarDisplayed = !this.calendarDisplayed;
  }

  getArrivalDate() {
    let date = this.arrivalDateInput.value;

    if (!date) return null;

    date = this.parseDate(date);
    return date;
  }

  getLeavingDate() {
    let date = this.leavingDateInput.value;

    if (!date) return null;

    date = this.parseDate(date);
    return date;
  }

  // eslint-disable-next-line class-methods-use-this
  parseDate(givenDate) {
    let date = givenDate.split('-');

    const year = date[0];
    const month = date[1] - 1;
    const day = date[2];

    date = new Date(year, month, day);

    return date;
  }

  toggleCalendar() {
    if (this.calendarDisplayed) {
      this.calendar.classList.add(this.CLASSES.CALENDAR_POPUP_DROPPED);
    } else {
      this.calendar.classList.remove(this.CLASSES.CALENDAR_POPUP_DROPPED);
    }
  }

  changeField() {
    let str = '';

    if (this.arrivalDate) {
      const monthNumber = this.arrivalDate.getMonth();
      str += `${this.arrivalDate.getDate()} ${this.VOCABULARY.MONTHS[monthNumber]}`;
    } else str += '__';

    str += ' - ';

    if (this.leavingDate) {
      const monthNumber = this.leavingDate.getMonth();
      str += `${this.leavingDate.getDate()} ${this.VOCABULARY.MONTHS[monthNumber]}`;
    } else str += '__';

    this.input.value = str;
  }

  closeCalendar() {
    this.calendarDisplayed = false;
  }
}

export default FilterDateDropdown;
