import 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui-touch-punch';
import 'jquery-ui/themes/base/slider.css';
import '../../scss/main.scss';

import Component from '@frontend/component';
import RateButton from '@blocks/rate-button/rate-button';
import LikeButton from '@blocks/like-button/like-button';
import DateDropdown from '@blocks/date-dropdown/date-dropdown';
import FilterDateDropdown from '@blocks/filter-date-dropdown/filter-date-dropdown';
import Dropdown from '@blocks/dropdown/dropdown';
import ExpandableCheckboxList from '@blocks/expandable-checkbox-list/expandable-checkbox-list';
import Slider from '@blocks/slider/slider';

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
