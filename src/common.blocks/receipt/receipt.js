import Component from "@frontend/component";
import DateDropdown from "@blocks/date-dropdown/date-dropdown";
import Dropdown from "@blocks/drop-down/drop-down";

export default class Receipt extends Component {

  constructor(root, parent = {}) {
    super({root: root, parent: parent});
  }

  setClasses() {
    this.CLASSES = {
      DROPDOWN: "drop-down",
      DATE_DROPDOWN: "date-dropdown"
    }
  }

  setChildren() {
    this.children = [
      new DateDropdown(this.root.find(`.${this.CLASSES.DATE_DROPDOWN}`), this),
      new Dropdown(this.root.find(`.${this.CLASSES.DROPDOWN}`), this)
    ]
  }

}