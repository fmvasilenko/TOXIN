import Component from "@frontend/component";
import DropdownOptionView from "./drop-down__option-view";
import DropdownOptionModel from "./drop-down__option-model";

export default class DropdownOption extends Component {

  constructor(root, parent, index) {
    super({root: root, parent: parent});

    this.INDEX = index;
    this.setDOM();
    this.setVocabulary();
    this.setInitialState();
    this.MODEL = new DropdownOptionModel(this);
    this.VIEW = new DropdownOptionView(this);
  }

  setState() {
    this.state = {
      optionValues: {
        value: [],
        isGlobal: true
      },
      optionWordForms: {
        value: [],
        isGlobal: true
      },
      value: {
        value: 0,
        subscribers: [
          
        ]
      },
      decreaseButtonDisabled: {
        value: false,
        subscribers: [
          
        ]
      }
    }
  }

  setClasses() {
    this.CLASSES = {
      INPUT: "drop-down__input",
      DECREASE_BUTTON: "js-drop-down__button_decrease",
      INCREASE_BUTTON: "js-drop-down__button_increase"
    }
  }

  setDOM() {
    this.DOM = {
      INPUT: this.root.find(`.${this.CLASSES.INPUT}`),
      DECREASE_BUTTON: this.root.find(`.${this.CLASSES.DECREASE_BUTTON}`),
      INCREASE_BUTTON: this.root.find(`.${this.CLASSES.INCREASE_BUTTON}`)
    }
  }

  setVocabulary() {
    let forms = this.DOM.INPUT.attr("forms");
    forms = forms ? forms.split(",") : null;

    this.VOCABULARY = {
      WORD_FORMS: forms
    }
  }

  setInitialState() {
    this.value = this.DOM.INPUT.val() ? parseInt(this.DOM.INPUT.val()) : 0;
  }

  clickHandler(event) {
    if (event.target.closest(`.${this.CLASSES.INCREASE_BUTTON}`) == this.DOM.INCREASE_BUTTON[0]){
      this.value++;
    }
    else if (event.target.closest(`.${this.CLASSES.DECREASE_BUTTON}`) == this.DOM.DECREASE_BUTTON[0]){
      if (this.value > 0) this.value--;
    }
  }

}