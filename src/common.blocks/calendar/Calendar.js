import CalendarStateItem from './CalendarStateItem';

/* eslint-disable class-methods-use-this */
class Calendar {
  constructor(container) {
    this.classes = require('./calendar.classes.json');
    this.vocabulary = require('./calendar.config.json').vocabulary;
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.displayMonth();
    this.renderLeftArrow();
    this.bindEventListeners();
    this.setSubscribers();
  }

  setArrivalDate(date) {
    this.state.arrivalDate.set(date);
  }

  setLeavingDate(date) {
    this.state.leavingDate.set(date);
  }

  setPickingDate(datePicking) {
    this.state.datePicking.set(datePicking);
  }

  setArrivalDateSubscriber(subscriber) {
    this.arrivalDateExternalSubscriber = subscriber;
  }

  setLeavingDateSubscriber(subscriber) {
    this.leavingDateExternalSubscriber = subscriber;
  }

  setSubmitSubscriber(subscriber) {
    this.submitSubscriber = subscriber;
  }

  getArrivalDate() {
    return this.state.arrivalDate.get();
  }

  getLeavingDate() {
    return this.state.leavingDate.get();
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
      monthDisplayed: new CalendarStateItem(new Date()),
      arrivalDate: new CalendarStateItem(null),
      leavingDate: new CalendarStateItem(null),
      datePicking: new CalendarStateItem(null),
      isLeftArrowActive: new CalendarStateItem(null),
    };
  }

  setSubscribers() {
    this.arrivalDateExternalSubscriber = () => {};
    this.leavingDateExternalSubscriber = () => {};
    this.submitSubscriber = () => {};

    this.state.arrivalDate.addSubscriber(this.displayMonth.bind(this));
    this.state.leavingDate.addSubscriber(this.displayMonth.bind(this));
    this.state.monthDisplayed.addSubscriber(this.displayMonth.bind(this));
    this.state.datePicking.addSubscriber(this.displayMonth.bind(this));
    this.state.monthDisplayed.addSubscriber(this.checkLeftArrow.bind(this));
    this.state.isLeftArrowActive.addSubscriber(this.renderLeftArrow.bind(this));
    this.state.arrivalDate.addSubscriber(this.arrivalDateSubscriber.bind(this));
    this.state.leavingDate.addSubscriber(this.leavingDateSubscriber.bind(this));
  }

  arrivalDateSubscriber() {
    this.arrivalDateExternalSubscriber(this.state.arrivalDate.get());
  }

  leavingDateSubscriber() {
    this.leavingDateExternalSubscriber(this.state.leavingDate.get());
  }

  bindEventListeners() {
    this.DOM.leftArrow.addEventListener('click', this.leftArrowClickHandler.bind(this));
    this.DOM.rightArrow.addEventListener('click', this.rightArrowClickHandler.bind(this));
    this.DOM.tableContainer.addEventListener('click', this.tableContainerClickHandler.bind(this));
    this.DOM.clearButton.addEventListener('click', this.clearButtonClickHandler.bind(this));
    this.DOM.submitButton.addEventListener('click', this.submitButtonClickHandler.bind(this));
  }

  leftArrowClickHandler() {
    if (this.state.isLeftArrowActive.get()) {
      this.state.monthDisplayed.set(new Date(this.state.monthDisplayed.get().getFullYear(), this.state.monthDisplayed.get().getMonth() - 1));
    }
  }

  rightArrowClickHandler() {
    this.state.monthDisplayed.set(new Date(this.state.monthDisplayed.get().getFullYear(), this.state.monthDisplayed.get().getMonth() + 1));
  }

  tableContainerClickHandler(event) {
    if (!event.target.classList.contains(this.classes.cell)) return;
    if (!this.isDateActive(event.target)) return;

    const cellValue = parseInt(event.target.textContent, 10);
    const date = new Date(this.state.monthDisplayed.get().getFullYear(), this.state.monthDisplayed.get().getMonth(), cellValue);

    if (!this.state.arrivalDate.get() || this.state.datePicking.get() === 'arrivalDate') this.pickArrivalDate(date);
    else if (!this.state.leavingDate.get() || this.state.datePicking.get() === 'leavingDate') this.pickLeavingDate(date);
    else this.changeDates(date);
  }

  clearButtonClickHandler() {
    this.state.leavingDate.set(null);
    this.state.arrivalDate.set(null);
  }

  submitButtonClickHandler() {
    this.submitSubscriber();
  }

  checkLeftArrow() {
    const previousMonth = new Date(this.state.monthDisplayed.get().getFullYear(), this.state.monthDisplayed.get().getMonth());
    if (previousMonth < new Date()) this.state.isLeftArrowActive.set(false);
    else this.state.isLeftArrowActive.set(true);
  }

  renderLeftArrow() {
    if (this.state.isLeftArrowActive.get()) this.DOM.leftArrow.classList.remove(this.classes.arrowInactive);
    else this.DOM.leftArrow.classList.add(this.classes.arrowInactive);
  }

  pickArrivalDate(date) {
    if (this.dateIsBeforeCurrentDate(date)) return;
    if (this.dateIsAfterLeavingDate(date)) return;

    this.state.arrivalDate.set(date);
    this.state.datePicking.set('');
  }

  pickLeavingDate(date) {
    if (this.dateIsBeforeArrivalDate(date)) return;

    this.state.leavingDate.set(date);
    this.state.datePicking.set('');
  }

  changeDates(date) {
    if (this.dateIsBeforeCurrentDate(date)) return;

    if (this.dateIsBeforeArrivalDate(date)) this.state.arrivalDate.set(date);
    else if (this.dateIsAfterLeavingDate(date)) this.state.leavingDate.set(date);
    else if (date > this.getMiddleDate()) this.state.leavingDate.set(date);
    else this.state.arrivalDate.set(date);
  }

  displayMonth() {
    this.changeTitle();
    this.toggleClearButton();
    this.renderTable(this.state.monthDisplayed.get().getFullYear(), this.state.monthDisplayed.get().getMonth());
  }

  changeTitle() {
    const monthName = this.vocabulary.months[this.state.monthDisplayed.get().getMonth()];
    const year = this.state.monthDisplayed.get().getFullYear();

    this.DOM.title.innerHTML = `${monthName} ${year}`;
  }

  toggleClearButton() {
    if (this.state.arrivalDate.get() || this.state.leavingDate.get()) {
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
    const middleDateMs = (this.state.arrivalDate.get().getTime() + (this.state.leavingDate.get().getTime() - this.state.arrivalDate.get().getTime()) / 2);
    return new Date(middleDateMs);
  }

  isDateBetween(date) {
    return date >= this.state.arrivalDate.get()
        && date <= this.state.leavingDate.get();
  }

  dateShouldBeInactive(date) {
    return date < new Date() || date.getMonth() !== this.state.monthDisplayed.get().getMonth();
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
    return this.state.datePicking.get() === 'arrivalDate';
  }

  currentlyPickingLeavingDate() {
    return this.state.datePicking.get() === 'leavingDate' && this.state.arrivalDate.get();
  }

  dateIsAfterLeavingDate(date) {
    return this.state.leavingDate.get() && date >= this.state.leavingDate.get();
  }

  dateIsBeforeArrivalDate(date) {
    return date < this.state.arrivalDate.get();
  }

  dateIsBeforeCurrentDate(date) {
    return date < new Date();
  }

  arrivalDateNeedsToBePicked() {
    return !this.state.arrivalDate.get();
  }

  leavingDateNeedsToBePicked() {
    return !this.state.leavingDate.get()
      && this.state.arrivalDate.get()
      && this.state.datePicking.get() === '';
  }

  middleDateShouldBeCalculated() {
    return this.state.leavingDate.get() && this.state.datePicking.get() === '';
  }

  isDateActive(date) {
    return !date.classList.contains(this.classes.inactiveDate);
  }

  isArrivalDate(date) {
    return this.areDatesTheSame(date, this.state.arrivalDate.get());
  }

  isLeavingDate(date) {
    return this.areDatesTheSame(date, this.state.leavingDate.get());
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
