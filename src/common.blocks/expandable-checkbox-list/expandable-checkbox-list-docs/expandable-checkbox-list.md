[`Project documentation`](../../../../README.md#documentation)

# ExpandableCheckboxList

## Description
Module creates expandable checkbox list

## Table of contents
1. [Interface](#interface)
2. [Public API](expandable-checkbox-list.API.md)
3. [State](expandable-checkbox-list.state.md)
4. [Dependences](#dependences)


***

<a name="interface"></a>

## Interface

```ts
interface ExpandableCheckboxList {
  constructor(container: HTMLElement)
  getListExpanded(): boolean
  setListExpanded(value: boolean)
  setListExpandedSubscriber(subscriber: function)
}
```


***

<a name="dependences"></a>

## Dependences
Module does not have any external dependences
