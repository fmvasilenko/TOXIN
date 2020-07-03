import Component from '@frontend/component';

class ExpandableCheckboxList extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });

    this.CLASSES = require('./expandable-checkbox-list.classes');
    this.DOM = this.setDOM();

    this.setInitialState();
  }

  setState() {
    this.state = {
      expanded: {
        value: false,
        subscribers: [
          this.toggleList.bind(this),
        ],
      },
    };
  }

  setDOM() {
    return {
      FIELD: this.root.querySelector(`.${this.CLASSES.FIELD}`),
      TITLE: this.root.querySelector(`.${this.CLASSES.TITLE}`),
      ICON: this.root.querySelector(`.${this.CLASSES.ICON}`),
      LIST: this.root.querySelector(`.${this.CLASSES.LIST}`),
    };
  }

  setInitialState() {
    this.expanded = this.DOM.ICON.classList.contains(this.CLASSES.ICON_EXPANDED);
    this.toggleList();
  }

  clickHandler(event) {
    if (this.fieldClicked(event)) {
      this.expanded = !this.expanded;
    }
  }

  fieldClicked(event) {
    return event.target.closest(`.${this.CLASSES.FIELD}`) === this.DOM.FIELD;
  }

  toggleList() {
    if (this.expanded) this.expand();
    else this.shrink();
  }

  expand() {
    $(this.DOM.LIST).slideDown();
    this.DOM.ICON.classList.add(this.CLASSES.ICON_EXPANDED);
  }

  shrink() {
    $(this.DOM.LIST).slideUp();
    this.DOM.ICON.classList.remove(this.CLASSES.ICON_EXPANDED);
  }
}

export default ExpandableCheckboxList;
