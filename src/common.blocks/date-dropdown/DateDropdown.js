import Component from '@frontend/Component';
import Calendar from '@blocks/calendar/Calendar';

class DateDropdown extends Component {
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
        isGlobal: true,
        subscribers: [
          this.displayArrivalDate.bind(this),
        ],
      },
      leavingDate: {
        value: null,
        isGlobal: true,
        subscribers: [
          this.displayLeavingDate.bind(this),
        ],
      },
      datePicking: {
        value: '',
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
      DATE_INPUT: 'js-date-dropdown__input',
      CALENDAR_POPUP: 'js-date-dropdown__calendar',
      CALENDAR_POPUP_DROPPED: 'date-dropdown__calendar_dropped',
      DROPDOWN_ICON: 'js-date-dropdown__expand-more',
    };
  }

  setChildren() {
    const calendar = this.root.querySelector('.js-calendar');

    this.children = [
      new Calendar(calendar, this),
    ];
  }

  setInitialState() {
    this.arrivalDateInput = this.root.querySelector(`.${this.CLASSES.DATE_INPUT}[name="arrivalDate"]`);
    this.leavingDateInput = this.root.querySelector(`.${this.CLASSES.DATE_INPUT}[name="leavingDate"]`);
    this.calendarPopup = this.root.querySelector(`.${this.CLASSES.CALENDAR_POPUP}`);
    this.dropdownIcon = this.root.querySelectorAll(`.${this.CLASSES.DROPDOWN_ICON}`);

    this.arrivalDate = this.getArrivalDate();
    this.leavingDate = this.getLeavingDate();
  }

  clickHandler(event) {
    if (this.arrivalDateClicked(event)) {
      this.datePicking = 'arrivalDate';
      this.togglePopupHandler();
    } else if (this.leavingDateClicked(event)) {
      this.datePicking = 'leavingDate';
      this.togglePopupHandler();
    }
  }

  arrivalDateClicked(event) {
    return event.target.closest(`.${this.CLASSES.ARRIVAL_DATE_INPUT}`) === this.arrivalDateInput
      || event.target.closest(`.${this.CLASSES.DROPDOWN_ICON}`) === this.dropdownIcon[0];
  }

  leavingDateClicked(event) {
    return event.target.closest(`.${this.CLASSES.LEAVING_DATE_INPUT}`) === this.leavingDateInput
      || event.target.closest(`.${this.CLASSES.DROPDOWN_ICON}`) === this.dropdownIcon[1];
  }

  togglePopupHandler() {
    this.calendarDisplayed = !this.calendarDisplayed;
  }

  getArrivalDate() {
    let date = this.arrivalDateInput.value;

    if (date) {
      date = date.split('-');

      const year = date[0];
      const month = date[1] - 1;
      const day = date[2];

      date = new Date(year, month, day);
    } else date = null;

    return date;
  }

  getLeavingDate() {
    let date = this.leavingDateInput.value;

    if (date) {
      date = date.split('-');

      const year = date[0];
      const month = date[1] - 1;
      const day = date[2];

      date = new Date(year, month, day);
    } else date = null;

    return date;
  }

  displayArrivalDate() {
    if (this.arrivalDate == null) {
      this.arrivalDateInput.value = '';
      return;
    }

    const month = this.twoDigits(this.arrivalDate.getMonth() + 1);
    const day = this.twoDigits(this.arrivalDate.getDate());
    const date = `${this.arrivalDate.getFullYear()}-${month}-${day}`;
    this.arrivalDateInput.value = date;
  }

  displayLeavingDate() {
    if (this.leavingDate == null) {
      this.leavingDateInput.value = '';
      return;
    }

    const month = this.twoDigits(this.leavingDate.getMonth() + 1);
    const day = this.twoDigits(this.leavingDate.getDate());
    const date = `${this.leavingDate.getFullYear()}-${month}-${day}`;
    this.leavingDateInput.value = date;
  }

  toggleCalendar() {
    if (this.calendarDisplayed) {
      this.calendarPopup.classList.add(this.CLASSES.CALENDAR_POPUP_DROPPED);
    } else {
      this.calendarPopup.classList.remove(this.CLASSES.CALENDAR_POPUP_DROPPED);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  twoDigits(num) {
    return (`0${num}`).slice(-2);
  }

  closeCalendar() {
    this.calendarDisplayed = false;
  }
}

export default DateDropdown;
