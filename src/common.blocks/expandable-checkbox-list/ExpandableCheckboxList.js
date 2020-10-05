class ExpandableCheckboxList {
  constructor(container) {
    this.classes = require('./expandable-checkbox-list.classes.json');
    this.container = container;
    this.DOM = this.findDOMNodes();
    this.state = this.getInitialState();
    this.bindEventListeners();
    this.render();
  }

  findDOMNodes() {
    return {
      field: this.container.querySelector(`.${this.classes.field}`),
      icon: this.container.querySelector(`.${this.classes.icon}`),
      list: this.container.querySelector(`.${this.classes.list}`),
    };
  }

  getInitialState() {
    return {
      listExpanded: this.DOM.icon.classList.contains(this.classes.icon_expanded),
    };
  }

  bindEventListeners() {
    this.DOM.field.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler() {
    this.state.listExpanded = !this.state.listExpanded;
    this.render();
  }

  render() {
    if (this.state.listExpanded) {
      $(this.DOM.list).slideDown();
      this.DOM.icon.classList.add(this.classes.icon_expanded);
    } else {
      $(this.DOM.list).slideUp();
      this.DOM.icon.classList.remove(this.classes.icon_expanded);
    }
  }
}

export default ExpandableCheckboxList;
