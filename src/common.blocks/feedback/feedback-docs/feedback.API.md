<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`Feedback`](feedback.md)

# Feedback API

## Table of contents
1. [constructor](#constructor)


***
<a name="constructor"></a>

## constructor

### Description
```ts
class Feedback {
  constructor(container: HTMLElement) {

  }
}
```

### Valid parameters
container - HTMLElement, that contains structure for feedback. 
> If there are few feedback structures in the container - the first one will be chosen.

### Parameters validity check
None

### Usage example
```js
const feedbackContainer = document.querySelector('.feedback-container');
const feedback = new Feedback(feedbackContainer);
```

[Back to the top](#top)
