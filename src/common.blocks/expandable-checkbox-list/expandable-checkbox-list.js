import Component from "@frontend/component";

export default class ExpandableCheckboxList extends Component {

  constructor(root, parent = {}) {
    super({root: root, parent: parent});

    this.setDOM();
    this.setInitialState();
  }

  setState() {
    this.state = {
      expanded: {
        value: false,
        subscribers: [
          this.toggleList.bind(this)
        ]
      }
    }
  }

  setClasses() {
    this.CLASSES = {
      FIELD: "expandable-checkbox-list__field",
      TITLE: "expandable-checkbox-list__title",
      ICON: "expandable-checkbox-list__icon",
      ICON_EXPANDED: "expandable-checkbox-list__icon_expanded",
      LIST: "expandable-checkbox-list__list"
    }
  }

  setDOM() {
    this.DOM = {
      FIELD: this.root.find(`.${this.CLASSES.FIELD}`),
      TITLE: this.root.find(`.${this.CLASSES.TITLE}`),
      ICON: this.root.find(`.${this.CLASSES.ICON}`),
      LIST: this.root.find(`.${this.CLASSES.LIST}`)
    }
  }

  setInitialState() {
    this.expanded = this.DOM.ICON.hasClass(this.CLASSES.ICON_EXPANDED);
    this.toggleList();
  }

  clickHandler(event) {
    if (this.fieldClicked(event)) {
      this.expanded = !this.expanded;
    }
  }

  fieldClicked(event) {
    return event.target.closest(`.${this.CLASSES.FIELD}`) == this.DOM.FIELD[0];
  }

  toggleList() {
    if (this.expanded)
      this.expand();
    else
      this.shrink();
  }

  expand() {
    this.DOM.LIST.slideDown();
    this.DOM.ICON.addClass(this.CLASSES.ICON_EXPANDED);
  }

  shrink() {
    this.DOM.LIST.slideUp();
    this.DOM.ICON.removeClass(this.CLASSES.ICON_EXPANDED);
  }

}