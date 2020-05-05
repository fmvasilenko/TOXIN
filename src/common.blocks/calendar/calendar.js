import Component from "@frontend/component";

export default class Calendar extends Component {

  constructor(rootElement, parentState = {}) {
    super(parentState);

    this.root = rootElement;
    this.setConsts();
    this.setInitialState();
    this.bindEventListeners();
  }

  setState() {
    this.state = {
      arrivalDate: {
        value: new Date(2020, 4, 6),
        subscribers: [
          this.displayMonth.bind(this)
        ]
      },
      leavingDate: {
        value: new Date(2020, 4, 18),
        subscribers: [
          this.displayMonth.bind(this)
        ]
      },
      monthDisplayed: {
        value: new Date(),
        subscribers: [
          this.displayMonth.bind(this),
          this.changeTitle.bind(this)
        ]
      }
    }
  }

  setConsts() {
    this.TABLE_CLASS = "calendar__table";
    this.LEFT_ARROW_CLASS = "calendar__left-arrow";
    this.RIGHT_ARROW_CLASS = "calendar__right-arrow";
    this.TITLE_CLASS = "calendar__title";
    this.DATE_BETWEEN_CLASS = "calendar__date-between";
  }

  setInitialState() {
    this.monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    this.table = this.root.find(`.${this.TABLE_CLASS}`);
    this.leftArrow = this.root.find(`.${this.LEFT_ARROW_CLASS}`);
    this.rightArrow = this.root.find(`.${this.RIGHT_ARROW_CLASS}`);
    this.title = this.root.find(`.${this.TITLE_CLASS}`);

    let arrivalYear = this.arrivalDate.getFullYear();
    let arrivalMonth = this.arrivalDate.getMonth();
    this.createTable(arrivalYear, arrivalMonth);
  }

  bindEventListeners() {
    this.leftArrow.click(this.leftArrowClickHandler.bind(this));
    this.rightArrow.click(this.rightArrowClickHandler.bind(this));
    this.table.click(this.tableClickHandler.bind(this));
  }

  leftArrowClickHandler() {
    let year = this.monthDisplayed.getFullYear();
    let month = this.monthDisplayed.getMonth();
    let newDate = new Date(year, month);

    newDate.setMonth(newDate.getMonth() - 1);
    this.monthDisplayed = newDate;
  }

  rightArrowClickHandler() {
    let year = this.monthDisplayed.getFullYear();
    let month = this.monthDisplayed.getMonth();
    let newDate = new Date(year, month);

    newDate.setMonth(newDate.getMonth() + 1);
    this.monthDisplayed = newDate;
  }

  tableClickHandler(event) {
    if (event.target.tagName == "TD" || event.target.tagName == "DIV") {
      this.changeDates(event.target);
    }
  }

  displayMonth() {
    let year = this.monthDisplayed.getFullYear();
    let month = this.monthDisplayed.getMonth();

    this.createTable(year, month);
  }

  changeTitle() {
    let monthName = this.monthNames[this.monthDisplayed.getMonth()];
    let year = this.monthDisplayed.getFullYear();

    this.title.html(`${monthName} ${year}`);
  }

  changeDates(element) {
    let eventTarget = $(element);
    let value = 0;

    if (eventTarget.find("div").html() !== undefined) 
      value = eventTarget.find("div").html();
    else
      value = eventTarget.html();

    let year = this.monthDisplayed.getFullYear();
    let month = this.monthDisplayed.getMonth();
    let middleDateMs = (this.arrivalDate.getTime() + (this.leavingDate.getTime() - this.arrivalDate.getTime())/2);

    let date = new Date(year, month, value);
    let middleDate = new Date(middleDateMs);

    if (date < this.arrivalDate) {
      this.arrivalDate = date;
    }
    else if (date > this.leavingDate) {
      this.leavingDate = date;
    }
    else if (date > middleDate) {
      this.leavingDate = date;
    }
    else {
      this.arrivalDate = date;
    }
  }

  createTable(year = 0, month = 0) {
    let date = new Date(year, month);
    let currentDate = new Date();
    let table = "<tr>";

    date.setDate(2-date.getDay());

    for (let i = 0; i < 35; i++) {
      if (date.getDay() == 1) {
        table += "</tr><tr>";
      }

      let dateClass = this.isDateBetween(date, this.arrivalDate, this.leavingDate)? this.DATE_BETWEEN_CLASS : "";

      table += `<td class='calendar__number ${dateClass}'>`;

      if (this.isDateTheSame(date, this.leavingDate) || this.isDateTheSame(date, this.arrivalDate))
        table += `<div class='calendar__chosen-date'>${date.getDate()}</div>`;
      else if (this.isDateTheSame(date, currentDate))
        table += `<div class='calendar__current-date'>${date.getDate()}</div>`;
      else
        table += date.getDate();

      table += `</td>`;

      date.setDate(date.getDate() + 1);
    }

    if (date.getMonth() == month) {
      for (let i = 0; i < 7; i++) {
        if (date.getDay() == 1) {
          table += "</tr><tr>";
        }
        
        if (this.isDateTheSame(date, this.leavingDate) || this.isDateTheSame(date, this.arrivalDate))
          table += `<div class='calendar__chosen-date'>${date.getDate()}</div>`;
        else if (this.isDateTheSame(date, currentDate))
          table += `<div class='calendar__current-date'>${date.getDate()}</div>`;
        else
          table += date.getDate();
        
        date.setDate(date.getDate() + 1);
      }
    }
    
    table += "</tr>";

    this.table.html(table);
  }

  isDateTheSame (date1, date2) {
    return date1.getFullYear() == date2.getFullYear() &&
           date1.getMonth() == date2.getMonth() &&
           date1.getDate() == date2.getDate();
  }

  isDateBetween(dateBetween, date1, date2) {
    return dateBetween >= date1 &&
           dateBetween <= date2;
  }

}