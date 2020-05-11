import Component from "@frontend/component";
import DropdownModel from "./drop-down-model";
import DropdownView from "./drop-down-view";
import DropdownOption from "./__option/drop-down__option";
import DropdownOptionModel from "./__option/drop-down__option-model";

export default class Dropdown extends Component {

  constructor(root, parent) {
    super({root: root, parent: parent});

    this.setConsts();
    this.setInitialState();
    this.MODEL = new DropdownModel(this);
    this.VIEW = new DropdownView(this);
  }

  setState() {
    this.state = {
      optionValues: {
        value: []
      },
      optionWordForms: {
        value: []
      },
      expanded: {
        value: false,
      },
      displayType: {
        value: "total"
      },
      optionsSum: {
        value: 0,
      },
      wordForm: {}
    }
  }

  setConsts() {
    this.setDOM();
    this.setVocabulary();    
  }

  setClasses() {
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

  setDOM() {
    this.DOM = {
      FIELD: this.root.find(`.${this.CLASSES.FIELD}`),
      ICON: this.root.find(`.${this.CLASSES.ICON}`),
      INPUT: this.root.find(`.${this.CLASSES.INPUT}`),
      LIST: this.root.find(`.${this.CLASSES.LIST}`)
    }
  }

  setVocabulary() {
    let forms = this.DOM.INPUT.attr("forms") ? this.DOM.INPUT.attr("forms") : null;
    forms = forms ? forms.split(",") : null;

    this.VOCABULARY = {
      WORD_FORMS: forms,
      DEFAULT_VALUE: this.DOM.INPUT.val()
    }
  }

  setInitialState() {
    this.displayType = this.root.attr("display_type") ? this.root.attr("display_type") : "total";
  }

  setChildren() {
    this.children = [];
    let options = this.root.find(`.${this.CLASSES.OPTION}`);

    options.each( function(index, option) {
      this.children[index] = new DropdownOption($(option), this, index);
    }.bind(this));
  }

  clickHandler(event) {
    if (event.target.closest(`.${this.CLASSES.ICON}`) == this.DOM.ICON[0]) {
      this.expanded = !this.expanded;
    }
  }

}