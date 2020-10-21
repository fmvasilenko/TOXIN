import LikeButton from '@blocks/like-button/LikeButton';

class FeedbackConnector {
  constructor(container) {
    this.likeButton = new LikeButton(container);
  }
}

export default FeedbackConnector;
