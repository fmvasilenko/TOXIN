class CalendarDOM {
  constructor() {
    this.DOM = this.createDOM();
  }

  createDOM() {
    const calendar = this.DOMCreator.createElement({
      tag: 'div',
      elementClass: this.classes.calendar,
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
            list: DOM,
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
            list: DOM,
          },
        ],
      },
    });

    return calendar;
  }
}

export default CalendarDOM;
