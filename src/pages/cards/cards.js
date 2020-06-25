import 'jquery';
//import 'jquery-ui';
//import 'jquery-ui-touch-punch';
import '../../scss/main.scss';

import Component from "@frontend/component";
import SearchForm from "@blocks/search-form/search-form";
import Receipt from "@blocks/receipt/receipt";
import Calendar from "@blocks/calendar/calendar";
import Suite from "@blocks/suite/suite";

class Cards extends Component {

  constructor() {
    super({root: $(document), parent: null});
  }

  setChildren() {
    this.children = [
      new SearchForm(this.root.find(".search-form"), this),
      new Receipt(this.root.find(".receipt"), this),
      new Calendar(this.root.find(".cards__calendar").find(".calendar"), this)
    ];
    let suites = this.initSuite();

    this.children = this.children.concat(suites);
  }

  initSuite() {
    let suites = []; 

    $('.suite').each( function(index, element) {
      suites[index] = new Suite($(element), this);
    });

    return suites;
  }

}

let cards = new Cards();