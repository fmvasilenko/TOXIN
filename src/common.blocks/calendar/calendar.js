import Component from "@frontend/component";

export default class Calendar extends Component {

  constructor(rootElement, parent = {}) {
    super({root: rootElement, parent: parent});

    this.setConsts();
    this.setInitialState();
    this.bindEventListeners();
  }

  setState() {
    this.state = {
      arrivalDate: {
        value: null,
        isGlobal: true,
        subscribers: [
          this.displayMonth.bind(this)
        ]
      },
      leavingDate: {
        value: null,
        isGlobal: true,
        subscribers: [
          this.displayMonth.bind(this)
        ]
      },
      calendarDisplayed: {
        value: false,
        isGlobal: true,
        subscribers: [
          
        ]
      },
      monthDisplayed: {
        value: new Date(),
        subscribers: [
          this.displayMonth.bind(this)
        ]
      }
    }
  }

  setConsts() {
    this.CLASSES = {
      TABLE_CONTAINER: "calendar__table-wrapper",
      TABLE: "calendar__table",
      TITLE: "calendar__title",
      LEFT_ARROW: "calendar__left-arrow",
      RIGHT_ARROW: "calendar__right-arrow",
      DAY_NAME: "calendar__day-name",
      CELL: "calendar__number",
      ARRIVAL_DATE: "calendar__arrival-date",
      LEAVING_DATE: "calendar__leaving-date",
      CURRENT_DATE: "calendar__current-date",
      PICKED_DATE: "calendar__chosen-date",
      DATE_BETWEEN: "calendar__date-between",
      INACTIVE_DAY: "calendar__day-inactive",
      CLEAR_BUTTON: "js-calendar__clear-button",
      SUBMIT_BUTTON: "js-calendar__submit-button"
    };

    this.VOCABULARY = {
      MONTHS: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      WEEKDAYS: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    }
  }

  setInitialState() {
    this.tableContainer = this.root.find(`.${this.CLASSES.TABLE_CONTAINER}`);
    this.table = this.root.find(`.${this.CLASSES.TABLE}`);
    this.title = this.root.find(`.${this.CLASSES.TITLE}`);
    this.leftArrow = this.root.find(`.${this.CLASSES.LEFT_ARROW}`);
    this.rightArrow = this.root.find(`.${this.CLASSES.RIGHT_ARROW}`);
    this.clearButton = this.root.find(`.${this.CLASSES.CLEAR_BUTTON}`);
    this.submitButton = this.root.find(`.${this.CLASSES.SUBMIT_BUTTON}`);

    let arrivalYear = this.arrivalDate ? this.arrivalDate.getFullYear() : null;
    let arrivalMonth = this.arrivalDate ? this.arrivalDate.getMonth() : null;
    this.displayMonth(arrivalYear, arrivalMonth);
  }

  bindEventListeners() {
    this.leftArrow.click(this.leftArrowClickHandler.bind(this));
    this.rightArrow.click(this.rightArrowClickHandler.bind(this));
    this.tableContainer.click(this.tableContainerClickHandler.bind(this));
    this.clearButton.click(this.clearButtonClickHandler.bind(this));
    this.submitButton.click(this.submitButtonClickHandler.bind(this));
  }

  leftArrowClickHandler() {
    /** 
     * Looks like this function could be optimized 
     * but it`s critical for Component.js to use an assignment operator
     * instead of a direct 'setMonth()' function
    */
    
    let year = this.monthDisplayed.getFullYear();
    let month = this.monthDisplayed.getMonth();
    let newDate = new Date(year, month);

    newDate.setMonth(newDate.getMonth() - 1);
    this.monthDisplayed = newDate;
  }

  rightArrowClickHandler() {
    /** 
     * Check 'leftArrowClickHandler()' description
     * before trying to optimize this function
    */

    let year = this.monthDisplayed.getFullYear();
    let month = this.monthDisplayed.getMonth();
    let newDate = new Date(year, month);

    newDate.setMonth(newDate.getMonth() + 1);
    this.monthDisplayed = newDate;
  }

  tableContainerClickHandler(event) {
    let cellValue;
    switch (event.target.tagName) {
      case "TD": {
        cellValue = $(event.target).html();
        break;
      }

      case "DIV": {
        cellValue = $(event.target).find("div").html();
        break;
      }
    }

    if (!this.isDayActive($(event.target))) return false;

    if (!this.arrivalDate) {
      this.pickArrivalDate(cellValue);
    }
    else if (!this.leavingDate) {
      this.pickLeavingDate(cellValue);
    }
    else this.changeDates(cellValue);
  }

  clearButtonClickHandler() {
    this.leavingDate = null;
    this.arrivalDate = null;
  }

  submitButtonClickHandler() {
    this.calendarDisplayed = false;
  }

  displayMonth(year, month) {
    if (!year) year = this.monthDisplayed.getFullYear();
    if (!month) month = this.monthDisplayed.getMonth();

    this.renderTable(year, month);
    this.changeTitle();
  }

  changeTitle() {
    let monthName = this.VOCABULARY.MONTHS[this.monthDisplayed.getMonth()];
    let year = this.monthDisplayed.getFullYear();

    this.title.html(`${monthName} ${year}`);
  }

  pickArrivalDate(day = 1) {
    let year = this.monthDisplayed.getFullYear();
    let month = this.monthDisplayed.getMonth();
    let arrivalDate = new Date(year, month, day);
    let currentDate = new Date();

    if (arrivalDate < currentDate) return false;

    this.arrivalDate = arrivalDate;
  }

  pickLeavingDate(day = 1) {
    let year = this.monthDisplayed.getFullYear();
    let month = this.monthDisplayed.getMonth();
    let leavingDate = new Date(year, month, day);

    if (leavingDate < this.arrivalDate) return false;

    this.leavingDate = leavingDate;
  }

  changeDates(pickedDay = 0) {
    let year = this.monthDisplayed.getFullYear();
    let month = this.monthDisplayed.getMonth();
    let middleDateMs = (this.arrivalDate.getTime() + (this.leavingDate.getTime() - this.arrivalDate.getTime())/2);

    let date = new Date(year, month, pickedDay);
    let middleDate = new Date(middleDateMs);
    let currentDate = new Date();

    if (date <= currentDate) return false;

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

  renderTable(year = 0, month = 0) {
    let date = new Date(year, month);
    let table = $("<table>", {class: this.CLASSES.TABLE});
    
    date.setDate(2-date.getDay()); //going few days back to make the first week complete

    let tableHeader = this.createTableHeader();
    table.append(tableHeader);

    while (date.getMonth() <= month) {
      let row = this.createTableRow(date);
      table.append(row);
    }

    this.tableContainer.empty();
    this.tableContainer.append(table);
  }

  createTableHeader() {
    let header = $("<tr>");

    for (let i = 0; i < 7; i++) {
      let cell = $("<th>", {
        text: this.VOCABULARY.WEEKDAYS[i],
        class: this.CLASSES.DAY_NAME
      });

      header.append(cell);
    }

    return header;
  }

  createTableRow(date) {
    let row = $("<tr>");

    for (let i = 0; i < 7; i++) {
      let cell = this.createTableCell(date);
      row.append(cell);

      date.setDate(date.getDate() + 1);
    }

    return row;
  }

  createTableCell(date) {
    let cellValue = date.getDate();
    let cell = $("<td>", {class: this.CLASSES.CELL});
    let circle = $("<div>", {text: cellValue});
    
    if (this.isDateBetween(date))
      cell.addClass(this.CLASSES.DATE_BETWEEN);

    if (date.getMonth() != this.monthDisplayed.getMonth())
      cell.addClass(this.CLASSES.INACTIVE_DAY);
    
    if (this.isArrivalDate(date)) {
      circle.addClass(this.CLASSES.PICKED_DATE);
      cell.addClass(this.CLASSES.ARRIVAL_DATE);
      cell.append(circle);
    }
    else if (this.isLeavingDate(date)) {
      circle.addClass(this.CLASSES.PICKED_DATE);
      cell.addClass(this.CLASSES.LEAVING_DATE);
      cell.append(circle);
    }
    else if (this.isCurrentDate(date)) {
      circle.addClass(this.CLASSES.CURRENT_DATE);
      cell.append(circle);
    }
    else {
      cell.html(cellValue);
    }

    return cell;
  }

  areDatesTheSame (date1, date2) {
    if (!date1) return false;
    if (!date2) return false;

    return date1.getFullYear() == date2.getFullYear() &&
           date1.getMonth() == date2.getMonth() &&
           date1.getDate() == date2.getDate();
  }

  isDateBetween(date) {
    return date >= this.arrivalDate &&
           date <= this.leavingDate;
  }

  isArrivalDate(date) {
    return this.areDatesTheSame(date, this.arrivalDate);
  }

  isLeavingDate(date) {
    return this.areDatesTheSame(date, this.leavingDate);
  }

  isCurrentDate(date) {
    let currentDate = new Date();
    return this.areDatesTheSame(date, currentDate);
  }

  isDayActive(day) {
    return !day.hasClass(this.CLASSES.INACTIVE_DAY);
  }

}