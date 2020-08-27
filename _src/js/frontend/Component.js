class Component {
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
    Object.entries(state1).forEach(([key]) => {
      if (state1[key].isGlobal) {
        const id = state1[key].alias || key;
        if (state2[id] !== undefined) {
          state2[id].subscribers = this.mergeSubscribers(state2[id], state1[key]);
          state1[key] = state2[id];
        } else {
          state2[id] = state1[key];
        }

        delete state1[key].isGlobal;
        delete state1[key].alias;
      }
    });

    return state1;
  }

  // eslint-disable-next-line class-methods-use-this
  mergeSubscribers(parameter1 = {}, parameter2 = {}) {
    const subscribers1 = parameter1.subscribers || [];
    const subscribers2 = parameter2.subscribers || [];

    return [...subscribers1, ...subscribers2];
  }

  initGetSet() {
    Object.entries(this.state).forEach(([key]) => {
      Object.defineProperty(this, key, {
        get: () => this.state[key].value,
        set: (newValue) => {
          this.state[key].value = newValue;
          this.runSubscribers(this.state[key]);
        },
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  runSubscribers(parameter = {}) {
    if (parameter.subscribers !== undefined) {
      parameter.subscribers.forEach((subscriber) => {
        subscriber();
      });
    }
  }

  componentBindEventListeners() {
    if (!this.PARENT) {
      this.checkComponentRoot();
      if (this.componentRoot) {
        this.componentRoot.addEventListener('click', this.clickController.bind(this), false);
      }
    }
  }

  clickController(event) {
    this.children.forEach((child) => {
      if (this.isChildsEvent(event, child)) {
        child.clickController(event);
      } else {
        child.runClosers();
      }
    });

    this.clickHandler(event);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  clickHandler(event) {}

  runClosers() {
    this.closers.forEach((closer) => {
      closer();
    });

    this.childrenClosers.forEach((closer) => {
      closer();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  isJQueryObject(element) {
    // eslint-disable-next-line no-undef
    return element instanceof jQuery;
  }

  createRootElement(element) {
    if (this.isJQueryObject(element)) {
      [this.componentRoot] = element;
    } else {
      this.componentRoot = element;
    }
  }

  checkComponentRoot() {
    if (!this.componentRoot) {
      this.createRootElement(this.root);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isChildsEvent(event, child) {
    if (!child.componentRoot) return false;

    const className = child.componentRoot.classList.item(0);
    return event.target.closest(`.${className}`) === child.componentRoot;
  }
}

export default Component;
