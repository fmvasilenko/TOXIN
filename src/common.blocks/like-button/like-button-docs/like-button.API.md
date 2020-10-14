<a name="top"></a>

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
```js
new LikeButton(container);
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
Sets likes number.
```js
likeButton.getLikesNumber();
```

### State parameter
Works with [`likesNumber`](like-button.state.md#likesnumber).

### Valid parameters
Does not have any parameters

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
```js
likeButton.setLikesNumber(value);
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
```js
likeButton.setLikesNumberSubscriber(subscriber);
```

### State parameter
Works with [`likesNumber`](like-button.state.md#likesnumber).

### Valid parameters
subscriber should be a function
```js
subscriber = function(likesNumber) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```js
const subscriber = function(likesNumber) {
  console.log(likesNumber);
}

likeButton.setLikesNumberSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setLikesNumberSubscriber(() => {})`.
If you need to add few functions, use:
```js
subscriber = function(likesNumber) {
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
```js
likeButton.getIsLiked();
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
```js
likeButton.setIsLiked(value);
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
```js
likeButton.setIsLikedSubscriber(subscriber);
```

### State parameter
Works with [`isLiked`](like-button.state.md#isliked).

### Valid parameters
subscriber should be a function
```js
subscriber = function(isLiked) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```js
const subscriber = function(isLiked) {
  console.log(isLiked);
}

likeButton.setIsLikedSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setIsLikedSubscriber(() => {})`.
If you need to add few functions, use:
```js
subscriber = function(isLiked) {
  function1(isLiked);
  function2(isLiked);
  function3(isLiked);
}

likeButton.setIsLikedSubscriber(subscriber);
```

[Back to the top](#top)
