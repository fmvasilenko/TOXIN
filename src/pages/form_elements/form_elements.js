import 'jquery';
import 'jquery-ui';
import 'jquery-ui-touch-punch';
import '../../scss/main.scss';

import Component from "@frontend/component";
import RateButton from "@blocks/rate-button/rate-button";
import LikeButton from "@blocks/like-button/like-button";
import DateDropdown from "@blocks/date-dropdown/date-dropdown";
import FilterDateDropdown from "@blocks/filter-date-dropdown/filter-date-dropdown";
import Dropdown from "@blocks/drop-down/drop-down";

class FormElements extends Component {

  constructor() {
    super({root: $(document), parent: null});
  }

  setChildren() {
    this.children = [];
    let likeButtons = this.initLikeButtons();
    let rateButtons = this.initRateButtons();
    let dropDowns = this.initDropdown();
    let dateDropdowns = this.initDateDropdown();
    let filterDateDropdowns = this.initFilterDateDropdown();

    this.children = this.children.concat(likeButtons);
    this.children = this.children.concat(rateButtons);
    this.children = this.children.concat(dropDowns);
    this.children = this.children.concat(dateDropdowns);
    this.children = this.children.concat(filterDateDropdowns);
  }

  initRateButtons() {
    let rateButtons = []; 

    $('.rate-button').each( function(index, element) {
      rateButtons[index] = new RateButton($(element), this);
    }.bind(this));

    return rateButtons;
  }

  initLikeButtons() {
    let likeButtons = []; 

    $('.like-button').each( function(index, element) {
      likeButtons[index] = new LikeButton($(element), this);
    }.bind(this));

    return likeButtons;
  }

  initDateDropdown() {
    let dateDropdowns = []; 

    $('.date-dropdown').each( function(index, element) {
      dateDropdowns[index] = new DateDropdown($(element), this);
    });

    return dateDropdowns;
  }

  initFilterDateDropdown() {
    let filterDateDropdowns = []; 

    $('.filter-date-dropdown').each( function(index, element) {
      filterDateDropdowns[index] = new FilterDateDropdown($(element), this);
    });

    return filterDateDropdowns;
  }

  initDropdown() {
    let dropdowns = []; 

    $('.drop-down').each( function(index, element) {
      dropdowns[index] = new Dropdown($(element), this);
    });

    return dropdowns;
  }

}

let formElements = new FormElements();
console.log(formElements);