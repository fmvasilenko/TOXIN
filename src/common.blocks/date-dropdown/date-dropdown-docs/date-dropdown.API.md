<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`DateDropdown`](date-dropdown.md)
[`DateDropdown State`](date-dropdown.state.md)
[`DateDropdown Dependencies`](date-dropdown.dependencies.md)

# DateDropdown API

## Table of contents
1. [constructor](#constructor)
2. [getArrivalDate](#getarrivaldate)
3. [setArrivalDate](#setarrivaldate)
4. [setArrivalDateSubscriber](#setarrivaldatesubscriber)
5. [getLeavingDate](#getleavingdate)
6. [setLeavingDate](#setleavingdate)
7. [setLeavingDateSubscriber](#setleavingdatesubscriber)


***
<a name="constructor"></a>

## constructor

### Description
```ts
class DateDropdown {
  constructor(container: HTMLElement) {

  }
}
```

### Valid parameters
container - HTMLElement, that contains structure for date dropdown. 
> If there are few date dropdown structures in the container - the first one will be chosen.

### Parameters validity check
None

### Usage example
```js
const dateDropdownContainer = document.querySelector('.date-dropdown-container');
const dateDropdown = new DateDropdown(dateDropdownContainer);
```

[Back to the top](#top)


***
<a name="getarrivaldate"></a>

## getArrivalDate

> Note! This method has external [dependencies](date-dropdown.dependencies.md#getarrivaldate)!

### Description
Returns arrivalDate.

```ts
class DateDropdown {
  getArrivalDate(): Date | null {
    return this.arrivalDate;
  }
}
```

### State parameter
Works with [`arrivalDate`](date-dropdown.state.md#arrivaldate).

### Valid parameters
Does not have any parameters

### Return value
Returns `new Date(arrivalDate) | null`

### Usage example
```js
const arrivalDate = dateDropdown.getArrivalDate();
```

[Back to the top](#top)


***
<a name="setarrivaldate"></a>

## setArrivalDate

> Note! This method has external [dependencies](date-dropdown.dependencies.md#setarrivaldate)!

### Description
Sets arrivalDate.

```ts
class DateDropdown {
  setArrivalDate(date: Date | null) {
    this.arrivalDate = date;
  }
}
```

### State parameter
Works with [`arrivalDate`](date-dropdown.state.md#arrivaldate).

### Valid parameters
`date` : `new Date() | null`

### Parameters validity check
None

### Return value
None

### Usage example
```js
dateDropdown.setArrivalDate(new Date('2020-10-10'));
```

### Should be added
1. Parameters check (date should not be lower the current date or later then leavingDate)

[Back to the top](#top)


***
<a name="setarrivaldatesubscriber"></a>

## setArrivalDateSubscriber

> Note! This method has external [dependencies](date-dropdown.dependencies.md#setarrivaldatesubscriber)!

### Description
Sets arrivalDate subscriber.

```ts
class DateDropdown {
  setArrivalDateSubscriber(subscriber: function) {
    this.arrivalDateSubscriber = subscriber;
  }
}
```

### State parameter
Works with [`arrivalDate`](date-dropdown.state.md#arrivaldate).

### Valid parameters
subscriber should be a function
```ts
subscriber = function(arrivalDate: Date | null) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```ts
const subscriber = function(arrivalDate: Date | null) {
  console.log(arrivalDate);
}

dateDropdown.setArrivalDateSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setArrivalDateSubscriber(() => {})`.
If you need to add few functions, use:
```ts
subscriber = function(arrivalDate: Date | null) {
  function1(arrivalDate);
  function2(arrivalDate);
  function3(arrivalDate);
}

dateDropdown.setArrivalDateSubscriber(subscriber);
```

[Back to the top](#top)


***
<a name="getleavingdate"></a>

## getLeavingDate

> Note! This method has external [dependencies](date-dropdown.dependencies.md#getleavingdate)!

### Description
Returns leavingDate.
```ts
class DateDropdown {
  getLeavingDate(): Date | null {
    return this.leavingDate;
  }
}
```

### State parameter
Works with [`leavingDate`](date-dropdown.state.md#leavingdate).

### Valid parameters
Does not have any parameters

### Return value
Returns `new Date(leavingDate) | null`

### Usage example
```js
const leavingDate = dateDropdown.getLeavingDate();
```

[Back to the top](#top)


***
<a name="setleavingdate"></a>

## setLeavingDate

> Note! This method has external [dependencies](date-dropdown.dependencies.md#setleavingdate)!

### Description
Sets leavingDate.

```ts
class DateDropdown {
  setLeavingDate(date: Date | null) {
    this.leavingDate = date;
  }
}
```

### State parameter
Works with [`leavingDate`](date-dropdown.state.md#leavingdate).

### Valid parameters
`date` : `new Date() | null`

### Parameters validity check
None

### Return value
None

### Usage example
```js
dateDropdown.setLeavingDate(new Date('2020-10-10'));
```

### Should be added
1. Parameters check (date should not be lower then current date and arrivalDate)

[Back to the top](#top)


***
<a name="setleavingdatesubscriber"></a>

## setLeavingDateSubscriber

> Note! This method has external [dependencies](date-dropdown.dependencies.md#setleavingdatesubscriber)!

### Description
Sets leavingDate subscriber.
```ts
class DateDropdown {
  setLeavingDateSubscriber(subscriber: function) {
    this.leavingDateSubscriber = subscriber;
  }
}
```

### State parameter
Works with [`leavingDate`](date-dropdown.state.md#leavingdate).

### Valid parameters
subscriber should be a function
```ts
subscriber = function(leavingDate: Date | null) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```ts
const subscriber = function(leavingDate: Date | null) {
  console.log(leavingDate);
}

dateDropdown.setLeavingDateSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setLeavingDateSubscriber(() => {})`.
If you need to add few functions, use:
```ts
subscriber = function(leavingDate: Date | null) {
  function1(leavingDate);
  function2(leavingDate);
  function3(leavingDate);
}

dateDropdown.setLeavingDateSubscriber(subscriber);
```

[Back to the top](#top)
