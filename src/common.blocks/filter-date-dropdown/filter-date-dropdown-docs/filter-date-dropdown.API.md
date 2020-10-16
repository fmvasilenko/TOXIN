<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`FilterDateDropdown`](filter-date-dropdown.md)
[`FilterDateDropdown State`](filter-date-dropdown.state.md)
[`FilterDateDropdown Dependences`](filter-date-dropdown.dependences.md)

# FilterDateDropdown API

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
class FilterDateDropdown {
  constructor(container: HTMLElement) {

  }
}
```

### Valid parameters
container - HTMLElement, that contains structure for filter date dropdown. 
> If there are few filter date dropdown structures in the container - the first one will be chosen.

### Parameters validity check
None

### Usage example
```js
const filterDateDropdownContainer = document.querySelector('.filter-date-dropdown-container');
const filterDateDropdown = new FilterDateDropdown(FilterDateDropdownContainer);
```

[Back to the top](#top)


***
<a name="getarrivaldate"></a>

## getArrivalDate

> Note! This method has external [dependences](filter-date-dropdown.dependences.md#getarrivaldate)!

### Description
Returns arrivalDate.

```ts
class FilterDateDropdown {
  getArrivalDate(): Date | null {
    return this.arrivalDate;
  }
}
```

### State parameter
Works with [`arrivalDate`](filter-date-dropdown.state.md#arrivaldate).

### Valid parameters
Does not have any parameters

### Return value
Returns `new Date(arrivalDate) | null`

### Usage example
```js
const arrivalDate = filterDateDropdown.getArrivalDate();
```

[Back to the top](#top)


***
<a name="setarrivaldate"></a>

## setArrivalDate

> Note! This method has external [dependences](filter-date-dropdown.dependences.md#setarrivaldate)!

### Description
Sets arrivalDate.

```ts
class FilterDateDropdown {
  setArrivalDate(date: Date | null) {
    this.arrivalDate = date;
  }
}
```

### State parameter
Works with [`arrivalDate`](filter-date-dropdown.state.md#arrivaldate).

### Valid parameters
`date` : `new Date() | null`

### Parameters validity check
None

### Return value
None

### Usage example
```js
filterDateDropdown.setArrivalDate(new Date('2020-10-10'));
```

### Should be added
1. Parameters check (date should not be lower the current date or later then leavingDate)

[Back to the top](#top)


***
<a name="setarrivaldatesubscriber"></a>

## setArrivalDateSubscriber

> Note! This method has external [dependences](filter-date-dropdown.dependences.md#setarrivaldatesubscriber)!

### Description
Sets arrivalDate subscriber.

```ts
class FilterDateDropdown {
  setArrivalDateSubscriber(subscriber: function) {
    this.arrivalDateSubscriber = subscriber;
  }
}
```

### State parameter
Works with [`arrivalDate`](filter-date-dropdown.state.md#arrivaldate).

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

filterDateDropdown.setArrivalDateSubscriber(subscriber);
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

filterDateDropdown.setArrivalDateSubscriber(subscriber);
```

[Back to the top](#top)


***
<a name="getleavingdate"></a>

## getLeavingDate

> Note! This method has external [dependences](filter-date-dropdown.dependences.md#getleavingdate)!

### Description
Returns leavingDate.
```ts
class FilterDateDropdown {
  getLeavingDate(): Date | null {
    return this.leavingDate;
  }
}
```

### State parameter
Works with [`leavingDate`](filter-date-dropdown.state.md#leavingdate).

### Valid parameters
Does not have any parameters

### Return value
Returns `new Date(leavingDate) | null`

### Usage example
```js
const leavingDate = filterDateDropdown.getLeavingDate();
```

[Back to the top](#top)


***
<a name="setleavingdate"></a>

## setLeavingDate

> Note! This method has external [dependences](filter-date-dropdown.dependences.md#setleavingdate)!

### Description
Sets leavingDate.

```ts
class FilterDateDropdown {
  setLeavingDate(date: Date | null) {
    this.leavingDate = date;
  }
}
```

### State parameter
Works with [`leavingDate`](filter-date-dropdown.state.md#leavingdate).

### Valid parameters
`date` : `new Date() | null`

### Parameters validity check
None

### Return value
None

### Usage example
```js
filterDateDropdown.setLeavingDate(new Date('2020-10-10'));
```

### Should be added
1. Parameters check (date should not be lower then current date and arrivalDate)

[Back to the top](#top)


***
<a name="setleavingdatesubscriber"></a>

## setLeavingDateSubscriber

> Note! This method has external [dependences](filter-date-dropdown.dependences.md#setleavingdatesubscriber)!

### Description
Sets leavingDate subscriber.
```ts
class FilterDateDropdown {
  setLeavingDateSubscriber(subscriber: function) {
    this.leavingDateSubscriber = subscriber;
  }
}
```

### State parameter
Works with [`leavingDate`](filter-date-dropdown.state.md#leavingdate).

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

filterDateDropdown.setLeavingDateSubscriber(subscriber);
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

filterDateDropdown.setLeavingDateSubscriber(subscriber);
```

[Back to the top](#top)
