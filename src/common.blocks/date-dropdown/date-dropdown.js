import Component from "@frontend/component";
import Calendar from "@blocks/calendar/calendar";

export default class DateDropdown extends Component {

  constructor(rootElement, parent = {}) {
    super({root: rootElement, parent: parent});

    //this.root = rootElement;
    this.setConsts();
    this.setChildren();
    this.setInitialState();
    this.bindEventListeners();
  }

  setState() {
    this.state = {
      arrivalDate: {
        value: null,
        isGlobal: true,
        subscribers: [
          this.displayArrivalDate.bind(this)
        ]
      },
      leavingDate: {
        value: null,
        isGlobal: true,
        subscribers: [
          this.displayLeavingDate.bind(this)
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

  setConsts() {
    this.CLASSES = {
      ARRIVAL_DATE_INPUT: "js-date-dropdown__arrival-date",
      LEAVING_DATE_INPUT: "js-date-dropdown__leaving-date",
      CALENDAR_POPUP: "date-dropdown__calendar",
      CALENDAR_POPUP_DROPPED: "date-dropdown__calendar_dropped",
      DROPDOWN_ICON: "date-dropdown__expand-more"
    }
  }

  setChildren() {
    let calendar = this.root.find(".calendar");

    this.children = [
      new Calendar(calendar, this)
    ]
  }

  setInitialState() {
    this.arrivalDateInput = this.root.find(`.${this.CLASSES.ARRIVAL_DATE_INPUT}`);
    this.leavingDateInput = this.root.find(`.${this.CLASSES.LEAVING_DATE_INPUT}`);
    this.calendarPopup = this.root.find(`.${this.CLASSES.CALENDAR_POPUP}`);
    this.dropdownIcon = this.root.find(`.${this.CLASSES.DROPDOWN_ICON}`);

    this.arrivalDate = this.getArrivalDate();
    this.leavingDate = this.getLeavingDate();
  }

  bindEventListeners() {
    this.dropdownIcon.click(this.togglePopupHandler.bind(this));
  }

  togglePopupHandler() {
    this.calendarDisplayed = !this.calendarDisplayed;
  }

  getArrivalDate() {
    let date = this.arrivalDateInput.val();
    
    if (date) {
      date = date.split("-");

      let year = date[0];
      let month = date[1] - 1;
      let day = date[2];

      date = new Date(year, month, day);
    }
    else date = null;

    return date;
  }

  getLeavingDate() {
    let date = this.leavingDateInput.val();
    
    if (date) {
      date = date.split("-");

      let year = date[0];
      let month = date[1] - 1;
      let day = date[2];

      date = new Date(year, month, day);
    }
    else date = null;

    return date;
  }

  displayArrivalDate() {
    if (this.arrivalDate == null) {
      this.arrivalDateInput.val("");
      return false;
    }

    let month = this.twoDigits(this.arrivalDate.getMonth() + 1);
    let day = this.twoDigits(this.arrivalDate.getDate());
    let date = `${this.arrivalDate.getFullYear()}-${month}-${day}`;
    this.arrivalDateInput.val(date);
  }

  displayLeavingDate() {
    if (this.leavingDate == null) {
      this.leavingDateInput.val("");
      return false;
    }

    let month = this.twoDigits(this.leavingDate.getMonth() + 1);
    let day = this.twoDigits(this.leavingDate.getDate());
    let date = `${this.leavingDate.getFullYear()}-${month}-${day}`;
    this.leavingDateInput.val(date);
  }

  toggleCalendar() {
    if (this.calendarDisplayed) {
      this.calendarPopup.addClass(this.CLASSES.CALENDAR_POPUP_DROPPED);
    }
    else {
      this.calendarPopup.removeClass(this.CLASSES.CALENDAR_POPUP_DROPPED);
    }
  }

  twoDigits(num) {
    return ('0' + num).slice(-2);
  }

}