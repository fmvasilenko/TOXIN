<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`Dropdown`](dropdown.md)
[`Dropdown API`](dropdown.API.md)
[`Dropdown Dependences`](dropdown.dependences.md)

# Dropdown State

## Table of contents
1. [Description](#description)
2. [totalNumber](#totalnumber)


***

<a name="description"></a>

## Description
State contains 1 parameter:
1. [`totalNumber`](#totalnumber)

[Back to the top](#top)


***

<a name="totalnumber"></a>

## totalNumber

### Description
Contains total items number.

### User events reactions
totalNumber can be changed by changing items number in the options list

### Values
Possible values: `0 - unlimited`.

### Initial state
Initial state is calculated as sum of options numbers in options list.

### State dependences
None

### State dependents
None

### Public API methods
[`getTotalNumber`](dropdown.API.md#gettotalnumber)
[`setTotalNumberSubscriber`](dropdown.API.md#settotalnumbersubscriber)

[Back to the top](#top)
