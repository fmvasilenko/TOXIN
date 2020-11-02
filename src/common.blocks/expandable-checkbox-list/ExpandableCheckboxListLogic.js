class ExpandableCheckboxListLogic {
  constructor(container) {
    this.classes = require('./expandable-checkbox-list.classes.json');
    this.container = container;
    this.DOM = this._findDOMNodes();
    this.state = this._getInitialState();
    this.listExpandedExternalSubscriber = () => {};
    this._bindEventListeners();
    this._render();
  }

  getListExpanded() {
    return this.state.listExpanded;
  }

  setListExpanded(value) {
    this.state.listExpanded = value;
    this.listExpandedExternalSubscriber(this.state.listExpanded);
    this._render();
  }

  setListExpandedSubscriber(subscriber) {
    this.listExpandedExternalSubscriber = subscriber;
  }

  _findDOMNodes() {
    return {
      field: this.container.querySelector(`.js-${this.classes.field}`),
      icon: this.container.querySelector(`.js-${this.classes.icon}`),
      list: this.container.querySelector(`.js-${this.classes.list}`),
    };
  }

  _getInitialState() {
    return {
      listExpanded: this.DOM.icon.classList.contains(this.classes.iconExpanded),
    };
  }

  _bindEventListeners() {
    this.DOM.field.addEventListener('click', this._clickHandler.bind(this));
  }

  _clickHandler() {
    this.state.listExpanded = !this.state.listExpanded;
    this.listExpandedExternalSubscriber(this.state.listExpanded);
    this._render();
  }

  _render() {
    if (this.state.listExpanded) {
      $(this.DOM.list).slideDown();
      this.DOM.icon.classList.add(this.classes.iconExpanded);
    } else {
      $(this.DOM.list).slideUp();
      this.DOM.icon.classList.remove(this.classes.iconExpanded);
    }
  }
}

export default ExpandableCheckboxListLogic;
