[`Project documentation`](../../../../README.md#documentation)

# DateDropdown

## Description
Module creates date dropdown

## Table of contents
1. [Interface](#interface)
2. [Public API](date-dropdown.API.md)
3. [State](date-dropdown.state.md)
4. [Dependencies](date-dropdown.dependencies.md)


***

<a name="interface"></a>

## Interface

```ts
interface Dropdown {
  constructor(container: HTMLElement)
  getArrivalDate(): Date | null
  setArrivalDate(date: Date | null)
  setArrivalDateSubscriber(subscriber: function)
  getLeavingDate(): Date | null
  setLeavingDate(date: Date | null)
  setLeavingDateSubscriber(subscriber: function)
}
```