import Component from '@frontend/Component';
import FilterDateDropdown from '@blocks/filter-date-dropdown/FilterDateDropdown';
import Dropdown from '@blocks/dropdown/Dropdown';
import RangeSlider from '@blocks/range-slider/RangeSlider';
import ExpandableCheckboxList from '@blocks/expandable-checkbox-list/ExpandableCheckboxList';

class Sidebar extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });
  }

  setChildren() {
    this.children = [
      new FilterDateDropdown(this.root.querySelector('.js-filter-date-dropdown'), this),
      new ExpandableCheckboxList(this.root.querySelector('.js-expandable-checkbox-list'), this),
      new RangeSlider(this.root.querySelector('.js-slider')),
    ];

    const dropdowns = this.initDropdown();
    this.children = this.children.concat(dropdowns);
  }

  initDropdown() {
    const dropdowns = [];

    this.root.querySelectorAll('.js-drop-down').forEach((element, index) => {
      dropdowns[index] = new Dropdown(element, this);
    });

    return dropdowns;
  }
}

export default Sidebar;
