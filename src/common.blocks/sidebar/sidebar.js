import Component from "@frontend/component";
import FilterDateDropdown from "@blocks/filter-date-dropdown/filter-date-dropdown";
import Dropdown from "@blocks/drop-down/drop-down";
import ExpandableCheckboxList from "@blocks/expandable-checkbox-list/expandable-checkbox-list";

export default class Sidebar extends Component {

  constructor(root, parent = {}) {
    super({root: root, parent: parent});
  }

  setChildren() {
    this.children = [
      new FilterDateDropdown(this.root.find(".filter-date-dropdown"), this),
      new ExpandableCheckboxList(this.root.find(".expandable-checkbox-list"), this)
    ]

    let dropdowns = this.initDropdown();
    this.children = this.children.concat(dropdowns);
  }

  initDropdown() {
    let dropdowns = []; 

    $('.drop-down').each( function(index, element) {
      dropdowns[index] = new Dropdown($(element), this);
    });

    return dropdowns;
  }

}