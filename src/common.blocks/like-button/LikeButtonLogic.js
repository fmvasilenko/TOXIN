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
    return this.state.likesNumber.value;
  }

  getIsLiked() {
    return this.state.isLiked.value;
  }

  setLikesNumber(value) {
    if (value > 0) this.state.likesNumber.value = value;
    else {
      this.state.isLiked.value = false;
      this.state.likesNumber.value = 0;
    }
  }

  setIsLiked(value) {
    if (value !== this.state.isLiked.value) this.state.isLiked.value = value;
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
    this.likesNumberExternalSubscriber(this.state.likesNumber.value);
  }

  isLikedSubscriber() {
    this.isLikedExternalSubscriber(this.state.isLiked.value);
  }

  findDOMNodes(container) {
    return {
      root: container.querySelector(`.js-${this.classes.root}`),
      icon: container.querySelector(`.js-${this.classes.icon}`),
      input: container.querySelector(`.js-${this.classes.input}`),
    };
  }

  getInitialState() {
    let likesNumber = parseInt(this.DOM.input.value, 10);
    let isLiked = this.DOM.root.classList.contains(this.classes.rootLiked);

    if (likesNumber < 0) likesNumber = 0;
    if (likesNumber === 0) isLiked = false;

    return {
      likesNumber: new StateItem(likesNumber),
      isLiked: new StateItem(isLiked),
    };
  }

  bindEventListeners() {
    this.DOM.root.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler() {
    this.state.isLiked.value = !this.state.isLiked.value;
  }

  changeLikesNumber() {
    if (this.state.isLiked.value) this.state.likesNumber.value += 1;
    else if (this.state.likesNumber.value > 0) this.state.likesNumber.value -= 1;
  }

  render() {
    if (this.state.isLiked.value) {
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
    this.DOM.input.value = this.state.likesNumber.value;
  }
}

export default LikeButtonLogic;
