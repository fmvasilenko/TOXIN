import DOMCreator from '../../js/frontend/DOMCreator';

/* eslint-disable class-methods-use-this */
class CalendarDisplay {
  constructor(data, container) {
    this.data = data;
    this.container = container;

    this.classes = require('./calendar.classes.json');
    this.config = require('./calendar.config.json');

    this.DOMCreator = new DOMCreator();
    this.DOM = {};
    this.calendar = this.createDOM();
    this.container.appendChild(this.calendar);
    // this.addSubscribers();
    console.log(this);
  }

  addSubscribers() {
    this.data.arrivalDate.addSubscriber(this.arrivalDateController.bind(this));
    this.data.leavingDate.addSubscriber(this.leavingDateController.bind(this));
  }

  createDOM() {
    const DOM = this.DOMCreator.createElement({
      tag: 'div',
      elementClass: this.classes.calendar,
      name: 'calendar',
      list: this.DOM,
      innerHTML: {
        tag: 'div',
        elementClass: this.classes.header,
        innerHTML: [
          {
            tag: 'i',
            elementClass: [
              this.classes.materialIcons,
              this.classes.leftArrow,
            ],
            innerHTML: this.config.vocabulary.leftArrow,
            name: 'leftArrow',
            list: this.DOM,
          },
          {
            tag: 'h2',
            elementClass: this.classes.title,
            innerHTML: 'title',
          },
          {
            tag: 'i',
            elementClass: [
              this.classes.materialIcons,
              this.classes.rightArrow,
            ],
            innerHTML: this.config.vocabulary.rightArrow,
            name: 'rightArrow',
            list: this.DOM,
          },
        ],
      },
    });

    return DOM;
  }

  arrivalDateController(value) {
    this.render(value, this.data.leavingDate.get());
  }

  leavingDateController(value) {
    this.render(this.data.arrivalDate.get(), value);
  }

  render(arrivalDate, leavingDate) {
    console.log(arrivalDate);
    console.log(leavingDate);
  }
}

export default CalendarDisplay;
