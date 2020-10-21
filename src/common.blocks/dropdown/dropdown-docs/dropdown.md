[`Project documentation`](../../../../README.md#documentation)

# Dropdown

## Description
Module creates dropdown

## Table of contents
1. [Interface](#interface)
2. [Public API](dropdown.API.md)
3. [State](dropdown.state.md)
4. [Dependences](dropdown.dependences.md)


***

<a name="interface"></a>

## Interface

```ts
interface Dropdown {
  constructor(container: HTMLElement)
  getTotalNumber(): number
  setTotalNumberSubscriber(subscriber: function)
}
```