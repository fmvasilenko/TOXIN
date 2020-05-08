import Component from "@frontend/component";
import DropdownOption from "./drop-down__option";

export default class Dropdown extends Component {

  constructor(rootElement, parent = {}) {
    super(parent);

    this.root = rootElement;
    this.setConsts();
    this.setInitialState();
    this.setChildren();
    this.bindEventListeners();
  }

  setState() {
    this.state = {
      optionValues: {
        value: [],
        subscribers: [
          this.calcSum.bind(this),
          this.display.bind(this)
        ]
      },
      optionWordForms: {
        value: []
      },
      expanded: {
        value: false,
        subscribers: [
          this.toggleList.bind(this),
          this.changeFieldStyle.bind(this)
        ]
      },
      displayType: {
        value: "total"
      },
      optionsSum: {
        value: 0,
        subscribers: [
          this.changeWordForm.bind(this)
        ]
      }
    }
  }

  setConsts() {
    this.CLASSES = {
      OPTION: "drop-down__option",
      FIELD: "drop-down__field",
      FIELD_DROPPED: "drop-down__field_drop",
      ICON: "drop-down__expand-more",
      INPUT: "drop-down__field-input",
      LIST: "drop-down__list",
      LIST_DROPPPED: "drop-down__list_drop"
    }
  }

  setChildren() {
    this.children = [];
    let options = this.root.find(`.${this.CLASSES.OPTION}`);

    options.each( function(index, option) {
      this.children[index] = new DropdownOption($(option), this, index);
    }.bind(this));
  }

  setInitialState() {
    this.field = this.root.find(`.${this.CLASSES.FIELD}`);
    this.icon = this.root.find(`.${this.CLASSES.ICON}`);
    this.input = this.root.find(`.${this.CLASSES.INPUT}`);
    this.list = this.root.find(`.${this.CLASSES.LIST}`);

    this.displayType = this.root.attr("display_type") ? this.root.attr("display_type") : "total";
    this.forms = this.input.attr("forms") ? this.input.attr("forms") : null;
    this.forms = this.forms ? this.forms.split(",") : null;
    this.defaultInputValue = this.input.val();
  }

  bindEventListeners() {
    this.icon.click(this.iconClickHandler.bind(this));
  }

  iconClickHandler() {
    this.expanded = !this.expanded;
  }

  display() {
    switch (this.displayType) {
      case "total": {
        this.displayTotal();
        break;
      }
      case "values": {
        this.displayValues();
        break;
      }
    }
  }

  displayTotal() {
    if (this.optionsSum) this.input.val(`${this.optionsSum} ${this.form}`);
    else this.input.val(this.defaultInputValue);
  }

  displayValues() {
    let str = "";

    this.optionValues.forEach( function(value, index) {
      if (value > 0) {
        str += str !== "" ? ", " : "";
        str += `${value} ${this.optionWordForms[index]}`;
      }
    }.bind(this));

    this.input.val(str);
  }

  calcSum() {
    if (this.optionValues.length)
      this.optionsSum = this.optionValues.reduce((sum, value) => sum + value);
    else this.optionsSum = 0;
  }

  toggleList() {
    if (this.expanded) {
      this.list.addClass(this.CLASSES.LIST_DROPPPED);
    }
    else {
      this.list.removeClass(this.CLASSES.LIST_DROPPPED);
    }
  }

  changeFieldStyle() {
    if (this.expanded) {
      this.field.addClass(this.CLASSES.FIELD_DROPPED);
    }
    else {
      this.field.removeClass(this.CLASSES.FIELD_DROPPED);
    }
  }

  changeWordForm() {
    if (!this.forms) {
      this.form = null;
      return false;
    }

    let n = this.optionsSum;
    n %= 100;

    if(n < 10 || n > 20) {
      n %= 10;

      if(n == 1) this.form = this.forms[0];
      else if (n > 1 && n < 5) this.form = this.forms[1];
      else this.form = this.forms[2];
    }
    else this.form = this.forms[2];

    return true;
  }
}