import Component from "@frontend/component";
import Calendar from "@blocks/calendar/calendar";

export default class FilterDateDropdown extends Component {

  constructor(rootElement, parent = {}) {
    super({root: rootElement, parent: parent});

    this.setConsts();
    this.setChildren();
    this.setInitialState();
    this.bindEventListeners();
  }

  setState() {
    this.state = {
      arrivalDate: {
        value: null,
        subscribers: [
          this.changeField.bind(this)
        ]
      },
      leavingDate: {
        value: null,
        subscribers: [
          this.changeField.bind(this)
        ]
      },
      calendarDisplayed: {
        value: false,
        subscribers: [
          this.toggleCalendar.bind(this)
        ]
      }
    }
  }

  setClosers() {
    this.closers = [
      this.closeCalendar.bind(this)
    ]
  }

  setConsts() {
    this.CLASSES = {
      INPUT: "filter-date-dropdown__input",
      ARRIVAL_DATE: "filter-date-dropdown__arrival-date",
      LEAVING_DATE: "filter-date-dropdown__leaving-date",
      ICON: "filter-date-dropdown__icon",
      CALENDAR: "filter-date-dropdown__calendar",
      CALENDAR_POPUP_DROPPED: "filter-date-dropdown__calendar_dropped"
    }

    this.VOCABULARY = {
      MONTHS: ["янв", "фев", "март", "апр", "мая", "июня", "июля", "авг", "сент", "окт", "нояб", "дек"]
    }
  }

  setChildren() {
    let calendar = this.root.find(".calendar");

    this.children = [
      new Calendar(calendar, this)
    ]
  }

  setInitialState() {
    this.input = this.root.find(`.${this.CLASSES.INPUT}`);
    this.arrivalDateInput = this.root.find(`.${this.CLASSES.ARRIVAL_DATE}`);
    this.leavingDateInput = this.root.find(`.${this.CLASSES.LEAVING_DATE}`);
    this.icon = this.root.find(`.${this.CLASSES.ICON}`);
    this.calendar = this.root.find(`.${this.CLASSES.CALENDAR}`);

    this.arrivalDate = this.getArrivalDate();
    this.leavingDate = this.getLeavingDate();
  }

  bindEventListeners() {
    this.icon.click(this.iconClickHandler.bind(this));
  }

  iconClickHandler() {
    this.calendarDisplayed = !this.calendarDisplayed;
  }

  getArrivalDate() {
    let date = this.arrivalDateInput.val();

    if (!date) return null;

    date = this.parseDate(date);
    return date;
  }

  getLeavingDate() {
    let date = this.leavingDateInput.val();

    if (!date) return null;

    date = this.parseDate(date);
    return date;
  }

  parseDate(date) {
    date = date.split("-");

    let year = date[0];
    let month = date[1] - 1;
    let day = date[2];

    date = new Date(year, month, day);

    return date;
  }

  toggleCalendar() {
    if (this.calendarDisplayed) {
      this.calendar.addClass(this.CLASSES.CALENDAR_POPUP_DROPPED);
    }
    else {
      this.calendar.removeClass(this.CLASSES.CALENDAR_POPUP_DROPPED);
    }
  }

  changeField() {
    let str = "";

    if (this.arrivalDate) {
      let monthNumber = this.arrivalDate.getMonth();
      str += `${this.arrivalDate.getDate()} ${this.VOCABULARY.MONTHS[monthNumber]}`;
    }
    else str += "__";

    str += " - ";

    if (this.leavingDate) {
      let monthNumber = this.leavingDate.getMonth();
      str += `${this.leavingDate.getDate()} ${this.VOCABULARY.MONTHS[monthNumber]}`;
    }
    else str += "__";

    this.input.val(str);
  }

  closeCalendar() {
    this.calendarDisplayed = false;
  }

}