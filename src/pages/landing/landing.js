import 'jquery';
import 'jquery-ui';
import 'jquery-ui-touch-punch';
import '../../scss/main.scss';

import Component from "@frontend/component";
import SearchForm from "@blocks/search-form/search-form";

class Landing extends Component {

  constructor() {
    super({root: $(document), parent: null});
  }

  setChildren() {
    this.children = [
      new SearchForm(this.root.find(".search-form"), this)
    ]
  }

}

let landing = new Landing();