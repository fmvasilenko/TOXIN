class ExpandableCheckboxList {

  constructor(checkboxList){
    this.ICON_EXPANDED_CLASS = 'expandable-checkbox-list__expand-more_expanded';

    this.checkboxList = checkboxList;
    this.ExpandMoreButton = this.checkboxList.find('.expandable-checkbox-list__title');
    this.expandMoreIcon = this.checkboxList.find('.expandable-checkbox-list__expand-more');
    this.popup = this.checkboxList.find('.expandable-checkbox-list__list');
    this.expanded = this.expandMoreIcon.hasClass(this.ICON_EXPANDED_CLASS);

    this.setInitialState();
    this.bindEventListeners();
  }

  setInitialState() {
    if(this.expanded){
      this.expand();
    }
    else {
      this.shrink();
    }
  }

  bindEventListeners() {
    this.ExpandMoreButton.click(this.toggleList.bind(this));
  }

  toggleList() {
    if (this.expanded)
      this.shrink();
    else
      this.expand();
  }

  expand() {
    this.popup.slideDown();
    this.expandMoreIcon.addClass(this.ICON_EXPANDED_CLASS);
    this.expanded = true;
  }

  shrink() {
    this.popup.slideUp();
    this.expandMoreIcon.removeClass(this.ICON_EXPANDED_CLASS);
    this.expanded = false;
  }

}

let ExpandableCheckboxLists = []; 

$('.expandable-checkbox-list').each( function(index, element) {
  ExpandableCheckboxLists[index] = new ExpandableCheckboxList($(element));
});