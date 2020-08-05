import 'jquery';
import '../../scss/main.scss';

import Component from '@frontend/Component';
import RateButton from '@blocks/rate-button/RateButton';
import LikeButton from '@blocks/like-button/LikeButton';
import DateDropdown from '@blocks/date-dropdown/DateDropdown';
import FilterDateDropdown from '@blocks/filter-date-dropdown/FilterDateDropdown';
import Dropdown from '@blocks/dropdown/Dropdown';
import ExpandableCheckboxList from '@blocks/expandable-checkbox-list/ExpandableCheckboxList';
import Slider from '@blocks/slider/Slider';

class FormElements extends Component {
  constructor() {
    // eslint-disable-next-line no-undef
    super({ root: document, parent: null });
  }

  setChildren() {
    this.children = [];
    const likeButtons = this.initLikeButtons();
    const rateButtons = this.initRateButtons();
    const dropDowns = this.initDropdown();
    const dateDropdowns = this.initDateDropdown();
    const filterDateDropdowns = this.initFilterDateDropdown();
    const expandableCheckboxLists = this.initExpandableCheckboxList();
    const sliders = this.initSlider();

    this.children = this.children.concat(likeButtons);
    this.children = this.children.concat(rateButtons);
    this.children = this.children.concat(dropDowns);
    this.children = this.children.concat(dateDropdowns);
    this.children = this.children.concat(filterDateDropdowns);
    this.children = this.children.concat(expandableCheckboxLists);
    this.children = this.children.concat(sliders);
  }

  initRateButtons() {
    const rateButtons = [];

    this.root.querySelectorAll('.js-rate-button').forEach((element, index) => {
      rateButtons[index] = new RateButton(element, this);
    });

    return rateButtons;
  }

  initLikeButtons() {
    const likeButtons = [];

    this.root.querySelectorAll('.js-like-button').forEach((element) => {
      likeButtons.push(new LikeButton(element, this));
    });

    return likeButtons;
  }

  initDateDropdown() {
    const dateDropdowns = [];

    this.root.querySelectorAll('.js-date-dropdown').forEach((element, index) => {
      dateDropdowns[index] = new DateDropdown(element, this);
    });

    return dateDropdowns;
  }

  initFilterDateDropdown() {
    const filterDateDropdowns = [];

    this.root.querySelectorAll('.js-filter-date-dropdown').forEach((element, index) => {
      filterDateDropdowns[index] = new FilterDateDropdown(element, this);
    });

    return filterDateDropdowns;
  }

  initDropdown() {
    const dropdowns = [];

    this.root.querySelectorAll('.js-drop-down').forEach((element, index) => {
      dropdowns[index] = new Dropdown(element, this);
    });

    return dropdowns;
  }

  initExpandableCheckboxList() {
    const ExpandableCheckboxLists = [];

    this.root.querySelectorAll('.js-expandable-checkbox-list').forEach((element, index) => {
      ExpandableCheckboxLists[index] = new ExpandableCheckboxList(element, this);
    });

    return ExpandableCheckboxLists;
  }

  // eslint-disable-next-line class-methods-use-this
  initSlider() {
    const sliders = [];

    this.root.querySelectorAll('.js-slider').forEach((element, index) => {
      sliders[index] = new Slider(element, this);
    });

    return sliders;
  }
}

// eslint-disable-next-line no-unused-vars
const formElements = new FormElements();
