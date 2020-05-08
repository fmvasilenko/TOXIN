import Component from "./frontend/component";
import RateButton from "../common.blocks/rate-button/rate-button";
import LikeButton from "@blocks/like-button/like-button";
//import Calendar from "@blocks/calendar/calendar";
import DateDropdown from "@blocks/date-dropdown/date-dropdown";
import FilterDateDropdown from "@blocks/filter-date-dropdown/filter-date-dropdown";
import Dropdown from "@blocks/drop-down/drop-down";

class Page extends Component {

  constructor() {
    super();

    this.setInitialState();
  }

  setInitialState() {
    this.initRateButtons();
    this.initLikeButtons();
    this.initDateDropdown();
    this.initFilterDateDropdown();
    this.initDropdown();
    //this.initCalendar();
  }

  initRateButtons() {
    let rateButtons = []; 

    $('.rate-button').each( function(index, element) {
      rateButtons[index] = new RateButton($(element));
    });

    this.rateButtons = rateButtons;
  }

  initLikeButtons() {
    let likeButtons = []; 

    $('.like-button').each( function(index, element) {
      likeButtons[index] = new LikeButton($(element));
    });

    this.likeButtons = likeButtons;
  }

  initCalendar() {
    let calendars = []; 

    $('.calendar').each( function(index, element) {
      calendars[index] = new Calendar($(element));
    });

    this.calendars = calendars;
  }

  initDateDropdown() {
    let dateDropdowns = []; 

    $('.date-dropdown').each( function(index, element) {
      dateDropdowns[index] = new DateDropdown($(element));
    });

    this.dateDropdowns = dateDropdowns;
  }

  initFilterDateDropdown() {
    let filterDateDropdowns = []; 

    $('.filter-date-dropdown').each( function(index, element) {
      filterDateDropdowns[index] = new FilterDateDropdown($(element));
    });

    this.filterDateDropdowns = filterDateDropdowns;
  }

  initDropdown() {
    let dropdowns = []; 

    $('.drop-down').each( function(index, element) {
      dropdowns[index] = new Dropdown($(element));
    });

    this.dropdowns = dropdowns;
  }

}

let page = new Page;
console.log(page);