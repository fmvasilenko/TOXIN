export default class Component {
  
  constructor(config = {root: null, parent: {}}) {
    this.root = config.root ? config.root : null;
    this.parent = config.parent;

    this.setState();
    this.initGetSet();
    this.checkComponentRoot();

    if (this.parent) this.mergeStates(this.state, this.parent.state);
    this.setChildren();
    this.componentBindEventListeners();
  }

  setState() {
    this.state = {}
  }

  setChildren() {
    this.children = [];
  }

  mergeStates(state1 = {}, state2 = {}) {
    for (let key in state1) {
      if (state1[key].isGlobal) {
        let id = state1[key].alias ? state1[key].alias : key;
        if (state2[id] !== undefined){
          state2[id].subscribers = this.mergeSubscribers(state2[id], state1[key]);
          state1[key] = state2[id];
        }
        else {
          state2[id] = state1[key];
        }
      }

      delete state1[key].isGlobal;
      delete state1[key].alias;
    }

    return state1;
  }

  mergeSubscribers(parameter1 = {}, parameter2 = {}) {
    if (parameter1.subscribers === undefined) parameter1.subscribers = [];
    if (parameter2.subscribers === undefined) parameter2.subscribers = [];

    return parameter1.subscribers.concat(parameter2.subscribers);
  }

  initGetSet() {
    for (let key in this.state) {
      Object.defineProperty(this, key, {
        get: function() {
          return this.state[key].value;
        },
        set: function(value) {
          this.state[key].value = value;
          this.runSubscribers(this.state[key]);
        }
      });
    }
  }

  runSubscribers(parameter = {}) {
    if (parameter.subscribers !== undefined) {
      parameter.subscribers.forEach( subscriber => {
        subscriber();
      });
    }
  }

  componentBindEventListeners() {
    if (!this.parent) {
      this.checkComponentRoot();
      this.componentRoot.addEventListener("click", this.clickController.bind(this), false);
    }
  }

  clickController(event) {
    this.children.forEach( function(child) {
      if (this.isChildsEvent(event, child)) {
        child.clickController(event);
        return;
      }
    }.bind(this));

    this.clickHandler(event);
  }

  clickHandler(event) {}

  isJQueryObject(element) {
    return element instanceof jQuery;
  }

  createRootElement(element) {
    if (this.isJQueryObject(element)) {
      this.componentRoot = element[0];
    }
    else {
      this.componentRoot = element;
    }
  }

  checkComponentRoot() {
    if (!this.componentRoot) {
      this.createRootElement(this.root);
    }
  }

  isChildsEvent(event, child) {
    if (!child.componentRoot) return false;

    let className = child.componentRoot.classList.item(0)
    return event.target.closest(`.${className}`) == child.componentRoot;
  }

}