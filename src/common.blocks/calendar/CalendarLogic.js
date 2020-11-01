import CalendarStateItem from './CalendarStateItem';

/* eslint-disable class-methods-use-this */
class CalendarLogic {
  constructor(container) {
    this.classes = require('./calendar.classes.json');
    this.vocabulary = require('./calendar.config.json').vocabulary;
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.displayMonth();
    this.renderLeftArrow();
    this.setSubscribers();
  }

  getArrivalDate() {
    return this.state.arrivalDate.value;
  }

  getLeavingDate() {
    return this.state.leavingDate.value;
  }

  setArrivalDate(date) {
    this.pickArrivalDate(date);
    return this.state.arrivalDate.value;
  }

  setLeavingDate(date) {
    this.pickLeavingDate(date);
    return this.state.leavingDate.value;
  }

  setPickingDate(datePicking) {
    this.state.datePicking.value = datePicking;
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
    this.arrivalDateExternalSubscriber(this.state.arrivalDate.value);
  }

  leavingDateSubscriber() {
    this.leavingDateExternalSubscriber(this.state.leavingDate.value);
  }

  clickHandler(event) {
    if (event.target === this.DOM.leftArrow) this.leftArrowClickHandler();
    else if (event.target === this.DOM.rightArrow) this.rightArrowClickHandler();
    else if (event.target === this.DOM.clearButton) this.clearButtonClickHandler();
    else if (event.target === this.DOM.submitButton) this.submitButtonClickHandler();
    else if (event.target.closest(`.${this.classes.tableContainer}`) === this.DOM.tableContainer) {
      this.tableContainerClickHandler(event);
    }
  }

  leftArrowClickHandler() {
    if (this.state.isLeftArrowActive.value) {
      this.state.monthDisplayed.value = new Date(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth() - 1);
    }
  }

  rightArrowClickHandler() {
    this.state.monthDisplayed.value = new Date(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth() + 1);
  }

  tableContainerClickHandler(event) {
    if (!event.target.classList.contains(this.classes.cell)) return;
    if (!this.isDateActive(event.target)) return;

    const cellValue = parseInt(event.target.textContent, 10);
    const date = new Date(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth(), cellValue);

    if (!this.state.arrivalDate.value || this.state.datePicking.value === 'arrivalDate') this.pickArrivalDate(date);
    else if (!this.state.leavingDate.value || this.state.datePicking.value === 'leavingDate') this.pickLeavingDate(date);
    else this.changeDates(date);
  }

  clearButtonClickHandler() {
    this.state.leavingDate.value = null;
    this.state.arrivalDate.value = null;
  }

  submitButtonClickHandler() {
    this.submitSubscriber();
  }

  checkLeftArrow() {
    const previousMonth = new Date(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth());
    if (previousMonth < new Date()) this.state.isLeftArrowActive.value = false;
    else this.state.isLeftArrowActive.value = true;
  }

  renderLeftArrow() {
    if (this.state.isLeftArrowActive.value) this.DOM.leftArrow.classList.remove(this.classes.arrowInactive);
    else this.DOM.leftArrow.classList.add(this.classes.arrowInactive);
  }

  pickArrivalDate(date) {
    if (this.dateIsBeforeCurrentDate(date)) return;
    if (this.dateIsAfterLeavingDate(date)) return;

    this.state.arrivalDate.value = date;
    this.state.datePicking.value = '';
  }

  pickLeavingDate(date) {
    if (this.dateIsBeforeCurrentDate(date)) return;
    if (this.dateIsBeforeArrivalDate(date)) return;

    this.state.leavingDate.value = date;
    this.state.datePicking.value = '';
  }

  changeDates(date) {
    if (this.dateIsBeforeCurrentDate(date)) return;

    if (this.dateIsBeforeArrivalDate(date)) this.state.arrivalDate.value = date;
    else if (this.dateIsAfterLeavingDate(date)) this.state.leavingDate.value = date;
    else if (date > this.getMiddleDate()) this.state.leavingDate.value = date;
    else this.state.arrivalDate.value = date;
  }

  displayMonth() {
    this.changeTitle();
    this.toggleClearButton();
    this.renderTable(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth());
  }

  changeTitle() {
    const monthName = this.vocabulary.months[this.state.monthDisplayed.value.getMonth()];
    const year = this.state.monthDisplayed.value.getFullYear();

    this.DOM.title.innerHTML = `${monthName} ${year}`;
  }

  toggleClearButton() {
    if (this.state.arrivalDate.value || this.state.leavingDate.value) {
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
    const middleDateMs = (this.state.arrivalDate.value.getTime() + (this.state.leavingDate.value.getTime() - this.state.arrivalDate.value.getTime()) / 2);
    return new Date(middleDateMs);
  }

  isDateBetween(date) {
    return this.state.arrivalDate.value
        && this.state.leavingDate.value
        && date >= this.state.arrivalDate.value
        && date <= this.state.leavingDate.value;
  }

  dateShouldBeInactive(date) {
    return date < new Date() || date.getMonth() !== this.state.monthDisplayed.value.getMonth();
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
    return this.state.datePicking.value === 'arrivalDate';
  }

  currentlyPickingLeavingDate() {
    return this.state.datePicking.value === 'leavingDate' && this.state.arrivalDate.value;
  }

  dateIsAfterLeavingDate(date) {
    return this.state.leavingDate.value && date >= this.state.leavingDate.value;
  }

  dateIsBeforeArrivalDate(date) {
    return date < this.state.arrivalDate.value;
  }

  dateIsBeforeCurrentDate(date) {
    return date < new Date();
  }

  arrivalDateNeedsToBePicked() {
    return !this.state.arrivalDate.value;
  }

  leavingDateNeedsToBePicked() {
    return !this.state.leavingDate.value
      && this.state.arrivalDate.value
      && this.state.datePicking.value === '';
  }

  middleDateShouldBeCalculated() {
    return this.state.arrivalDate.value
      && this.state.leavingDate.value 
      && this.state.datePicking.value === '';
  }

  isDateActive(date) {
    return !date.classList.contains(this.classes.inactiveDate);
  }

  isArrivalDate(date) {
    return this.areDatesTheSame(date, this.state.arrivalDate.value);
  }

  isLeavingDate(date) {
    return this.areDatesTheSame(date, this.state.leavingDate.value);
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

export default CalendarLogic;
