<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`FilterDateDropdown`](date-dropdown.md)
[`FilterDateDropdown API`](date-dropdown.API.md)
[`FilterDateDropdown State`](date-dropdown.state.md)

# FilterDateDropdown External Dependences

## Table of contents
1. [External dependences list](#dependenceslist)
2. [State dependences](#statedependences)
    1. [arrivalDate](#arrivaldate)
    2. [leavingDate](#leavingdate)
3. [Public API logic](#apilogic)
    1. [getArrivalDate](#getarrivaldate)
    2. [setArrivalDate](#setarrivaldate)
    3. [setArrivalDateSubscriber](#setarrivaldatesubscriber)
    4. [getLeavingDate](#getleavingdate)
    5. [setLeavingDate](#setleavingdate)
    6. [setLeavingDateSubscriber](#setleavingdatesubscriber)


<a name="dependenceslist"></a>

***
## External dependences List:
1. [Calendar](../../calendar/calendar-docs/calendar.md)

### Calendar API in use
[`getArrivalDate(): Date | null`](../../calendar/calendar-docs/calendar.API.md#getarrivaldate)  
[`setArrivalDate(date: Date | null)`](../../calendar/calendar-docs/calendar.API.md#setarrivaldate)  
[`setArrivalDateSubscriber(subscriber: function)`](../../calendar/calendar-docs/calendar.API.md#setarrivaldatesubscriber)  
[`getLeavingDate(): Date | null`](../../calendar/calendar-docs/calendar.API.md#getleavingdate)  
[`setLeavingDate(date: Date | null)`](../../calendar/calendar-docs/calendar.API.md#setleavingdate)  
[`setLeavingDateSubscriber(subscriber: function)`](../../calendar/calendar-docs/calendar.API.md#setleavingdatesubscriber)  
[`setSubmitSubscriber()`](../../calendar/calendar-docs/calendar.API.md#setsubmitsubscriber)  
  
[Back to the top](#top)


***

<a name="statedependences"></a>

## State dependences

### arrivalDate
[`arrivalDate`](date-dropdown.state.md#arrivaldate) change is initiated by [`Calendar`](../../calendar/calendar-docs/calendar.md) and then reflected by [`FilterDateDropdown`](date-dropdown.md) and given to external subscriber.

```ts
class FilterDateDropdown {
  constructor() {
    this.calendar.setArrivalDateSubscriber(this.arrivalDateSubscriber.bind(this));
  }

  arrivalDateSubscriber(date: Date | null) {
    this.arrivalDate = date;
    this.arrivalDateExternalSubscriber(date);
  }
}
```

[Back to the top](#top)


### leavingDate
[`leavingDate`](date-dropdown.state.md#leavingdate) change is initiated by [`Calendar`](../../calendar/calendar-docs/calendar.md) and then reflected by [`FilterDateDropdown`](date-dropdown.md) and given to external subscriber.

```ts
class FilterDateDropdown {
  constructor() {
    this.calendar.setLeavingDateSubscriber(this.leavingDateSubscriber.bind(this));
  }

  leavingDateSubscriber(date: Date | null) {
    this.leavingDate = date;
    this.leavingDateExternalSubscriber(date);
  }
}
```

[Back to the top](#top)



***

<a name="apilogic"></a>

## Public API logic

<a name="getarrivaldate"></a>

### getArrivalDate
[`filterDateDropdown.getArrivalDate`](date-dropdown.API.md#getarrivaldate) is connected to [`FilterDateDropdown`](date-dropdown.md) internal logic.
```ts
class FilterDateDropdown {
  getArrivalDate(): Date | null {
    return this.arrivalDate;
  }
}
```

[Back to the top](#top)

<a name="setarrivaldate"></a>

### setArrivalDate
[`filterDateDropdown.setArrivalDate`](date-dropdown.API.md#setarrivaldate) is connected to [`calendar.setArrivalDate`](../../calendar/calendar-docs/calendar.API.md#setarrivaldate)
```ts
class FilterDateDropdown {
  setArrivalDate(date: Date | null) {
    this.calendar.setArrivalDate(date);
  }
}
```

[Back to the top](#top)

<a name="setarrivaldatesubscriber"></a>

### setArrivalDateSubscriber
[`filterDateDropdown.setArrivalDateSubscriber`](date-dropdown.API.md#setarrivaldateSubscriber) is connected to [`FilterDateDropdown`](date-dropdown.md) internal logic.
```ts
class FilterDateDropdown {
  setArrivalDateSubscriber(subscriber: function) {
    this.arrivalDateExternalSubscriber = subscriber;
  }
}
```

[Back to the top](#top)

<a name="getleavingdate"></a>

### getLeavingDate
[`filterDateDropdown.getLeavingDate`](date-dropdown.API.md#getleavingdate) is connected to [`FilterDateDropdown`](date-dropdown.md) internal logic.
```ts
class FilterDateDropdown {
  getLeavingDate(): Date | null {
    return this.leavingDate;
  }
}
```

[Back to the top](#top)

<a name="setleavingdate"></a>

### setLeavingDate
[`filterDateDropdown.setLeavingDate`](date-dropdown.API.md#setleavingdate) is connected to [`calendar.setLeavingDate`](../../calendar/calendar-docs/calendar.API.md#setleavingdate)
```ts
class FilterDateDropdown {
  setLeavingDate(date: Date | null) {
    this.calendar.setLeavingDate(date);
  }
}
```

[Back to the top](#top)

<a name="setleavingdatesubscriber"></a>

### setLeavingDateSubscriber
[`filterDateDropdown.setLeavingDateSubscriber`](date-dropdown.API.md#setleavingdatesubscriber) is connected to [`FilterDateDropdown`](date-dropdown.md) internal logic.
```ts
class FilterDateDropdown {
  setLeavingDateSubscriber(subscriber: function) {
    this.leavingDateExternalSubscriber = subscriber;
  }
}
```

[Back to the top](#top)
