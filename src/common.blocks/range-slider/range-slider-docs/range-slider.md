[`Project documentation`](../../../../README.md#documentation)

# RangeSlider

## Description
Module creates range slider

## Table of contents
1. [Interface](#interface)
2. [Public API](range-slider.API.md)
3. [State](range-slider.state.md)
4. [Dependencies](range-slider.dependencies.md)


***

<a name="interface"></a>

## Interface

```ts
interface RangeSlider {
  constructor(container: HTMLElement)
  getFirstValue(): number
  setFirstValue(value: number)
  getSecondValue(): number
  setSecondValue(value: number)
  setChangesSubscriber(subscriber: function)
}
```
