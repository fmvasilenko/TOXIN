import Component from '@frontend/component';
import FilterDateDropdown from '@blocks/filter-date-dropdown/filter-date-dropdown';
import Dropdown from '@blocks/dropdown/dropdown';
import ExpandableCheckboxList from '@blocks/expandable-checkbox-list/expandable-checkbox-list';

class Sidebar extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });
  }

  setChildren() {
    this.children = [
      new FilterDateDropdown(this.root.querySelector('.js-filter-date-dropdown'), this),
      new ExpandableCheckboxList(this.root.querySelector('.js-expandable-checkbox-list'), this),
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
