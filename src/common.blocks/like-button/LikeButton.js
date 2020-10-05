class LikeButton {
  constructor(container, likesNumberOnChangeFunction = () => {}) {
    this.classes = require('./like-button.classes.json');
    this.vocabulary = require('./like-button.config.json').vocabulary;
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.likesNumberOnChangeFunction = likesNumberOnChangeFunction;
    this.bindEventListeners();
  }

  findDOMNodes(container) {
    return {
      root: container.querySelector(`.${this.classes.root}`),
      icon: container.querySelector(`.${this.classes.icon}`),
      input: container.querySelector(`.${this.classes.input}`),
    };
  }

  getInitialState() {
    return {
      likesNumber: parseInt(this.DOM.input.value, 10),
      isLiked: this.DOM.root.classList.contains(this.classes.root_liked),
    };
  }

  bindEventListeners() {
    this.DOM.root.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler() {
    this.state.isLiked = !this.state.isLiked;
    this.changeLikesNumber();
    this.render();
  }

  changeLikesNumber() {
    if (this.state.isLiked) this.state.likesNumber += 1;
    else if (this.state.likesNumber > 0) this.state.likesNumber -= 1;
    this.likesNumberOnChangeFunction(this.state.likesNumber);
  }

  render() {
    if (this.state.isLiked) {
      this.DOM.root.classList.add(this.classes.root_liked);
      this.DOM.icon.classList.add(this.classes.icon_liked);
      this.DOM.input.classList.add(this.classes.input_liked);
      this.DOM.icon.innerHTML = this.vocabulary.iconLiked;
    } else {
      this.DOM.root.classList.remove(this.classes.root_liked);
      this.DOM.icon.classList.remove(this.classes.icon_liked);
      this.DOM.input.classList.remove(this.classes.input_liked);
      this.DOM.icon.innerHTML = this.vocabulary.icon;
    }
    this.DOM.input.value = this.state.likesNumber;
  }
}

export default LikeButton;
