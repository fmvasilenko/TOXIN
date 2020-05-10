export default class ComponentModel {

  constructor(controller = {}) {
    this.setState();
    this.controller = controller;
    this.state = this.mergeStates(this.state, this.controller.state);
  }

  setState() {
    this.state = {}
  }

  mergeStates(state1 = {}, state2 = {}) {
    for (let key in state1) {
      if (state2[key] !== undefined){
        state2[key].subscribers = this.mergeSubscribers(state2[key], state1[key]);
        state1[key] = state2[key];
      }
      else {
        state2[key] = state1[key];
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

}