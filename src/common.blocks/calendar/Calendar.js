/* eslint-disable class-methods-use-this */
class Calendar {
  constructor(container) {
    this.classes = require('./calendar.classes.json');
    this.vocabulary = require('./calendar.config.json').vocabulary;
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.displayMonth();
    this.checkLeftArrow();
    this.bindEventListeners();
    this.arrivalDateSubscriber = () => {};
    this.leavingDateSubscriber = () => {};
    this.submitSubscriber = () => {};
  }

  setArrivalDate(date) {
    this.state.arrivalDate = date;
  }

  setLeavingDate(date) {
    this.state.leavingDate = date;
  }

  setPickingDate(datePicking) {
    this.state.datePicking = datePicking;
    this.displayMonth();
  }

  setArrivalDateSubscriber(subscriber) {
    this.arrivalDateSubscriber = subscriber;
  }

  setLeavingDateSubscriber(subscriber) {
    this.leavingDateSubscriber = subscriber;
  }

  setSubmitSubscriber(subscriber) {
    this.submitSubscriber = subscriber;
  }

  findDOMNodes(container) {
    return {
      root: container.querySelector(`.${this.classes.root}`),
      title: container.querySelector(`.${this.classes.title}`),
      leftArrow: container.querySelector(`.${this.classes.leftArrow}`),
      rightArrow: container.querySelector(`.${this.classes.rightArrow}`),
      tableContainer: container.querySelector(`.${this.classes.tableContainer}`),
      clearButton: container.querySelector(`.${this.classes.clearButton} > button`),
      submitButton: container.querySelector(`.${this.classes.submitButton} > button`),
    };
  }

  getInitialState() {
    return {
      monthDisplayed: new Date(),
      arrivalDate: null,
      leavingDate: null,
      datePicking: '',
      isLeftArrowActive: true,
    };
  }

  bindEventListeners() {
    this.DOM.leftArrow.addEventListener('click', this.leftArrowClickHandler.bind(this));
    this.DOM.rightArrow.addEventListener('click', this.rightArrowClickHandler.bind(this));
    this.DOM.tableContainer.addEventListener('click', this.tableContainerClickHandler.bind(this));
    this.DOM.clearButton.addEventListener('click', this.clearButtonClickHandler.bind(this));
    this.DOM.submitButton.addEventListener('click', this.submitButtonClickHandler.bind(this));
  }

  leftArrowClickHandler() {
    if (this.state.isLeftArrowActive) {
      this.state.monthDisplayed = new Date(this.state.monthDisplayed.getFullYear(), this.state.monthDisplayed.getMonth() - 1);
      this.checkLeftArrow();
      this.displayMonth();
    }
  }

  rightArrowClickHandler() {
    this.state.monthDisplayed = new Date(this.state.monthDisplayed.getFullYear(), this.state.monthDisplayed.getMonth() + 1);
    this.checkLeftArrow();
    this.displayMonth();
  }

  tableContainerClickHandler(event) {
    if (!event.target.classList.contains(this.classes.cell)) return;
    if (!this.isDateActive(event.target)) return;

    const cellValue = parseInt(event.target.textContent, 10);
    const date = new Date(this.state.monthDisplayed.getFullYear(), this.state.monthDisplayed.getMonth(), cellValue);

    if (!this.state.arrivalDate || this.state.datePicking === 'arrivalDate') this.pickArrivalDate(date);
    else if (!this.state.leavingDate || this.state.datePicking === 'leavingDate') this.pickLeavingDate(date);
    else this.changeDates(date);

    this.displayMonth();
  }

  clearButtonClickHandler() {
    this.state.leavingDate = null;
    this.state.arrivalDate = null;
    this.arrivalDateSubscriber(this.state.arrivalDate);
    this.leavingDateSubscriber(this.state.leavingDate);
    this.displayMonth();
  }

  submitButtonClickHandler() {
    this.submitSubscriber();
  }

  checkLeftArrow() {
    const previousMonth = new Date(this.state.monthDisplayed.getFullYear(), this.state.monthDisplayed.getMonth());
    if (previousMonth < new Date()) this.state.isLeftArrowActive = false;
    else this.state.isLeftArrowActive = true;

    if (this.state.isLeftArrowActive) this.DOM.leftArrow.classList.remove(this.classes.arrowInactive);
    else this.DOM.leftArrow.classList.add(this.classes.arrowInactive);
  }

  pickArrivalDate(date) {
    if (this.dateIsBeforeCurrentDate(date)) return;
    if (this.dateIsAfterLeavingDate(date)) return;

    this.state.arrivalDate = date;
    this.arrivalDateSubscriber(date);
    this.state.datePicking = '';
  }

  pickLeavingDate(date) {
    if (this.dateIsBeforeArrivalDate(date)) return;

    this.state.leavingDate = date;
    this.leavingDateSubscriber(date);
    this.state.datePicking = '';
  }

  changeDates(date) {
    if (this.dateIsBeforeCurrentDate(date)) return;

    if (this.dateIsBeforeArrivalDate(date)) this.state.arrivalDate = date;
    else if (this.dateIsAfterLeavingDate(date)) this.state.leavingDate = date;
    else if (date > this.getMiddleDate()) this.state.leavingDate = date;
    else this.state.arrivalDate = date;

    this.arrivalDateSubscriber(this.state.arrivalDate);
    this.leavingDateSubscriber(this.state.leavingDate);
  }

  displayMonth(givenYear, givenMonth) {
    const month = givenMonth || this.state.monthDisplayed.getMonth();
    const year = givenYear || this.state.monthDisplayed.getFullYear();

    this.changeTitle();
    this.toggleClearButton();
    this.renderTable(year, month);
  }

  changeTitle() {
    const monthName = this.vocabulary.months[this.state.monthDisplayed.getMonth()];
    const year = this.state.monthDisplayed.getFullYear();

    this.DOM.title.innerHTML = `${monthName} ${year}`;
  }

  toggleClearButton() {
    if (this.state.arrivalDate || this.state.leavingDate) {
      this.DOM.root.querySelector(`.${this.classes.clearButton}`).appendChild(this.DOM.clearButton);
    } else this.DOM.clearButton.remove();
  }

  renderTable(year = 0, month = 0) {
    const date = new Date(year, month);

    const table = document.createElement('table');
    table.classList.add(this.classes.table);

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

    this.DOM.tableContainer.innerHTML = '';
    this.DOM.tableContainer.appendChild(table);
  }

  createTableHeader() {
    const header = document.createElement('tr');

    for (let i = 0; i < 7; i += 1) {
      const cell = document.createElement('th');
      cell.classList.add(this.classes.dayName);
      cell.innerHTML = this.vocabulary.weekDays[i];
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
    cell.classList.add(this.classes.cell);

    if (this.isDateBetween(date)) cell.classList.add(this.classes.dateBetween);
    if (this.dateShouldBeInactive(date)) cell.classList.add(this.classes.inactiveDate);
    if (this.dateCanBePickedAsArrival(date)) cell.classList.add(this.classes.pickingArrivalDate);
    if (this.dateCanBePickedAsLeaving(date)) cell.classList.add(this.classes.pickingLeavingDate);

    if (this.isArrivalDate(date)) this.makeArrivalDateCell(cell, cellValue);
    else if (this.isLeavingDate(date)) this.makeLeavingDateCell(cell, cellValue);
    else if (this.isCurrentDate(date)) this.makeCurrentDateCell(cell, cellValue);
    else cell.innerHTML = cellValue;

    return cell;
  }

  makeArrivalDateCell(cell, cellValue) {
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    circle.classList.add(this.classes.pickedDate);
    cell.classList.add(this.classes.arrivalDate);
    cell.appendChild(circle);

    return cell;
  }

  makeLeavingDateCell(cell, cellValue) {
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    circle.classList.add(this.classes.pickedDate);
    cell.classList.add(this.classes.leavingDate);
    cell.appendChild(circle);
  }

  makeCurrentDateCell(cell, cellValue) {
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    circle.classList.add(this.classes.currentDate);
    cell.appendChild(circle);
  }

  getMiddleDate() {
    const middleDateMs = (this.state.arrivalDate.getTime() + (this.state.leavingDate.getTime() - this.state.arrivalDate.getTime()) / 2);
    return new Date(middleDateMs);
  }

  isDateBetween(date) {
    return date >= this.state.arrivalDate
        && date <= this.state.leavingDate;
  }

  dateShouldBeInactive(date) {
    return date < new Date() || date.getMonth() !== this.state.monthDisplayed.getMonth();
  }

  dateCanBePickedAsArrival(date) {
    if (!this.dateCanBePicked(date)) return false;
    if (this.currentlyPickingLeavingDate()) return false;
    if (this.dateIsAfterLeavingDate(date)) return false;
    if (this.leavingDateNeedsToBePicked()) return false;
    if (this.middleDateShouldBeCalculated() && date > this.getMiddleDate()) return false;
    return true;
  }

  dateCanBePickedAsLeaving(date) {
    if (!this.dateCanBePicked(date)) return false;
    if (this.currentlyPickingArrivalDate()) return false;
    if (this.dateIsBeforeArrivalDate(date)) return false;
    if (this.arrivalDateNeedsToBePicked()) return false;
    if (this.middleDateShouldBeCalculated() && date <= this.getMiddleDate()) return false;
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
    return this.state.datePicking === 'arrivalDate';
  }

  currentlyPickingLeavingDate() {
    return this.state.datePicking === 'leavingDate' && this.state.arrivalDate;
  }

  dateIsAfterLeavingDate(date) {
    return this.state.leavingDate && date >= this.state.leavingDate;
  }

  dateIsBeforeArrivalDate(date) {
    return date < this.state.arrivalDate;
  }

  dateIsBeforeCurrentDate(date) {
    return date < new Date();
  }

  arrivalDateNeedsToBePicked() {
    return !this.state.arrivalDate;
  }

  leavingDateNeedsToBePicked() {
    return !this.state.leavingDate
      && this.state.arrivalDate
      && this.state.datePicking === '';
  }

  middleDateShouldBeCalculated() {
    return this.state.leavingDate && this.state.datePicking === '';
  }

  isDateActive(date) {
    return !date.classList.contains(this.classes.inactiveDate);
  }

  isArrivalDate(date) {
    return this.areDatesTheSame(date, this.state.arrivalDate);
  }

  isLeavingDate(date) {
    return this.areDatesTheSame(date, this.state.leavingDate);
  }

  isCurrentDate(date) {
    const currentDate = new Date();
    return this.areDatesTheSame(date, currentDate);
  }

  areDatesTheSame(date1, date2) {
    return date1
        && date2
        && date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
  }
}

export default Calendar;
