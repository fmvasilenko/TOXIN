import 'jquery';
import 'jquery-ui';
import 'jquery-ui-touch-punch';
import '../../scss/main.scss';

import Component from "@frontend/component";
import Receipt from "@blocks/receipt/receipt";

class RoomDetails extends Component {

  constructor() {
    super({root: $(document), parent: null});

    this.setDOM();
    this.setInitialState();
  }

  setState() {
    this.state = {
      coverImage: {
        value: "",
        subscribers: [
          this.changecoverImage.bind(this)
        ]
      },
      miniImage1: {
        value: "",
        subscribers: [
          this.changeMiniImage1.bind(this)
        ]
      },
      miniImage2: {
        value: "",
        subscribers: [
          this.changeMiniImage2.bind(this)
        ]
      }
    }
  }

  setClasses() {
    this.CLASSES = {
      COVER_IMAGE: "room-details__cover-image",
      MINI_IMAGE: "room-details__mini-image"
    }
  }

  setChildren() {
    this.children = [
      new Receipt(this.root.find(".receipt"), this)
    ]
  }

  setDOM() {
    this.DOM = {
      COVER_IMAGE: this.root.find(`.${this.CLASSES.COVER_IMAGE}`),
      MINI_IMAGE1: this.root.find(`.${this.CLASSES.MINI_IMAGE}`).eq(0),
      MINI_IMAGE2: this.root.find(`.${this.CLASSES.MINI_IMAGE}`).eq(1)
    }
  }

  setInitialState() {
    this.coverImage = this.DOM.COVER_IMAGE.attr("src");
    this.miniImage1 = this.DOM.MINI_IMAGE1.attr("src");
    this.miniImage2 = this.DOM.MINI_IMAGE2.attr("src");
  }

  clickHandler(event) {
    if (this.miniImage1Clicked(event)) {
      let image = this.coverImage;
      this.coverImage = this.miniImage1;
      this.miniImage1 = image;
    }
    else if (this.miniImage2Clicked(event)) {
      let image = this.coverImage;
      this.coverImage = this.miniImage2;
      this.miniImage2 = image;
    }
  }

  changecoverImage() {
    this.DOM.COVER_IMAGE.attr("src", this.coverImage);
  }

  changeMiniImage1() {
    this.DOM.MINI_IMAGE1.attr("src", this.miniImage1);
  }

  changeMiniImage2() {
    this.DOM.MINI_IMAGE2.attr("src", this.miniImage2);
  }

  miniImage1Clicked(event) {
    return event.target.closest(`.${this.CLASSES.MINI_IMAGE}`) == this.DOM.MINI_IMAGE1[0];
  }

  miniImage2Clicked(event) {
    return event.target.closest(`.${this.CLASSES.MINI_IMAGE}`) == this.DOM.MINI_IMAGE2[0];
  }

}

let roomDetails = new RoomDetails();
console.log(roomDetails);