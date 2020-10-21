<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`FilterDateDropdown`](filter-date-dropdown.md)
[`FilterDateDropdown API`](filter-date-dropdown.API.md)
[`FilterDateDropdown Dependences`](filter-date-dropdown.dependences.md)

# FilterDateDropdown State

## Table of contents
1. [Description](#description)
2. [arrivalDate](#arrivaldate)
3. [leavingDate](#leavingDate)


***

<a name="description"></a>

## Description
State contains 2 parameter:
1. [`arrivalDate`](#arrivaldate)
2. [`leavingDate`](#leavingdate)

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
Initial state is taken from html arrivalDate hidden input or set to `null` if input is empty.

### State dependences
None

### State dependents
None

### Public API methods
[`getArrivalDate`](filter-date-dropdown.API.md#getarrivaldate)
[`setArrivalDate`](filter-date-dropdown.API.md#setarrivaldate)
[`setArrivalDateSubscriber`](filter-date-dropdown.API.md#setarrivaldatesubscriber)

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
Initial state is taken from html leavingDate hidden input or set to `null` if input is empty.

### State dependences
None

### State dependents
None

### Public API methods
[`getLeavingDate`](filter-date-dropdown.API.md#getleavingdate)
[`setLeavingDate`](filter-date-dropdown.API.md#setleavingdate)
[`setLeavingDateSubscriber`](filter-date-dropdown.API.md#setleavingdatesubscriber)

[Back to the top](#top)
