import Component from "./component";

class ChildClass extends Component {

  constructor(rootElement) {
    super();
    this.children = [];

    this.root = rootElement;
  }

  eventHandler(event) {
    switch (event.target.classList.item(0)) {
      case "someBlock": {
        console.log("someBlock changed");
        return true;
      }
    }

    console.log("Child handler");

    return false;

  }

  clickController(event) {
    this.checkComponentRoot();
    let result = this.eventHandler(event);

    this.children.forEach( function(child) {
      child.checkComponentRoot();

      let childClass = child.componentRoot.classList.item(0);

      if (child.componentRoot == event.target.closest(`.${childClass}`)) {
        let result = child.clickController(event);
        //console.log(result);
        return result;
      }
    });

    //console.log(result);
    return result;
  }

}

export default class TestClass extends Component {

  constructor(rootElement) {
    super();
    
    this.root = rootElement;
    this.setChildren();
    this.bindEventListeners();
  }

  setChildren() {
    let child = $(this.root.find(".testBlock2")[0]);
    //console.log(child);
    this.children = [
      new ChildClass(child)
    ]
  }

  bindEventListeners() {

    this.root.click(this.clickController.bind(this));
    
  }

  eventHandler(event) {
    switch (event.target.classList.item(0)) {
      case "testBlock": {
        console.log("testBlock changed");
        return true;
      }
    }

    return false;

  }

  clickController(event) {
    this.checkComponentRoot();
    let result = this.eventHandler(event);

    this.children.forEach( function(child) {
      child.checkComponentRoot();

      let childClass = child.componentRoot.classList.item(0);

      if (child.componentRoot == event.target.closest(`.${childClass}`)) {
        let result = child.clickController(event);
        console.log(result);
        return result;
      }
    });

    console.log(result);
    return result;
  }

}