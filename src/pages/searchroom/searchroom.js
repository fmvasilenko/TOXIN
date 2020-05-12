import 'jquery';
import 'jquery-ui';
import 'jquery-ui-touch-punch';
import '../../scss/main.scss';

import Component from "@frontend/component";
import Sidebar from "@blocks/sidebar/sidebar";
import Suite from "@blocks/suite/suite";

class Searchroom extends Component {

  constructor() {
    super({root: $(document), parent: null});
  }

  setChildren() {
    this.children = [
      new Sidebar(this.root.find(".sidebar"), this)
    ];

    let suites = this.initSuite();
    this.children = this.children = this.children.concat(suites);
  }

  initSuite() {
    let suites = []; 

    $('.suite').each( function(index, element) {
      suites[index] = new Suite($(element), this);
    });

    return suites;
  }

}

let searchroom = new Searchroom();
console.log(searchroom);