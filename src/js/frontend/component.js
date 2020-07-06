export default class Component {
  constructor(config = { root: null, parent: {} }) {
    this.root = config.root ? config.root : null;
    this.PARENT = config.parent;

    this.setState();
    this.initGetSet();
    this.checkComponentRoot();

    if (this.PARENT) this.mergeStates(this.state, this.PARENT.state);
    this.setClasses();
    this.setChildren();
    this.setClosers();
    this.setChildrenClosers();
    this.componentBindEventListeners();
  }

  setState() {
    this.state = {};
  }

  setChildren() {
    this.children = [];
  }

  setClasses() {
    this.CLASSES = {};
  }

  setClosers() {
    this.closers = [];
  }

  setChildrenClosers() {
    let childrenClosers = [];

    this.children.forEach((child) => {
      childrenClosers = childrenClosers.concat(child.closers);
      childrenClosers = childrenClosers.concat(child.childrenClosers);
    });

    this.childrenClosers = childrenClosers;
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

  // eslint-disable-next-line class-methods-use-this
  mergeSubscribers(parameter1 = {}, parameter2 = {}) {
    // if (parameter1.subscribers === undefined) parameter1.subscribers = [];
    // if (parameter2.subscribers === undefined) parameter2.subscribers = [];

    const subscribers1 = parameter1.subscribers || [];
    const subscribers2 = parameter2.subscribers || [];

    // return parameter1.subscribers.concat(parameter2.subscribers);
    return [...subscribers1, ...subscribers2];
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
    if (!this.PARENT) {
      this.checkComponentRoot();
      if (this.componentRoot) {
        this.componentRoot.addEventListener("click", this.clickController.bind(this), false);
      }
    }
  }

  clickController(event) {
    this.children.forEach( function(child) {
      if (this.isChildsEvent(event, child)) {
        child.clickController(event);
      }
      else {
        child.runClosers();
      }
    }.bind(this));

    this.clickHandler(event);
  }

  clickHandler(event) {}

  runClosers() {
    this.closers.forEach(closer => {
      closer();
    });

    this.childrenClosers.forEach(closer => {
      closer();
    })
  }

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

    let className = child.componentRoot.classList.item(0);
    return event.target.closest(`.${className}`) == child.componentRoot;
  }

}