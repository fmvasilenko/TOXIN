import Component from "@frontend/component";

export default class Slider extends Component {

  constructor(root, parent = {}) {
    super({root: root, parent: parent});

    this.setDOM();
    this.setInitialState();
  }

  setState() {
    this.state = {
      valueFrom: {
        value: 0
      },
      valueTo: {
        value: 0
      }
    }
  }

  setClasses() {
    this.CLASSES = {
      LINE: "slider__line"
    }
  }

  setDOM() {
    this.DOM = {
      LINE: this.root.find(`.${this.CLASSES.LINE}`)
    }
  }

  setInitialState() {
    this.DOM.LINE.slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
  }

}