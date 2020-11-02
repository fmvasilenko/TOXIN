import Receipt from '@blocks/receipt/Receipt';
import Feedback from '@blocks/feedback/Feedback';
import RoomDetailsLogic from './RoomDetailsLogic';

class RoomDetailsConnector {
  constructor(container) {
    this.classes = require('./room-details.classes.json');
    this.DOM = this.findDOMNodes(container);

    this.receipt = new Receipt(this.DOM.receipt);
    this.feedbacks = this.createFeedbacks();
    this.roomDetailsLogic = new RoomDetailsLogic(this.DOM.gallery);
  }

  findDOMNodes(container) {
    return {
      receipt: container.querySelector(`.js-${this.classes.receipt}`),
      feedbacks: container.querySelectorAll(`.js-${this.classes.feedback}`),
      gallery: container.querySelector(`.js-${this.classes.gallery}`),
    };
  }

  createFeedbacks() {
    const feedbacks = [];

    this.DOM.feedbacks.forEach((feedbackContainer) => {
      feedbacks.push(new Feedback(feedbackContainer));
    });

    return feedbacks;
  }
}

export default RoomDetailsConnector;
