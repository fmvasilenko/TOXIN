<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`Calendar`](calendar.md)
[`Calendar API`](calendar.API.md)

# Calendar State

## Table of contents
1. [Description](#description)
2. [arrivalDate](#arrivaldate)
3. [leavingDate](#leavingDate)
4. [datePicking](#datepicking)


***

<a name="description"></a>

## Description
State contains 3 parameter:
1. [`arrivalDate`](#arrivaldate)
2. [`leavingDate`](#leavingdate)
3. [`datePicking`](#datepicking)

[Back to the top](#top)


***

<a name="arrivaldate"></a>

## arrivalDate

### Description
Contains arrival date.

### User events reactions
arrivalDate can be changed by pickicng it on the calendar or by pressing clear button.

### Values
Possible values: `new Date(someDate) | null`.

### Initial state
Initial state is always `null`.

### State dependencies
None

### State dependents
When `arrivalDate` is changed --> `datePicking = ''`

### Public API methods
[`getArrivalDate`](calendar.API.md#getarrivaldate)
[`setArrivalDate`](calendar.API.md#setarrivaldate)
[`setArrivalDateSubscriber`](calendar.API.md#setarrivaldatesubscriber)

[Back to the top](#top)


***

<a name="leavingdate"></a>

## leavingDate

### Description
Contains leaving date.

### User events reactions
leavingDate can be changed by pickicng it on the calendar or by pressing clear button.

### Values
Possible values: `new Date(someDate) | null`.

### Initial state
Initial state is always `null`.

### State dependencies
None

### State dependents
When `leavingDate` is changed --> `datePicking = ''`

### Public API methods
[`getLeavingDate`](calendar.API.md#getleavingdate)
[`setLeavingDate`](calendar.API.md#setleavingdate)
[`setLeavingDateSubscriber`](calendar.API.md#setleavingdatesubscriber)

[Back to the top](#top)


***

<a name="datepicking"></a>

## datePicking

### Description
Contains date, that is currently being picked.

### User events reactions
None

### Values
Possible values: `'' | 'arrivalDate' | 'leavingDate'`.

### Initial state
Initial state is always `''`.

### State dependencies
When `arrivalDate` is changed --> `datePicking = ''`.
When `leavingDate` is changed --> `datePicking = ''`.

### State dependents
None

### Public API methods
[`setPickingDate`](calendar.API.md#setpickingdate)

[Back to the top](#top)
