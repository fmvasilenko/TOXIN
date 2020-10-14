<a name="top"></a>

# RateButton State
[Back to RateButton docs](rate-button.md)

## Table of contents
1. [Description](#description)
2. [rate](#rate)


***

<a name="description"></a>

## Description
State contains 1 parameter:
1. [`rate`](#rate)

[Back to the top](#top)


***

<a name="rate"></a>

## rate

### Description
Presents current rate.

### User events reactions
Rate value is changed, depending on which star radio input has checked attribute.

### Values
Possible values: `0 - number of stars`.

### Initial state
Initial state value is got from the star radio input, that has checked attribute.
If there is no checked star - value sets to 0

### State dependencies
None

### State dependents
None

### Public API methods
[`getRate`](rate-button.API.md#getrate)
[`setRate`](rate-button.API.md#setrate)
[`setRateSubscriber`](rate-button.API.md#setratesubscriber)

[Back to the top](#top)
