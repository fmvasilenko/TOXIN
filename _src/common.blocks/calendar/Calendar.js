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
      calendarDisplayed: {
        value: false,
        isGlobal: true,
        subscribers: [],
      },
      monthDisplayed: {
        value: new Date(),
        subscribers: [
          this.displayMonth.bind(this),
        ],
      },
    };
  }

  setClasses() {
    this.CLASSES = {
      TABLE_CONTAINER: 'js-calendar__table-wrapper',
      TABLE: 'calendar__table',
      TITLE: 'js-calendar__title',
      LEFT_ARROW: 'js-calendar__left-arrow',
      RIGHT_ARROW: 'js-calendar__right-arrow',
      DAY_NAME: 'calendar__day-name',
      CELL: 'calendar__number',
      ARRIVAL_DATE: 'calendar__arrival-date',
      LEAVING_DATE: 'calendar__leaving-date',
      CURRENT_DATE: 'calendar__current-date',
      PICKED_DATE: 'calendar__chosen-date',
      DATE_BETWEEN: 'calendar__date-between',
      INACTIVE_DAY: 'calendar__day-inactive',
      CLEAR_BUTTON: 'js-calendar__clear-button',
      SUBMIT_BUTTON: 'js-calendar__submit-button',
    };
  }

  setConsts() {
    this.VOCABULARY = {
      MONTHS: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      WEEKDAYS: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    };
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
  }

  clickHandler(event) {
    if (this.leftArrowClicked(event)) this.leftArrowClickHandler();
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
    /**
     * Looks like this function could be optimized
     * but it`s critical for Component.js to use an assignment operator
     * instead of a direct 'setMonth()' function
    */

    const year = this.monthDisplayed.getFullYear();
    const month = this.monthDisplayed.getMonth();
    const newDate = new Date(year, month);

    newDate.setMonth(newDate.getMonth() - 1);
    this.monthDisplayed = newDate;
  }

  rightArrowClickHandler() {
    /**
     * Check 'leftArrowClickHandler()' description
     * before trying to optimize this function
    */

    const year = this.monthDisplayed.getFullYear();
    const month = this.monthDisplayed.getMonth();
    const newDate = new Date(year, month);

    newDate.setMonth(newDate.getMonth() + 1);
    this.monthDisplayed = newDate;
  }

  tableContainerClickHandler(event) {
    const cellValue = parseInt(event.target.textContent, 10);

    if (!this.isDayActive(event.target)) return;

    if (!this.arrivalDate) {
      this.pickArrivalDate(cellValue);
    } else if (!this.leavingDate) {
      this.pickLeavingDate(cellValue);
    } else this.changeDates(cellValue);
  }

  clearButtonClickHandler() {
    this.leavingDate = null;
    this.arrivalDate = null;
  }

  submitButtonClickHandler() {
    this.calendarDisplayed = false;
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

  pickArrivalDate(day = 1) {
    const year = this.monthDisplayed.getFullYear();
    const month = this.monthDisplayed.getMonth();
    const arrivalDate = new Date(year, month, day);
    const currentDate = new Date();

    if (arrivalDate < currentDate) return;

    this.arrivalDate = arrivalDate;
  }

  pickLeavingDate(day = 1) {
    const year = this.monthDisplayed.getFullYear();
    const month = this.monthDisplayed.getMonth();
    const leavingDate = new Date(year, month, day);

    if (leavingDate < this.arrivalDate) return;

    this.leavingDate = leavingDate;
  }

  changeDates(pickedDay = 0) {
    const year = this.monthDisplayed.getFullYear();
    const month = this.monthDisplayed.getMonth();
    const middleDateMs = (this.arrivalDate.getTime() + (this.leavingDate.getTime() - this.arrivalDate.getTime()) / 2);

    const date = new Date(year, month, pickedDay);
    const middleDate = new Date(middleDateMs);
    const currentDate = new Date();

    if (date <= currentDate) return;

    if (date < this.arrivalDate) {
      this.arrivalDate = date;
    } else if (date > this.leavingDate) {
      this.leavingDate = date;
    } else if (date > middleDate) {
      this.leavingDate = date;
    } else {
      this.arrivalDate = date;
    }
  }

  renderTable(year = 0, month = 0) {
    const date = new Date(year, month);
    // eslint-disable-next-line no-undef
    const table = document.createElement('table');
    table.classList.add(this.CLASSES.TABLE);

    date.setDate(2 - date.getDay()); // going few days back to make the first week complete

    const tableHeader = this.createTableHeader();
    table.appendChild(tableHeader);

    while (date.getMonth() <= month) {
      const row = this.createTableRow(date);
      table.appendChild(row);
    }

    this.tableContainer.innerHTML = '';
    this.tableContainer.appendChild(table);
  }

  createTableHeader() {
    // eslint-disable-next-line no-undef
    const header = document.createElement('tr');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      // eslint-disable-next-line no-undef
      const cell = document.createElement('th');
      cell.classList.add(this.CLASSES.DAY_NAME);
      cell.innerHTML = this.VOCABULARY.WEEKDAYS[i];

      header.appendChild(cell);
    }

    return header;
  }

  createTableRow(date) {
    // eslint-disable-next-line no-undef
    const row = document.createElement('tr');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      const cell = this.createTableCell(date);
      row.appendChild(cell);

      date.setDate(date.getDate() + 1);
    }

    return row;
  }

  createTableCell(date) {
    const cellValue = date.getDate();

    // eslint-disable-next-line no-undef
    const cell = document.createElement('td');
    cell.classList.add(this.CLASSES.CELL);

    // eslint-disable-next-line no-undef
    const circle = document.createElement('div');
    circle.innerHTML = cellValue;

    if (this.isDateBetween(date)) cell.classList.add(this.CLASSES.DATE_BETWEEN);

    if (date.getMonth() !== this.monthDisplayed.getMonth()) cell.classList.add(this.CLASSES.INACTIVE_DAY);

    if (this.isArrivalDate(date)) {
      circle.classList.add(this.CLASSES.PICKED_DATE);
      cell.classList.add(this.CLASSES.ARRIVAL_DATE);
      cell.appendChild(circle);
    } else if (this.isLeavingDate(date)) {
      circle.classList.add(this.CLASSES.PICKED_DATE);
      cell.classList.add(this.CLASSES.LEAVING_DATE);
      cell.appendChild(circle);
    } else if (this.isCurrentDate(date)) {
      circle.classList.add(this.CLASSES.CURRENT_DATE);
      cell.appendChild(circle);
    } else {
      cell.innerHTML = cellValue;
    }

    return cell;
  }

  // eslint-disable-next-line class-methods-use-this
  areDatesTheSame(date1, date2) {
    if (!date1) return false;
    if (!date2) return false;

    return date1.getFullYear() === date2.getFullYear()
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

  isDayActive(day) {
    return !day.classList.contains(this.CLASSES.INACTIVE_DAY);
  }
}

export default Calendar;
