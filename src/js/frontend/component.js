export default class Component {
  
  constructor(parent = {}) {
    this.setState();
    this.parent = parent;
    this.state = this.mergeStates(this.state, this.parent.state);
    this.initGetSet();
  }

  setState() {
    this.state = {}
  }

  mergeStates(state1 = {}, state2 = {}) {
    for (let key in state1) {
      if (state1[key].isGlobal) {
        if (state2[key] !== undefined){
          state2[key].subscribers = this.mergeSubscribers(state2[key], state1[key]);
          state1[key] = state2[key];
        }
        else {
          state2[key] = state1[key];
        }
      }

      delete state1[key].isGlobal;
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

}