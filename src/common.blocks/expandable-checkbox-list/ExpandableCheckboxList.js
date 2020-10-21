import ExpandableCheckboxListLogic from './ExpandableCheckboxListLogic';

class ExpandableCheckboxList {
  constructor(container) {
    const expandableCheckboxList = new ExpandableCheckboxListLogic(container);

    this.getListExpanded = () => expandableCheckboxList.getListExpanded();

    this.setListExpanded = (value) => expandableCheckboxList.setListExpanded(value);

    this.setListExpandedSubscriber = (subscriber) => expandableCheckboxList.setListExpandedSubscriber(subscriber);
  }
}

export default ExpandableCheckboxList;
