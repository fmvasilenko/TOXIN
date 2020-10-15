<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`LikeButton`](like-button.md)
[`LikeButton State`](like-button.state.md)

# LikeButton API

## Table of contents
1. [constructor](#constructor)
2. [getLikesNumber](#getlikesnumber)
3. [setLikesNumber](#setlikesnumber)
4. [setLikesNumberSubscriber](#setlikesnumbersubscriber)
5. [getIsLiked](#getisliked)
6. [setIsLiked](#setisliked)
8. [setIsLikedSubscriber](#setislikedsubscriber)


***
<a name="constructor"></a>

## constructor

### Description
```ts
class LikeButton {
  constructor(container: HTMLElement) {

  }
}
```

### Valid parameters
container - HTMLElement, that contains structure for like button. 
> If there are few like button structures in the container - the first one will be chosen.

### Parameters validity check
None

### Usage example
```js
const likeButtonContainer = document.querySelector('.like-button-container');
const likeButton = new LikeButton(likeButtonContainer);
```

[Back to the top](#top)


***
<a name="getlikesnumber"></a>

## getLikesNumber

### Description
Gets likes number.

```ts
class LikeButton {
  getLikesNumber(): number {
    return this.likesNumber;
  }
}
```

### State parameter
Works with [`likesNumber`](like-button.state.md#likesnumber).

### Valid parameters
Does not receive any parameters

### Return value
Returns number `0 - unlimited`

### Usage example
```js
const likesNumber = likeButton.getLikesNumber();
```

[Back to the top](#top)


***
<a name="setlikesnumber"></a>

## setLikesNumber

### Description
Sets likes number.

```ts
class LikeButton {
  setLikesNumber(value: number) {
    this.likesNumber = value;
  }
}
```

### State parameter
Works with [`likesNumber`](like-button.state.md#likesnumber).

### Valid parameters
value: `0 - unlimited`

### Parameters validity check
If `value < 0` - it will be changed to 0.

### Return value
None

### Usage example
```js
likeButton.setLikesNumber(10);
```

[Back to the top](#top)


***
<a name="setlikesnumbersubscriber"></a>

## setLikesNumberSubscriber

### Description
Sets likes number subscriber.
```ts
class LikeButton {
  setLikesNumberSubscriber(subscriber: function) {
    this.likesNumberSubscriber = subscriber;
  };
}
```

### State parameter
Works with [`likesNumber`](like-button.state.md#likesnumber).

### Valid parameters
subscriber should be a function
```ts
subscriber = function(likesNumber: number) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```ts
const subscriber = function(likesNumber: number) {
  console.log(likesNumber);
}

likeButton.setLikesNumberSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setLikesNumberSubscriber(() => {})`.
If you need to add few functions, use:
```ts
subscriber = function(likesNumber: number) {
  function1(likesNumber);
  function2(likesNumber);
  function3(likesNumber);
}

likeButton.setLikesNumberSubscriber(subscriber);
```

[Back to the top](#top)


***
<a name="getisliked"></a>

## getIsLiked

### Descriptions
Returns current `isLiked` state.

```ts
class LikeButton {
  getIsLiked(): boolean {
    return this.isLiked;
  }
}
```

### State parameter
Works with [`isLiked`](like-button.state.md#isliked).

### Valid parameters
Does not have any parameters

### Return value
`true | false`, depending if likeButton is pressed or not.

### Usage example
```js
const isLiked = likeButton.getIsLiked();
```

[Back to the top](#top)


***
<a name="setisliked"></a>

## setIsLiked

### Description
Sets `isLiked` state parameter.
```ts
class LikeButton {
  setIsLiked(value: boolean) {
    this.isLiked = value;
  };
}
```

### State parameter
Works with [`isLiked`](like-button.state.md#isliked).

### Valid parameters
value: `true | false`

### Parameters validity check
None

### Return value
None

### Usage example
```js
likeButton.setIsLiked(true);
```

[Back to the top](#top)


***
<a name="setislikedsubscriber"></a>

## setIsLikedSubscriber

### Description
Sets isLiked subscriber.
```ts
class LikeButton {
  setIsLikedSubscriber(subscriber: function) {
    this.isLikedSubscriber = subscriber;
  }
}
```

### State parameter
Works with [`isLiked`](like-button.state.md#isliked).

### Valid parameters
subscriber should be a function

```ts
subscriber = function(isLiked: boolean) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```ts
const subscriber = function(isLiked: boolean) {
  console.log(isLiked);
}

likeButton.setIsLikedSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setIsLikedSubscriber(() => {})`.
If you need to add few functions, use:
```ts
subscriber = function(isLiked: boolean) {
  function1(isLiked);
  function2(isLiked);
  function3(isLiked);
}

likeButton.setIsLikedSubscriber(subscriber);
```

[Back to the top](#top)
