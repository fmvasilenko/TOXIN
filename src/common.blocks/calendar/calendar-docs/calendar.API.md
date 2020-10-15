<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`Calendar`](calendar.md)
[`Calendar State`](calendar.state.md)

# Calendar API

## Table of contents
1. [constructor](#constructor)
2. [getArrivalDate](#getarrivaldate)
3. [setArrivalDate](#setarrivaldate)
4. [setArrivalDateSubscriber](#setarrivaldatesubscriber)
5. [getLeavingDate](#getleavingdate)
6. [setLeavingDate](#setleavingdate)
7. [setLeavingDateSubscriber](#setleavingdatesubscriber)
8. [setPickingDate](#setpickingdate)
9. [setSubmitSubscriber](#setsubmitsubscriber)


***
<a name="constructor"></a>

## constructor

### Description
```js
new Calendar(container);
```

### Valid parameters
container - HTMLElement, that contains structure for calendar. 
> If there are few calendar structures in the container - the first one will be chosen.

### Parameters validity check
None

### Usage example
```js
const calendarContainer = document.querySelector('.calendar-container');
const calendar = new Calendar(calendarContainer);
```

[Back to the top](#top)


***
<a name="getarrivaldate"></a>

## getArrivalDate

### Description
Returns arrivalDate.
```js
calendar.getarrivalDate();
```

### State parameter
Works with [`arrivalDate`](calendar.state.md#arrivaldate).

### Valid parameters
Does not have any parameters

### Return value
Returns `new Date(arrivalDate) | null`

### Usage example
```js
const arrivalDate = calendar.getArrivalDate();
```

[Back to the top](#top)


***
<a name="setarrivaldate"></a>

## setArrivalDate

### Description
Sets arrivalDate.
```js
calendar.setArrivalDate(date);
```

### State parameter
Works with [`arrivalDate`](calendar.state.md#arrivaldate).

### Valid parameters
date: `new Date() | null`

### Parameters validity check
None

### Return value
None

### Usage example
```js
calendar.setArrivalDate(new Date('2020-10-10'));
```

[Back to the top](#top)


***
<a name="setarrivaldatesubscriber"></a>

## setArrivalDateSubscriber

### Description
Sets arrivalDate subscriber.
```js
calendar.setArrivalDateSubscriber(subscriber);
```

### State parameter
Works with [`arrivalDate`](calendar.state.md#arrivaldate).

### Valid parameters
subscriber should be a function
```js
subscriber = function(arrivalDate) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```js
const subscriber = function(arrivalDate) {
  console.log(arrivalDate);
}

calendar.setArrivalDateSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setArrivalDateSubscriber(() => {})`.
If you need to add few functions, use:
```js
subscriber = function(arrivalDate) {
  function1(arrivalDate);
  function2(arrivalDate);
  function3(arrivalDate);
}

calendar.setArrivalDateSubscriber(subscriber);
```

[Back to the top](#top)


***
<a name="getleavingdate"></a>

## getLeavingDate

### Description
Returns leavingDate.
```js
calendar.getLeavingDate();
```

### State parameter
Works with [`leavingDate`](calendar.state.md#leavingdate).

### Valid parameters
Does not have any parameters

### Return value
Returns `new Date(leavingDate) | null`

### Usage example
```js
const leavingDate = calendar.getLeavingDate();
```

[Back to the top](#top)


***
<a name="setleavingdate"></a>

## setLeavingDate

### Description
Sets leavingDate.
```js
calendar.setLeavingDate(date);
```

### State parameter
Works with [`leavingDate`](calendar.state.md#leavingdate).

### Valid parameters
date: `new Date() | null`

### Parameters validity check
None

### Return value
None

### Usage example
```js
calendar.setLeavingDate(new Date('2020-10-10'));
```

[Back to the top](#top)


***
<a name="setleavingdatesubscriber"></a>

## setLeavingDateSubscriber

### Description
Sets leavingDate subscriber.
```js
calendar.setLeavingDateSubscriber(subscriber);
```

### State parameter
Works with [`leavingDate`](calendar.state.md#leavingdate).

### Valid parameters
subscriber should be a function
```js
subscriber = function(leavingDate) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```js
const subscriber = function(leavingDate) {
  console.log(leavingDate);
}

calendar.setLeavingDateSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setLeavingDateSubscriber(() => {})`.
If you need to add few functions, use:
```js
subscriber = function(leavingDate) {
  function1(leavingDate);
  function2(leavingDate);
  function3(leavingDate);
}

calendar.setLeavingDateSubscriber(subscriber);
```

[Back to the top](#top)


***
<a name="setpickingdate"></a>

## setPickingDate

### Description
Sets pickingDate.
```js
calendar.setPickingDate(date);
```

### State parameter
Works with [`datePicking`](calendar.state.md#datepicking).

### Valid parameters
date: `'' | 'arrivalDate' | 'leavingDate'`

### Parameters validity check
None, but any value, except `'arrivalDate' | 'leavingDate'` will not have any effect.

### Return value
None

### Usage example
```js
calendar.setPickingDate('arrivalDate');
```

[Back to the top](#top)


***
<a name="setsubmitsubscriber"></a>

## setSubmitSubscriber

### Description
Sets submit button subscriber. Subscriber will be called everytime submit button is clicked.
```js
calendar.setSubmitSubscriber(subscriber);
```

### State parameter
None

### Valid parameters
subscriber should be a function
```js
subscriber = function() {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```js
const subscriber = function() {
  console.log('submit button pressed');
}

calendar.setSubmitSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setSubmitSubscriber(() => {})`.
If you need to add few functions, use:
```js
subscriber = function() {
  function1();
  function2();
  function3();
}

calendar.setSubmitSubscriber(subscriber);
```

[Back to the top](#top)
