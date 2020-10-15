<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`DateDropdown`](date-dropdown.md)
[`DateDropdown API`](date-dropdown.API.md)
[`DateDropdown State`](date-dropdown.state.md)

# DateDropdown External Dependencies

## Table of contents
1. [External dependencies list](#dependencieslist)
2. [State dependencies](#statedependencies)
    1. [arrivalDate](#arrivaldate)
    2. [leavingDate](#leavingdate)
3. [Public API logic](#apilogic)
    1. [getArrivalDate](#getarrivaldate)
    2. [setArrivalDate](#setarrivaldate)
    3. [setArrivalDateSubscriber](#setarrivaldatesubscriber)
    4. [getLeavingDate](#getleavingdate)
    5. [setLeavingDate](#setleavingdate)
    6. [setLeavingDateSubscriber](#setleavingdatesubscriber)


<a name="dependencieslist"></a>

***
## External dependencies List:
1. [Calendar](../../calendar/calendar-docs/calendar.md)

### Calendar API in use
[`getArrivalDate(): Date | null`](../../calendar/calendar-docs/calendar.API.md#getarrivaldate)  
[`setArrivalDate(date: Date | null)`](../../calendar/calendar-docs/calendar.API.md#setarrivaldate)  
[`setArrivalDateSubscriber(subscriber: function)`](../../calendar/calendar-docs/calendar.API.md#setarrivaldatesubscriber)  
[`getLeavingDate(): Date | null`](../../calendar/calendar-docs/calendar.API.md#getleavingdate)  
[`setLeavingDate(date: Date | null)`](../../calendar/calendar-docs/calendar.API.md#setleavingdate)  
[`setLeavingDateSubscriber(subscriber: function)`](../../calendar/calendar-docs/calendar.API.md#setleavingdatesubscriber)  
[`setPickingDate(date: string)`](../../calendar/calendar-docs/calendar.API.md#setpickingdate)  
[`setSubmitSubscriber()`](../../calendar/calendar-docs/calendar.API.md#setsubmitsubscriber)  
  
[Back to the top](#top)


***

<a name="statedependencies"></a>

## State dependencies

### arrivalDate
[`arrivalDate`](date-dropdown.state.md#arrivaldate) change is initiated by [`Calendar`](../../calendar/calendar-docs/calendar.md) and then reflected by [`DateDropdown`](date-dropdown.md) and given to external subscriber.

```ts
class DateDropdown {
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
[`leavingDate`](date-dropdown.state.md#leavingdate) change is initiated by [`Calendar`](../../calendar/calendar-docs/calendar.md) and then reflected by [`DateDropdown`](date-dropdown.md) and given to external subscriber.

```ts
class DateDropdown {
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
[`dateDropdown.getArrivalDate`](date-dropdown.API.md#getarrivaldate) is connected to [`calendar.getArrivalDate`](../../calendar/calendar-docs/calendar.API.md#getarrivaldate)
```ts
class DateDropdown {
  getArrivalDate(): Date | null {
    return this.calendar.getArrivalDate();
  }
}
```

[Back to the top](#top)

<a name="setarrivaldate"></a>

### setArrivalDate
[`dateDropdown.setArrivalDate`](date-dropdown.API.md#setarrivaldate) is connected to [`calendar.setArrivalDate`](../../calendar/calendar-docs/calendar.API.md#setarrivaldate)
```ts
class DateDropdown {
  setArrivalDate(date: Date | null) {
    this.calendar.setArrivalDate(date);
  }
}
```

[Back to the top](#top)

<a name="setarrivaldatesubscriber"></a>

### setArrivalDateSubscriber
[`dateDropdown.setArrivalDateSubscriber`](date-dropdown.API.md#setarrivaldateSubscriber) is connected to [`dateDropdown`](date-dropdown.md) internal logic.
```ts
class DateDropdown {
  setArrivalDateSubscriber(subscriber: function) {
    this.arrivalDateExternalSubscriber = subscriber;
  }
}
```

[Back to the top](#top)

<a name="getleavingdate"></a>

### getLeavingDate
[`dateDropdown.getLeavingDate`](date-dropdown.API.md#getleavingdate) is connected to [`calendar.getLeavingDate`](../../calendar/calendar-docs/calendar.API.md#getleavingdate)
```ts
class DateDropdown {
  getLeavingDate(): Date | null {
    return this.calendar.getLeavingDate();
  }
}
```

[Back to the top](#top)

<a name="setleavingdate"></a>

### setLeavingDate
[`dateDropdown.setLeavingDate`](date-dropdown.API.md#setleavingdate) is connected to [`calendar.setLeavingDate`](../../calendar/calendar-docs/calendar.API.md#setleavingdate)
```ts
class DateDropdown {
  setLeavingDate(date: Date | null) {
    this.calendar.setLeavingDate(date);
  }
}
```

[Back to the top](#top)

<a name="setleavingdatesubscriber"></a>

### setLeavingDateSubscriber
[`dateDropdown.setLeavingDateSubscriber`](date-dropdown.API.md#setleavingdatesubscriber) is connected to [`dateDropdown`](date-dropdown.md) internal logic.
```ts
class DateDropdown {
  setLeavingDateSubscriber(subscriber: function) {
    this.leavingDateExternalSubscriber = subscriber;
  }
}
```

[Back to the top](#top)
