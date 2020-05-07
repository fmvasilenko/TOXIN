import Component from "./frontend/component";
import RateButton from "../common.blocks/rate-button/rate-button";
import LikeButton from "@blocks/like-button/like-button";
//import Calendar from "@blocks/calendar/calendar";
import DateDropdown from "@blocks/date-dropdown/date-dropdown";

class Page extends Component {

  constructor() {
    super();

    this.setInitialState();
  }

  setInitialState() {
    this.initRateButtons();
    this.initLikeButtons();
    this.initDateDropdown();
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

}

let page = new Page;
console.log(page);