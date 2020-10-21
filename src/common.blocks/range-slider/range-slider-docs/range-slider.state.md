<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`RangeSlider`](range-slider.md)
[`RangeSlider API`](range-slider.API.md)
[`RangeSlider Dependencies`](range-slider.dependencies.md)

# RangeSlider State

## Table of contents
1. [Description](#description)
2. [firstValue](#firstvalue)
3. [secondValue](#secondvalue)


***

<a name="description"></a>

## Description
State contains 2 parameter:
1. [`firstValue`](#firstvalue)
2. [`secondValue`](#secondvalue)

[Back to the top](#top)


***

<a name="firstvalue"></a>

## firstValue

### Description
Contains first value.

### User events reactions
firstValue can be changed by moving left handle on the slider

### Values
Possible values: `number`.
But it cannot be lower then minValue or higher then secondValue.

### Initial state
Initial state is always `5000`.

### State dependencies
`firstValue = someValue && firstValue > secondValue` --> `firstValue = secondValue` (inside plugin`s logic)

### State dependents
`secondValue = someValue && secondValue < firstValue` --> `secondValue = firstValue` (inside plugin`s logic)

### Public API methods
[`getFirstValue`](range-slider.API.md#getfirstvalue)
[`setFirstValue`](range-slider.API.md#setfirstvalue)
[`setChangesSubscriber`](range-slider.API.md#setchangessubscriber)

[Back to the top](#top)


***

<a name="secondValue"></a>

## secondValue

### Description
Contains second value.

### User events reactions
secondValue can be changed by moving right handle on the slider

### Values
Possible values: `number`.
But it cannot be higher then maxValue or lower then firstValue.

### Initial state
Initial state is always `10000`.

### State dependencies
`secondValue = someValue && secondValue < firstValue` --> `secondValue = firstValue` (inside plugin`s logic)

### State dependents
`firstValue = someValue && firstValue > secondValue` --> `firstValue = secondValue` (inside plugin`s logic)

### Public API methods
[`getSecondValue`](range-slider.API.md#getsecondvalue)
[`setSecondValue`](range-slider.API.md#setsecondvalue)
[`setChangesSubscriber`](range-slider.API.md#setchangessubscriber)

[Back to the top](#top)
