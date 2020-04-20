class DropDown {

  constructor(dropDown) {
    this.dropDown = dropDown;
    
    this.setEnvironment();
    this.setOptionsEnvironment();

    this.bindEventListeners();
  }

  setEnvironment() {
    this.POPUP_EXPANDED_CLASS = 'drop-down__list_drop';
    this.FIELD_EXPANDED_CLASS = 'drop-down__field_drop';

    this.expandMoreButton = this.dropDown.find('.drop-down__expand-more');
    this.popup = this.dropDown.find('.drop-down__list');
    this.field = this.dropDown.find('.drop-down__field');
    this.fieldInput = this.dropDown.find('.drop-down__field-input');
    this.clearButton = this.dropDown.find('.js-drop-down__clear-button');
    this.fieldDefaultValue = this.fieldInput.val();
    this.expanded = this.popup.hasClass(this.POPUP_EXPANDED_CLASS);
  }

  setOptionsEnvironment() {
    let dropDownOptions = [];

    this.dropDown.find('.drop-down__option').each( function(index, element) {
      dropDownOptions[index] = {};
      dropDownOptions[index].input = $(element).find('.drop-down__input');
      dropDownOptions[index].value = dropDownOptions[index].input.val();
      dropDownOptions[index].increaseButton = $(element).find('.js-drop-down__button_increase');
      dropDownOptions[index].decreaseButton = $(element).find('.js-drop-down__button_decrease');
    });

    this.dropDownOptions = dropDownOptions;
  }

  bindEventListeners() {
    this.expandMoreButton.click(this.toggleList.bind(this));

    this.dropDown.find('.drop-down__option').each( function(index, element) {

      this.dropDownOptions[index].increaseButton.click( function() {
        this.increase(index);
        this.display();
      }.bind(this));

      this.dropDownOptions[index].decreaseButton.click( function() {
        this.decrease(index);
        this.display();
      }.bind(this));

    }.bind(this));

    this.clearButton.click(this.handlerClearButton.bind(this));
  }

  toggleList() {
    if (this.expanded)
      this.shrink();
    else
      this.expand();
  }

  expand() {
    this.popup.addClass(this.POPUP_EXPANDED_CLASS);
    this.field.addClass(this.FIELD_EXPANDED_CLASS);
    this.expanded = true;
  }

  shrink() {
    this.popup.removeClass(this.POPUP_EXPANDED_CLASS);
    this.field.removeClass(this.FIELD_EXPANDED_CLASS);
    this.expanded = false;
  }

  increase(index) {
    if( this.dropDownOptions[index].value == 0 ) {
      this.dropDownOptions[index].decreaseButton.prop("disabled", false);
    }

    this.dropDownOptions[index].value++;
    this.dropDownOptions[index].input.val(this.dropDownOptions[index].value);
  }

  decrease(index) {
    if( this.dropDownOptions[index].value > 0 ) {
      this.dropDownOptions[index].value--;
      this.dropDownOptions[index].input.val(this.dropDownOptions[index].value);
    }

    if( this.dropDownOptions[index].value == 0 ) {
      this.dropDownOptions[index].decreaseButton.prop("disabled", true);
    }
  }

  num2str(n, forms) {
    n %= 100;

    if(n < 10 || n > 20) {
      n %= 10;

      if(n == 1) return forms[0];
      else if (n > 1 && n < 5) return forms[1];
      else return forms[2];
    }
    else return forms[2];
  } 

  handlerClearButton() {
    this.dropDownOptions.forEach(function(item) {
      item.value = 0;
      item.input.val(0);
    }.bind(this));

    this.display();
  }

  display() {}

}

class DropDownDisplayTotal extends DropDown {

  constructor(dropDown) {
    super(dropDown);
    
    this.setFieldForms();

    this.display();
  }

  setFieldForms() {
    let forms = this.fieldInput.attr('forms');

    if(forms) this.fieldForms = forms.split(',');
    else {
      forms = [];
      forms[0] = forms[1] = forms[2] =this.fieldInput.val();
      this.fieldForms = forms;
    }
  }

  display() {
    let number = 0;

    this.dropDownOptions.forEach(function(item) {
      number += parseInt(item.value);
    }.bind(this));

    if(number){
      let str = number + ' ' + this.num2str(number, this.fieldForms);
      this.fieldInput.val(str);
    }
    else {
      this.fieldInput.val(this.fieldDefaultValue);
    }
  }

}

class DropDownDisplayValues extends DropDown {

  constructor(dropDown) {
    super(dropDown);
    
    this.setFieldForms();

    this.display();
  }

  setFieldForms() {
    this.dropDownOptions.forEach(function(item) {
      let forms = item.input.attr('forms');

      if(forms) item.forms = forms.split(',');
      else {
        forms = [];
        forms[0] = forms[1] = forms[2] = item.input.val();
        item.forms = forms;
      }
    });
  }

  display() {
    let str = '';

    this.dropDownOptions.forEach(function(item) {
      if(item.value != '0') {
        if(str) str += ', ';
        str += item.value + ' ' + this.num2str(item.value, item.forms);
      }
    }.bind(this));

    if(str) this.fieldInput.val(str);
    else this.fieldInput.val(this.fieldDefaultValue);
  }

}

let dropDowns = []; 

$('.drop-down').each( function(index, element) {
  dropDowns[index] = new DropDownDisplayValues($(element));
});