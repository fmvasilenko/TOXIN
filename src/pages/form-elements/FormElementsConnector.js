import Dropdown from '@blocks/dropdown/Dropdown';
import DateDropdown from '@blocks/date-dropdown/DateDropdown';
import FilterDateDropdown from '@blocks/filter-date-dropdown/FilterDateDropdown';
import LikeButton from '@blocks/like-button/LikeButton';
import RateButton from '@blocks/rate-button/RateButton';
import RangeSlider from '@blocks/range-slider/RangeSlider';
import ExpandableCheckboxList from '@blocks/expandable-checkbox-list/ExpandableCheckboxList';
import Feedback from '@blocks/feedback/Feedback';

class FormElementsConnector {
  constructor(container) {
    this.classes = require('./form-elements.classes.json');
    this.DOM = this.findDOMNodes(container);

    this.guestsDropdown = new Dropdown(this.DOM.guestsDropdown);
    this.dateDropdown = new DateDropdown(this.DOM.dateDropdown);
    this.filterDateDropdown = new FilterDateDropdown(this.DOM.filterDateDropdown);
    this.likeButtons = this.getLikeButtons();
    this.rateButtons = this.getRateButtons();
    this.rangeSlider = new RangeSlider(this.DOM.rangeSlider);
    this.dropdownDefault = new Dropdown(this.DOM.dropdownDefault);
    this.dropdownExpanded = new Dropdown(this.DOM.dropdownExpanded);
    this.dropdown4 = new Dropdown(this.DOM.dropdown4);
    this.dropdown5 = new Dropdown(this.DOM.dropdown5);
    this.expandableCheckboxList = new ExpandableCheckboxList(this.DOM.expandableCheckboxList);
    this.expandableCheckboxListExpanded = new ExpandableCheckboxList(this.DOM.expandableCheckboxListExpanded);
    this.feedback = new Feedback(this.DOM.feedback);
  }

  findDOMNodes(container) {
    return {
      guestsDropdown: container.querySelector(`.${this.classes.guestsDropdown}`),
      dateDropdown: container.querySelector(`.${this.classes.dateDropdown}`),
      filterDateDropdown: container.querySelector(`.${this.classes.filterDateDropdown}`),
      likeButtons: container.querySelectorAll(`.${this.classes.likeButton}`),
      rateButtons: container.querySelectorAll(`.${this.classes.rateButton}`),
      rangeSlider: container.querySelector(`.${this.classes.rangeSlider}`),
      dropdownDefault: container.querySelector(`.${this.classes.dropdownDefault}`),
      dropdownExpanded: container.querySelector(`.${this.classes.dropdownExpanded}`),
      dropdown4: container.querySelector(`.${this.classes.dropdown4}`),
      dropdown5: container.querySelector(`.${this.classes.dropdown5}`),
      expandableCheckboxList: container.querySelector(`.${this.classes.expandableCheckboxList}`),
      expandableCheckboxListExpanded: container.querySelector(`.${this.classes.expandableCheckboxListExpanded}`),
      feedback: container.querySelector(`.${this.classes.feedback}`),
    };
  }

  getLikeButtons() {
    const likeButtons = [];

    this.DOM.likeButtons.forEach((likeButtonContainer) => {
      likeButtons.push(new LikeButton(likeButtonContainer));
    });

    return likeButtons;
  }

  getRateButtons() {
    const rateButtons = [];

    this.DOM.rateButtons.forEach((rateButtonContainer) => {
      rateButtons.push(new RateButton(rateButtonContainer));
    });

    return rateButtons;
  }
}

export default FormElementsConnector;
