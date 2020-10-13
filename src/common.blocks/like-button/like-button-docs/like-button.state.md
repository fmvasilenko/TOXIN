# Like Button State

## Table of contents
1. Description
2. likesNumber
3. isLiked
4. InitialState

## Description
State contains 2 parameters:
1. `likesNumber`
2. `isLiked`

## likesNumber
Changes if `isLiked` was changed.
Goes `likesNumber += 1` when `isLiked === true`.
And `likesNumber -= 1` when `isLiked === false` and `likesNumber > 0`.
That means that `likesNumber` cannot go lower then 0.

## isLiked
Can be only true or false.
Toggles everytime button is pressed by user.

## InitialState
`likesNumber` sets to the value that likeButton input has.
> Without any value checking!

`isLiked` sets to true if button root element has 'liked' class.