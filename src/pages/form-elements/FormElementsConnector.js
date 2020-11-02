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
    this.DOM = this._findDOMNodes(container);

    this.guestsDropdown = new Dropdown(this.DOM.guestsDropdown);
    this.dateDropdown = new DateDropdown(this.DOM.dateDropdown);
    this.filterDateDropdown = new FilterDateDropdown(this.DOM.filterDateDropdown);
    this.likeButtons = this._getLikeButtons();
    this.rateButtons = this._getRateButtons();
    this.rangeSlider = new RangeSlider(this.DOM.rangeSlider);
    this.dropdownDefault = new Dropdown(this.DOM.dropdownDefault);
    this.dropdownExpanded = new Dropdown(this.DOM.dropdownExpanded);
    this.dropdown4 = new Dropdown(this.DOM.dropdown4);
    this.dropdown5 = new Dropdown(this.DOM.dropdown5);
    this.expandableCheckboxList = new ExpandableCheckboxList(this.DOM.expandableCheckboxList);
    this.expandableCheckboxListExpanded = new ExpandableCheckboxList(this.DOM.expandableCheckboxListExpanded);
    this.feedback = new Feedback(this.DOM.feedback);
  }

  _findDOMNodes(container) {
    return {
      guestsDropdown: container.querySelector(`.js-${this.classes.guestsDropdown}`),
      dateDropdown: container.querySelector(`.js-${this.classes.dateDropdown}`),
      filterDateDropdown: container.querySelector(`.js-${this.classes.filterDateDropdown}`),
      likeButtons: container.querySelectorAll(`.js-${this.classes.likeButton}`),
      rateButtons: container.querySelectorAll(`.js-${this.classes.rateButton}`),
      rangeSlider: container.querySelector(`.js-${this.classes.rangeSlider}`),
      dropdownDefault: container.querySelector(`.js-${this.classes.dropdownDefault}`),
      dropdownExpanded: container.querySelector(`.js-${this.classes.dropdownExpanded}`),
      dropdown4: container.querySelector(`.js-${this.classes.dropdown4}`),
      dropdown5: container.querySelector(`.js-${this.classes.dropdown5}`),
      expandableCheckboxList: container.querySelector(`.js-${this.classes.expandableCheckboxList}`),
      expandableCheckboxListExpanded: container.querySelector(`.js-${this.classes.expandableCheckboxListExpanded}`),
      feedback: container.querySelector(`.js-${this.classes.feedback}`),
    };
  }

  _getLikeButtons() {
    const likeButtons = [];

    this.DOM.likeButtons.forEach((likeButtonContainer) => {
      likeButtons.push(new LikeButton(likeButtonContainer));
    });

    return likeButtons;
  }

  _getRateButtons() {
    const rateButtons = [];

    this.DOM.rateButtons.forEach((rateButtonContainer) => {
      rateButtons.push(new RateButton(rateButtonContainer));
    });

    return rateButtons;
  }
}

export default FormElementsConnector;
