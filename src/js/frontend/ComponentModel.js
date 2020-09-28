/* eslint-disable no-param-reassign */
class ComponentModel {
  constructor(controller = {}) {
    this.setState();
    this.initGetSet();
    this.CONTROLLER = controller;
    this.root = this.CONTROLLER.root;
    this.state = this.mergeStates(this.state, this.CONTROLLER.state);
  }

  setState() {
    this.state = {};
  }

  mergeStates(state1 = {}, state2 = {}) {
    Object.entries(state1).forEach(([key]) => {
      const id = state1[key].alias ? state1[key].alias : key;
      if (state2[id] !== undefined) {
        state2[id].subscribers = this.mergeSubscribers(state2[id], state1[key]);
        state1[key] = state2[id];
      } else {
        state2[id] = state1[key];
      }

      delete state1[key].isGlobal;
      delete state1[key].alias;
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
        set: (value) => {
          this.state[key].value = value;
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
}

export default ComponentModel;
