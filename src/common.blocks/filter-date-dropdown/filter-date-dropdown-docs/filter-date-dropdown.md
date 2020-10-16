[`Project documentation`](../../../../README.md#documentation)

# FilterDateDropdown

## Description
Module creates filter date dropdown

## Table of contents
1. [Interface](#interface)
2. [Public API](filter-date-dropdown.API.md)
3. [State](filter-date-dropdown.state.md)
4. [Dependences](filter-date-dropdown.dependences.md)


***

<a name="interface"></a>

## Interface

```ts
interface FilterDateDropdown {
  constructor(container: HTMLElement)
  getArrivalDate(): Date | null
  setArrivalDate(date: Date | null)
  setArrivalDateSubscriber(subscriber: function)
  getLeavingDate(): Date | null
  setLeavingDate(date: Date | null)
  setLeavingDateSubscriber(subscriber: function)
}
```