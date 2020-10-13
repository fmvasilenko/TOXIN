import StateItem from './StateItem';

class LikeButtonLogic {
  constructor(container) {
    this.classes = require('./like-button.classes.json');
    this.vocabulary = require('./like-button.config.json').vocabulary;
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.defineSubscriptions();
    this.bindEventListeners();
  }

  getLikesNumber() {
    return this.state.likesNumber.get();
  }

  getIsLiked() {
    return this.state.isLiked.get();
  }

  setLikesNumber(value) {
    if (value > 0) this.state.likesNumber.set(value);
    else {
      this.state.isLiked.set(false);
      this.state.likesNumber.set(0);
    }
  }

  setIsLiked(value) {
    if (value !== this.state.isLiked.get()) this.state.isLiked.set(value);
  }

  setLikesNumberSubscriber(subscriber) {
    this.likesNumberExternalSubscriber = subscriber;
  }

  setIsLikedSubscriber(subscriber) {
    this.isLikedExternalSubscriber = subscriber;
  }

  defineSubscriptions() {
    this.likesNumberExternalSubscriber = () => {};
    this.isLikedExternalSubscriber = () => {};

    this.state.isLiked.addSubscriber(this.changeLikesNumber.bind(this));
    this.state.likesNumber.addSubscriber(this.render.bind(this));
    this.state.isLiked.addSubscriber(this.isLikedSubscriber.bind(this));
    this.state.likesNumber.addSubscriber(this.likesNumberSubscriber.bind(this));
  }

  likesNumberSubscriber() {
    this.likesNumberExternalSubscriber(this.state.likesNumber.get());
  }

  isLikedSubscriber() {
    this.isLikedExternalSubscriber(this.state.isLiked.get());
  }

  findDOMNodes(container) {
    return {
      root: container.querySelector(`.${this.classes.root}`),
      icon: container.querySelector(`.${this.classes.icon}`),
      input: container.querySelector(`.${this.classes.input}`),
    };
  }

  getInitialState() {
    const likesNumber = parseInt(this.DOM.input.value, 10);
    const isLiked = this.DOM.root.classList.contains(this.classes.rootLiked);

    return {
      likesNumber: new StateItem(likesNumber),
      isLiked: new StateItem(isLiked),
    };
  }

  bindEventListeners() {
    this.DOM.root.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler() {
    this.state.isLiked.set(!this.state.isLiked.get());
  }

  changeLikesNumber() {
    if (this.state.isLiked.get()) this.state.likesNumber.set(this.state.likesNumber.get() + 1);
    else if (this.state.likesNumber.get() > 0) this.state.likesNumber.set(this.state.likesNumber.get() - 1);
  }

  render() {
    if (this.state.isLiked.get()) {
      this.DOM.root.classList.add(this.classes.rootLiked);
      this.DOM.icon.classList.add(this.classes.iconLiked);
      this.DOM.input.classList.add(this.classes.inputLiked);
      this.DOM.icon.innerHTML = this.vocabulary.iconLiked;
    } else {
      this.DOM.root.classList.remove(this.classes.rootLiked);
      this.DOM.icon.classList.remove(this.classes.iconLiked);
      this.DOM.input.classList.remove(this.classes.inputLiked);
      this.DOM.icon.innerHTML = this.vocabulary.icon;
    }
    this.DOM.input.value = this.state.likesNumber.get();
  }
}

export default LikeButtonLogic;
