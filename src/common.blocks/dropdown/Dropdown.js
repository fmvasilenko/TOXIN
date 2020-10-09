import DropdownLogic from './DropdownLogic';

class Dropdown {
  constructor(container) {
    const dropdown = new DropdownLogic(container);

    this.getTotalNumber = () => dropdown.getTotalNumber();

    this.setTotalNumberSubscriber = (subscriber) => dropdown.setTotalNumberSubscriber(subscriber);
  }
}

export default Dropdown;
