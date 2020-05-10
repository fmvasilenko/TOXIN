export default class ComponentView {

  constructor(controller = {}) {
    this.setState();
    this.initGetSet();
    this.CONTROLLER = controller;
    this.root = this.CONTROLLER.root;
    this.state = this.mergeStates(this.state, this.CONTROLLER.state);
  }

  setState() {
    this.state = {}
  }

  mergeStates(state1 = {}, state2 = {}) {
    for (let key in state1) {
        let id = state1[key].alias ? state1[key].alias : key;
        if (state2[id] !== undefined){
          state2[id].subscribers = this.mergeSubscribers(state2[id], state1[key]);
          state1[key] = state2[id];
        }
        else {
          state2[id] = state1[key];
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

}