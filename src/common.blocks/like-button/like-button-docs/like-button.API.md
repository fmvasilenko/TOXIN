# LikeButton API

## Table of contents
1. constructor
2. getLikesNumber
3. setLikesNumber
4. setLikesNumberSubscriber
5. getIsLiked
6. setIsLiked
8. setIsLikedSubscriber

## constructor

```js
new LikeButton(container);
```
`container` - HTMLElement, that contains structure for like button. 
If there are few like button structures in the container - the first one will be chosen.

## getLikesNumber

```js
likeButton.getLikesNumber();
```
Returns current likes number

## setLikesNumber

```js
likeButton.setLikesNumber(value)
```
Sets current likes number. If `value <= 0` - likesNumber will be set to 0 and `isLiked` will be false.
Value should be a number.

## setLikesNumberSubscriber

```js
const subscriber = (likesNumber) => {
  // some code
}

likeButton.setLikesNumberSubscriber(subscriber)
```
Sets `likesNumber` subscriber.
> Note! There can be only one subscriber. If you use the method twice - subscriber will be set to the second one.
To remove subscriber use:
```js
likeButton.setLikesNumberSubscriber(() => {})
```

## getIsLiked

```js
likeButton.getIsLiked()
```
Returns true if button is pressed.

## setIsLiked

```js
likeButton.setIsLiked(value)
```
Changes `isLiked` parameter. Value should be boolean.

## setIsLikedSubscriber

```js
const subscriber = (isLiked) => {
  // some code
}

likeButton.setIsLikedSubscriber(subscriber);
```
Sets `isLiked` subscriber.
> Note! There can be only one subscriber. If you use the method twice - subscriber will be set to the second one.
To remove subscriber use:
```js
likeButton.setIsLikedSubscriber(() => {})
```