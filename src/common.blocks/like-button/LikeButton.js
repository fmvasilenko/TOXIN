import LikeButtonLogic from './LikeButtonLogic';

class LikeButton {
  constructor(container) {
    const likeButtonLogic = new LikeButtonLogic(container);

    this.getLikesNumber = () => likeButtonLogic.getLikesNumber();

    this.getIsLiked = () => likeButtonLogic.getIsLiked();

    this.setLikesNumber = (value) => likeButtonLogic.setLikesNumber(value);

    this.setIsLiked = (value) => likeButtonLogic.setIsLiked(value);

    this.setLikesNumberSubscriber = (subscriber) => likeButtonLogic.setLikesNumberSubscriber(subscriber);

    this.setIsLikedSubscriber = (subscriber) => likeButtonLogic.setIsLikedSubscriber(subscriber);
  }
}

export default LikeButton;
