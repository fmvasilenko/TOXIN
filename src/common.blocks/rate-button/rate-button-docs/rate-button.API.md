<a name="top"></a>

# RateButton API
[Back to RateButton docs](rate-button.md)

## Table of contents
1. [constructor](#constructor)
2. [getRate](#getrate)
3. [setRate](#setrate)
4. [setRateSubscriber](#setratesubscriber)


***
<a name="constructor"></a>

## constructor

### Description
```js
new RateButton(container);
```

### Valid parameters
container - HTMLElement, that contains structure for rate button. 
> If there are few rate button structures in the container - the first one will be chosen.

### Parameters validity check
None

### Usage example
```js
const rateButtonContainer = document.querySelector('.rate-button-container');
const rateButton = new RateButton(rateButtonContainer);
```

[Back to the top](#top)


***
<a name="getrate"></a>

## getRate

### Description
Gets current rate value.

```ts
getRate(): number;
```

### State parameter
Works with [`rate`](rate-button.state.md#rate).

### Valid parameters
Does not have any parameters

### Return value
Returns number `0 - stars number`

### Usage example
```js
const rate = rateButton.getRate();
```

[Back to the top](#top)


***
<a name="setRate"></a>

## setRate

### Description
Sets rate value.
```ts
rateButton.setRate(value: number);
```

### State parameter
Works with [`rate`](rate-button.state.md#rate).

### Valid parameters
value: `0 - stars number`

### Parameters validity check
If `value < 1` - it will be changed to 1.
If `value > stars.length` - it will be changed to `stars.length`.

### Return value
None

### Usage example
```js
rateButton.setRate(2);
```

[Back to the top](#top)


***
<a name="setratesubscriber"></a>

## setRateSubscriber

### Description
Sets rate subscriber.
```ts
rateButton.setRateSubscriber(subscriber: function);
```

### State parameter
Works with [`rate`](rate-button.state.md#rate).

### Valid parameters
subscriber should be a function
```js
subscriber = function(rate) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```js
const subscriber = function(rate) {
  console.log(rate);
}

rateButton.setRateSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setRateSubscriber(() => {})`.
If you need to add few functions, use:
```js
subscriber = function(rate) {
  function1(rate);
  function2(rate);
  function3(rate);
}

rateButton.setRateSubscriber(subscriber);
```

[Back to the top](#top)
