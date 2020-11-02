import CalendarStateItem from './CalendarStateItem';

/* eslint-disable class-methods-use-this */
class CalendarLogic {
  constructor(container) {
    this.classes = require('./calendar.classes.json');
    this.vocabulary = require('./calendar.config.json').vocabulary;
    this.DOM = this._findDOMNodes(container);
    this.state = this._getInitialState();
    this._displayMonth();
    this._renderLeftArrow();
    this._setSubscribers();
  }

  getArrivalDate() {
    return this.state.arrivalDate.value;
  }

  getLeavingDate() {
    return this.state.leavingDate.value;
  }

  setArrivalDate(date) {
    this._pickArrivalDate(date);
    return this.state.arrivalDate.value;
  }

  setLeavingDate(date) {
    this._pickLeavingDate(date);
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

  clickHandler(event) {
    if (event.target === this.DOM.leftArrow) this._leftArrowClickHandler();
    else if (event.target === this.DOM.rightArrow) this._rightArrowClickHandler();
    else if (event.target === this.DOM.clearButton) this._clearButtonClickHandler();
    else if (event.target === this.DOM.submitButton) this._submitButtonClickHandler();
    else if (event.target.closest(`.js-${this.classes.tableContainer}`) === this.DOM.tableContainer) {
      this._tableContainerClickHandler(event);
    }
  }

  _findDOMNodes(container) {
    return {
      root: container.querySelector(`.js-${this.classes.root}`),
      title: container.querySelector(`.js-${this.classes.title}`),
      leftArrow: container.querySelector(`.js-${this.classes.leftArrow}`),
      rightArrow: container.querySelector(`.js-${this.classes.rightArrow}`),
      tableContainer: container.querySelector(`.js-${this.classes.tableContainer}`),
      clearButton: container.querySelector(`.js-${this.classes.clearButton} > button`),
      submitButton: container.querySelector(`.js-${this.classes.submitButton} > button`),
    };
  }

  _getInitialState() {
    return {
      monthDisplayed: new CalendarStateItem(new Date()),
      arrivalDate: new CalendarStateItem(null),
      leavingDate: new CalendarStateItem(null),
      datePicking: new CalendarStateItem(null),
      isLeftArrowActive: new CalendarStateItem(null),
    };
  }

  _setSubscribers() {
    this.arrivalDateExternalSubscriber = () => {};
    this.leavingDateExternalSubscriber = () => {};
    this.submitSubscriber = () => {};

    this.state.arrivalDate.addSubscriber(this._displayMonth.bind(this));
    this.state.leavingDate.addSubscriber(this._displayMonth.bind(this));
    this.state.monthDisplayed.addSubscriber(this._displayMonth.bind(this));
    this.state.datePicking.addSubscriber(this._displayMonth.bind(this));
    this.state.monthDisplayed.addSubscriber(this._checkLeftArrow.bind(this));
    this.state.isLeftArrowActive.addSubscriber(this._renderLeftArrow.bind(this));
    this.state.arrivalDate.addSubscriber(this._arrivalDateSubscriber.bind(this));
    this.state.leavingDate.addSubscriber(this._leavingDateSubscriber.bind(this));
  }

  _arrivalDateSubscriber() {
    this.arrivalDateExternalSubscriber(this.state.arrivalDate.value);
  }

  _leavingDateSubscriber() {
    this.leavingDateExternalSubscriber(this.state.leavingDate.value);
  }

  _leftArrowClickHandler() {
    if (this.state.isLeftArrowActive.value) {
      this.state.monthDisplayed.value = new Date(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth() - 1);
    }
  }

  _rightArrowClickHandler() {
    this.state.monthDisplayed.value = new Date(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth() + 1);
  }

  _tableContainerClickHandler(event) {
    if (!event.target.classList.contains(this.classes.cell)) return;
    if (!this._isDateActive(event.target)) return;

    const cellValue = parseInt(event.target.textContent, 10);
    const date = new Date(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth(), cellValue);

    if (!this.state.arrivalDate.value || this.state.datePicking.value === 'arrivalDate') this._pickArrivalDate(date);
    else if (!this.state.leavingDate.value || this.state.datePicking.value === 'leavingDate') this._pickLeavingDate(date);
    else this._changeDates(date);
  }

  _clearButtonClickHandler() {
    this.state.leavingDate.value = null;
    this.state.arrivalDate.value = null;
  }

  _submitButtonClickHandler() {
    this.submitSubscriber();
  }

  _checkLeftArrow() {
    const previousMonth = new Date(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth());
    if (previousMonth < new Date()) this.state.isLeftArrowActive.value = false;
    else this.state.isLeftArrowActive.value = true;
  }

  _renderLeftArrow() {
    if (this.state.isLeftArrowActive.value) this.DOM.leftArrow.classList.remove(this.classes.arrowInactive);
    else this.DOM.leftArrow.classList.add(this.classes.arrowInactive);
  }

  _pickArrivalDate(date) {
    if (this._dateIsBeforeCurrentDate(date)) return;
    if (this._dateIsAfterLeavingDate(date)) return;

    this.state.arrivalDate.value = date;
    this.state.datePicking.value = '';
  }

  _pickLeavingDate(date) {
    if (this._dateIsBeforeCurrentDate(date)) return;
    if (this._dateIsBeforeArrivalDate(date)) return;

    this.state.leavingDate.value = date;
    this.state.datePicking.value = '';
  }

  _changeDates(date) {
    if (this._dateIsBeforeCurrentDate(date)) return;

    if (this._dateIsBeforeArrivalDate(date)) this.state.arrivalDate.value = date;
    else if (this._dateIsAfterLeavingDate(date)) this.state.leavingDate.value = date;
    else if (date > this._getMiddleDate()) this.state.leavingDate.value = date;
    else this.state.arrivalDate.value = date;
  }

  _displayMonth() {
    this._changeTitle();
    this._toggleClearButton();
    this._renderTable(this.state.monthDisplayed.value.getFullYear(), this.state.monthDisplayed.value.getMonth());
  }

  _changeTitle() {
    const monthName = this.vocabulary.months[this.state.monthDisplayed.value.getMonth()];
    const year = this.state.monthDisplayed.value.getFullYear();

    this.DOM.title.innerHTML = `${monthName} ${year}`;
  }

  _toggleClearButton() {
    if (this.state.arrivalDate.value || this.state.leavingDate.value) {
      this.DOM.root.querySelector(`.${this.classes.clearButton}`).appendChild(this.DOM.clearButton);
    } else this.DOM.clearButton.remove();
  }

  _renderTable(year = 0, month = 0) {
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

    const tableHeader = this._createTableHeader();
    table.appendChild(tableHeader);

    const nextMonth = new Date(year, month + 1);

    while (date <= nextMonth) {
      const row = this._createTableRow(date);
      table.appendChild(row);
    }

    this.DOM.tableContainer.innerHTML = '';
    this.DOM.tableContainer.appendChild(table);
  }

  _createTableHeader() {
    const header = document.createElement('tr');

    for (let i = 0; i < 7; i += 1) {
      const cell = document.createElement('th');
      cell.classList.add(this.classes.dayName);
      cell.innerHTML = this.vocabulary.weekDays[i];
      header.appendChild(cell);
    }

    return header;
  }

  _createTableRow(date) {
    const row = document.createElement('tr');

    for (let i = 0; i < 7; i += 1) {
      row.appendChild(this._createTableCell(date));
      date.setDate(date.getDate() + 1);
    }

    return row;
  }

  _createTableCell(date) {
    const cellValue = date.getDate();

    const cell = document.createElement('td');
    cell.classList.add(this.classes.cell);

    if (this._isDateBetween(date)) cell.classList.add(this.classes.dateBetween);
    if (this._dateShouldBeInactive(date)) cell.classList.add(this.classes.inactiveDate);
    if (this._dateCanBePickedAsArrival(date)) cell.classList.add(this.classes.pickingArrivalDate);
    if (this._dateCanBePickedAsLeaving(date)) cell.classList.add(this.classes.pickingLeavingDate);

    if (this._isArrivalDate(date)) this._makeArrivalDateCell(cell, cellValue);
    else if (this._isLeavingDate(date)) this._makeLeavingDateCell(cell, cellValue);
    else if (this._isCurrentDate(date)) this._makeCurrentDateCell(cell, cellValue);
    else cell.innerHTML = cellValue;

    return cell;
  }

  _makeArrivalDateCell(cell, cellValue) {
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    circle.classList.add(this.classes.pickedDate);
    cell.classList.add(this.classes.arrivalDate);
    cell.appendChild(circle);

    return cell;
  }

  _makeLeavingDateCell(cell, cellValue) {
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    circle.classList.add(this.classes.pickedDate);
    cell.classList.add(this.classes.leavingDate);
    cell.appendChild(circle);
  }

  _makeCurrentDateCell(cell, cellValue) {
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    circle.classList.add(this.classes.currentDate);
    cell.appendChild(circle);
  }

  _getMiddleDate() {
    const middleDateMs = (this.state.arrivalDate.value.getTime() + (this.state.leavingDate.value.getTime() - this.state.arrivalDate.value.getTime()) / 2);
    return new Date(middleDateMs);
  }

  _isDateBetween(date) {
    return this.state.arrivalDate.value
        && this.state.leavingDate.value
        && date >= this.state.arrivalDate.value
        && date <= this.state.leavingDate.value;
  }

  _dateShouldBeInactive(date) {
    return date < new Date() || date.getMonth() !== this.state.monthDisplayed.value.getMonth();
  }

  _dateCanBePickedAsArrival(date) {
    if (!this._dateCanBePicked(date)) return false;
    if (this._currentlyPickingLeavingDate()) return false;
    if (this._dateIsAfterLeavingDate(date)) return false;
    if (this._leavingDateNeedsToBePicked()) return false;
    if (this._middleDateShouldBeCalculated() && date > this._getMiddleDate()) return false;
    return true;
  }

  _dateCanBePickedAsLeaving(date) {
    if (!this._dateCanBePicked(date)) return false;
    if (this._currentlyPickingArrivalDate()) return false;
    if (this._dateIsBeforeArrivalDate(date)) return false;
    if (this._arrivalDateNeedsToBePicked()) return false;
    if (this._middleDateShouldBeCalculated() && date <= this._getMiddleDate()) return false;
    return true;
  }

  _dateCanBePicked(date) {
    if (this._dateShouldBeInactive(date)) return false;
    if (this._isLeavingDate(date)) return false;
    if (this._isArrivalDate(date)) return false;
    if (this._isCurrentDate(date)) return false;
    return true;
  }

  _currentlyPickingArrivalDate() {
    return this.state.datePicking.value === 'arrivalDate';
  }

  _currentlyPickingLeavingDate() {
    return this.state.datePicking.value === 'leavingDate' && this.state.arrivalDate.value;
  }

  _dateIsAfterLeavingDate(date) {
    return this.state.leavingDate.value && date >= this.state.leavingDate.value;
  }

  _dateIsBeforeArrivalDate(date) {
    return date < this.state.arrivalDate.value;
  }

  _dateIsBeforeCurrentDate(date) {
    return date < new Date();
  }

  _arrivalDateNeedsToBePicked() {
    return !this.state.arrivalDate.value;
  }

  _leavingDateNeedsToBePicked() {
    return !this.state.leavingDate.value
      && this.state.arrivalDate.value
      && this.state.datePicking.value === '';
  }

  _middleDateShouldBeCalculated() {
    return this.state.arrivalDate.value
      && this.state.leavingDate.value
      && this.state.datePicking.value === '';
  }

  _isDateActive(date) {
    return !date.classList.contains(this.classes.inactiveDate);
  }

  _isArrivalDate(date) {
    return this._areDatesTheSame(date, this.state.arrivalDate.value);
  }

  _isLeavingDate(date) {
    return this._areDatesTheSame(date, this.state.leavingDate.value);
  }

  _isCurrentDate(date) {
    const currentDate = new Date();
    return this._areDatesTheSame(date, currentDate);
  }

  _areDatesTheSame(date1, date2) {
    return date1
        && date2
        && date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
  }
}

export default CalendarLogic;
