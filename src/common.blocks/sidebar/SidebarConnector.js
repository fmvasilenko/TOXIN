import FilterDateDropdown from '@blocks/filter-date-dropdown/FilterDateDropdown';
import Dropdown from '@blocks/dropdown/Dropdown';
import RangeSlider from '@blocks/range-slider/RangeSlider';
import ExpandableCheckboxList from '@blocks/expandable-checkbox-list/ExpandableCheckboxList';

class SidebarConnector {
  constructor(container) {
    this.classes = require('./sidebar.classes.json');
    this.DOM = this.findDOMNodes(container);
    this.filterDateDropdown = new FilterDateDropdown(this.DOM.filterDateDropdown);
    this.guestsDropdown = new Dropdown(this.DOM.guestsDropdown);
    this.rangeSlider = new RangeSlider(this.DOM.rangeSlider);
    this.amenitiesDropdown = new Dropdown(this.DOM.amenitiesDropdown);
    this.convinience = new ExpandableCheckboxList(this.DOM.convinience);
  }

  findDOMNodes(container) {
    return {
      filterDateDropdown: container.querySelector(`.${this.classes.filterDateDropdown}`),
      guestsDropdown: container.querySelector(`.${this.classes.guestsDropdown}`),
      rangeSlider: container.querySelector(`.${this.classes.rangeSlider}`),
      amenitiesDropdown: container.querySelector(`.${this.classes.amenitiesDropdown}`),
      convinience: container.querySelector(`.${this.classes.convinience}`),
    };
  }
}

export default SidebarConnector;
