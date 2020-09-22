/* eslint-disable class-methods-use-this */
import Component from '../../js/frontend/Component';

class Calendar extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });

    this.setConsts();
    this.setInitialState();
  }

  setState() {
    this.state = {
      arrivalDate: {
        value: null,
        isGlobal: true,
        subscribers: [
          this.displayMonth.bind(this),
        ],
      },
      leavingDate: {
        value: null,
        isGlobal: true,
        subscribers: [
          this.displayMonth.bind(this),
        ],
      },
      datePicking: {
        value: '',
        isGlobal: true,
        subscribers: [
          this.displayMonth.bind(this),
        ],
      },
      calendarDisplayed: {
        value: false,
        isGlobal: true,
      },
      monthDisplayed: {
        value: new Date(),
        subscribers: [
          this.displayMonth.bind(this),
          this.checkLeftArrow.bind(this),
        ],
      },
      isLeftArrowActive: {
        value: true,
        subscribers: [
          this.renderLeftArrow.bind(this),
        ],
      },
    };
  }

  setClasses() {
    this.CLASSES = require('./calendar.classes.json');
  }

  setConsts() {
    this.VOCABULARY = require('./calendar.config.json').vocabulary;
  }

  setInitialState() {
    this.tableContainer = this.root.querySelector(`.${this.CLASSES.TABLE_CONTAINER}`);
    this.title = this.root.querySelector(`.${this.CLASSES.TITLE}`);
    this.leftArrow = this.root.querySelector(`.${this.CLASSES.LEFT_ARROW}`);
    this.rightArrow = this.root.querySelector(`.${this.CLASSES.RIGHT_ARROW}`);
    this.clearButton = this.root.querySelector(`.${this.CLASSES.CLEAR_BUTTON}`);
    this.submitButton = this.root.querySelector(`.${this.CLASSES.SUBMIT_BUTTON}`);

    const arrivalYear = this.arrivalDate ? this.arrivalDate.getFullYear() : null;
    const arrivalMonth = this.arrivalDate ? this.arrivalDate.getMonth() : null;
    this.displayMonth(arrivalYear, arrivalMonth);
    this.checkLeftArrow();
  }

  clickHandler(event) {
    if (this.leftArrowClicked(event) && this.isLeftArrowActive) this.leftArrowClickHandler();
    else if (this.rightArrowClicked(event)) this.rightArrowClickHandler();
    else if (this.tableContainerClicked(event)) this.tableContainerClickHandler(event);
    else if (this.clearButtonClicked(event)) this.clearButtonClickHandler();
    else if (this.submitButtonClicked(event)) this.submitButtonClickHandler();
  }

  leftArrowClicked(event) {
    return event.target.closest(`.${this.CLASSES.LEFT_ARROW}`) === this.leftArrow;
  }

  rightArrowClicked(event) {
    return event.target.closest(`.${this.CLASSES.RIGHT_ARROW}`) === this.rightArrow;
  }

  tableContainerClicked(event) {
    return event.target.closest(`.${this.CLASSES.TABLE_CONTAINER}`) === this.tableContainer;
  }

  clearButtonClicked(event) {
    return event.target.closest(`.${this.CLASSES.CLEAR_BUTTON}`) === this.clearButton;
  }

  submitButtonClicked(event) {
    return event.target.closest(`.${this.CLASSES.SUBMIT_BUTTON}`) === this.submitButton;
  }

  leftArrowClickHandler() {
    this.monthDisplayed = new Date(this.monthDisplayed.getFullYear(), this.monthDisplayed.getMonth() - 1);
  }

  rightArrowClickHandler() {
    this.monthDisplayed = new Date(this.monthDisplayed.getFullYear(), this.monthDisplayed.getMonth() + 1);
  }

  tableContainerClickHandler(event) {
    if (!event.target.classList.contains(this.CLASSES.CELL)) return;
    if (!this.isDateActive(event.target)) return;

    const cellValue = parseInt(event.target.textContent, 10);
    const date = new Date(this.monthDisplayed.getFullYear(), this.monthDisplayed.getMonth(), cellValue);

    if (!this.arrivalDate || this.datePicking === 'arrivalDate') this.pickArrivalDate(date);
    else if (!this.leavingDate || this.datePicking === 'leavingDate') this.pickLeavingDate(date);
    else this.changeDates(date);
  }

  clearButtonClickHandler() {
    this.leavingDate = null;
    this.arrivalDate = null;
  }

  submitButtonClickHandler() {
    this.calendarDisplayed = false;
  }

  checkLeftArrow() {
    const previousMonth = new Date(this.monthDisplayed.getFullYear(), this.monthDisplayed.getMonth());
    if (previousMonth < new Date()) this.isLeftArrowActive = false;
    else this.isLeftArrowActive = true;
  }

  renderLeftArrow() {
    if (this.isLeftArrowActive) this.leftArrow.classList.remove(this.CLASSES.ARROW_INACTIVE);
    else this.leftArrow.classList.add(this.CLASSES.ARROW_INACTIVE);
  }

  displayMonth(givenYear, givenMonth) {
    const month = givenMonth || this.monthDisplayed.getMonth();
    const year = givenYear || this.monthDisplayed.getFullYear();

    this.renderTable(year, month);
    this.changeTitle();
  }

  changeTitle() {
    const monthName = this.VOCABULARY.MONTHS[this.monthDisplayed.getMonth()];
    const year = this.monthDisplayed.getFullYear();

    this.title.innerHTML = `${monthName} ${year}`;
  }

  pickArrivalDate(date) {
    if (this.dateIsBeforeCurrentDate(date)) return;
    if (this.dateIsAfterLeavingDate(date)) return;

    this.arrivalDate = date;
    this.datePicking = '';
  }

  pickLeavingDate(date) {
    if (this.dateIsBeforeArrivalDate(date)) return;

    this.leavingDate = date;
    this.datePicking = '';
  }

  changeDates(date) {
    if (this.dateIsBeforeCurrentDate(date)) return;

    if (this.dateIsBeforeArrivalDate(date)) this.arrivalDate = date;
    else if (this.dateIsAfterLeavingDate(date)) this.leavingDate = date;
    else if (date > this.getMiddleDate()) this.leavingDate = date;
    else this.arrivalDate = date;
  }

  renderTable(year = 0, month = 0) {
    const date = new Date(year, month);

    const table = document.createElement('table');
    table.classList.add(this.CLASSES.TABLE);

    /*
      The following construction is needed because Date object has
      sunday as the first day of the week. But we transfer it to
      Russian calendar system.
      2 - is a shift coefficient for all days except if the first day of month is sunday
      -5 - is a shift coefficient for sunday
    */

    if (date.getDay() !== 0) date.setDate(2 - date.getDay()); // going few days back to make the first week complete
    else date.setDate(-5);

    const tableHeader = this.createTableHeader();
    table.appendChild(tableHeader);

    const nextMonth = new Date(year, month + 1);

    while (date <= nextMonth) {
      const row = this.createTableRow(date);
      table.appendChild(row);
    }

    this.tableContainer.innerHTML = '';
    this.tableContainer.appendChild(table);
  }

  createTableHeader() {
    const header = document.createElement('tr');

    for (let i = 0; i < 7; i += 1) {
      const cell = document.createElement('th');
      cell.classList.add(this.CLASSES.DAY_NAME);
      cell.innerHTML = this.VOCABULARY.WEEKDAYS[i];
      header.appendChild(cell);
    }

    return header;
  }

  createTableRow(date) {
    const row = document.createElement('tr');

    for (let i = 0; i < 7; i += 1) {
      row.appendChild(this.createTableCell(date));
      date.setDate(date.getDate() + 1);
    }

    return row;
  }

  createTableCell(date) {
    const cellValue = date.getDate();

    const cell = document.createElement('td');
    cell.classList.add(this.CLASSES.CELL);

    if (this.isDateBetween(date)) cell.classList.add(this.CLASSES.DATE_BETWEEN);
    if (this.dateShouldBeInactive(date)) cell.classList.add(this.CLASSES.INACTIVE_DAY);
    if (this.dateCanBePickedAsArrival(date)) cell.classList.add(this.CLASSES.PICKING_ARRIVAL_DATE);
    if (this.dateCanBePickedAsLeaving(date)) cell.classList.add(this.CLASSES.PICKING_LEAVING_DATE);

    if (this.isArrivalDate(date)) this.makeArrivalDateCell(cell, cellValue);
    else if (this.isLeavingDate(date)) this.makeLeavingDateCell(cell, cellValue);
    else if (this.isCurrentDate(date)) this.makeCurrentDateCell(cell, cellValue);
    else cell.innerHTML = cellValue;

    return cell;
  }

  makeArrivalDateCell(cell, cellValue) {
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    circle.classList.add(this.CLASSES.PICKED_DATE);
    cell.classList.add(this.CLASSES.ARRIVAL_DATE);
    cell.appendChild(circle);

    return cell;
  }

  makeLeavingDateCell(cell, cellValue) {
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    circle.classList.add(this.CLASSES.PICKED_DATE);
    cell.classList.add(this.CLASSES.LEAVING_DATE);
    cell.appendChild(circle);
  }

  makeCurrentDateCell(cell, cellValue) {
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    circle.classList.add(this.CLASSES.CURRENT_DATE);
    cell.appendChild(circle);
  }

  getMiddleDate() {
    const middleDateMs = (this.arrivalDate.getTime() + (this.leavingDate.getTime() - this.arrivalDate.getTime()) / 2);
    return new Date(middleDateMs);
  }

  areDatesTheSame(date1, date2) {
    return date1
        && date2
        && date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
  }

  isDateBetween(date) {
    return date >= this.arrivalDate
        && date <= this.leavingDate;
  }

  isArrivalDate(date) {
    return this.areDatesTheSame(date, this.arrivalDate);
  }

  isLeavingDate(date) {
    return this.areDatesTheSame(date, this.leavingDate);
  }

  isCurrentDate(date) {
    const currentDate = new Date();
    return this.areDatesTheSame(date, currentDate);
  }

  isDateActive(day) {
    return !day.classList.contains(this.CLASSES.INACTIVE_DAY);
  }

  dateShouldBeInactive(date) {
    return date < new Date() || date.getMonth() !== this.monthDisplayed.getMonth();
  }

  dateCanBePickedAsLeaving(date) {
    if (!this.dateCanBePicked(date)) return false;
    if (this.currentlyPickingArrivalDate()) return false;
    if (this.dateIsBeforeArrivalDate(date)) return false;
    if (this.arrivalDateNeedsToBePicked()) return false;
    if (this.middleDateShouldBeCalculated() && date <= this.getMiddleDate()) return false;
    return true;
  }

  dateCanBePickedAsArrival(date) {
    if (!this.dateCanBePicked(date)) return false;
    if (this.currentlyPickingLeavingDate()) return false;
    if (this.dateIsAfterLeavingDate(date)) return false;
    if (this.leavingDateNeedsToBePicked()) return false;
    if (this.middleDateShouldBeCalculated() && date > this.getMiddleDate()) return false;
    return true;
  }

  dateCanBePicked(date) {
    if (this.dateShouldBeInactive(date)) return false;
    if (this.isLeavingDate(date)) return false;
    if (this.isArrivalDate(date)) return false;
    if (this.isCurrentDate(date)) return false;
    return true;
  }

  currentlyPickingArrivalDate() {
    return this.datePicking === 'arrivalDate';
  }

  currentlyPickingLeavingDate() {
    return this.datePicking === 'leavingDate' && this.arrivalDate;
  }

  dateIsBeforeArrivalDate(date) {
    return date < this.arrivalDate;
  }

  dateIsAfterLeavingDate(date) {
    return this.leavingDate && date >= this.leavingDate;
  }

  dateIsBeforeCurrentDate(date) {
    return date < new Date();
  }

  arrivalDateNeedsToBePicked() {
    return !this.arrivalDate;
  }

  leavingDateNeedsToBePicked() {
    return !this.leavingDate
      && this.arrivalDate
      && this.datePicking === '';
  }

  middleDateShouldBeCalculated() {
    return this.leavingDate && this.datePicking === '';
  }
}

export default Calendar;
