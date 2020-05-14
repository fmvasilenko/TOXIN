import 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui-touch-punch';
import 'jquery-ui/themes/base/slider.css';
import '../../scss/main.scss';

import Component from "@frontend/component";
import RateButton from "@blocks/rate-button/rate-button";
import LikeButton from "@blocks/like-button/like-button";
import DateDropdown from "@blocks/date-dropdown/date-dropdown";
import FilterDateDropdown from "@blocks/filter-date-dropdown/filter-date-dropdown";
import Dropdown from "@blocks/drop-down/drop-down";
import ExpandableCheckboxList from "@blocks/expandable-checkbox-list/expandable-checkbox-list";
import Slider from "@blocks/slider/slider";

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
    let expandableCheckboxLists = this.initExpandableCheckboxList();
    let sliders = this.initSlider();

    this.children = this.children.concat(likeButtons);
    this.children = this.children.concat(rateButtons);
    this.children = this.children.concat(dropDowns);
    this.children = this.children.concat(dateDropdowns);
    this.children = this.children.concat(filterDateDropdowns);
    this.children = this.children.concat(expandableCheckboxLists);
    this.children = this.children.concat(sliders);
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

  initExpandableCheckboxList() {
    let ExpandableCheckboxLists = []; 

    $('.expandable-checkbox-list').each( function(index, element) {
      ExpandableCheckboxLists[index] = new ExpandableCheckboxList($(element), this);
    });

    return ExpandableCheckboxLists;
  }

  initSlider() {
    let sliders = []; 

    $('.slider').each( function(index, element) {
      sliders[index] = new Slider($(element), this);
    });

    return sliders;
  }

}

let formElements = new FormElements();
console.log(formElements);