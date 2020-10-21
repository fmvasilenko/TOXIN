<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`ExpandableCheckboxList`](expandable-checkbox-list.md)
[`ExpandableCheckboxList State`](expandable-checkbox-list.state.md)

# ExpandableCheckboxList API

## Table of contents
1. [constructor](#constructor)
2. [getListExpanded](#getlistexpanded)
3. [setListExpanded](#setlistexpanded)
4. [setListExpandedSubscriber](#setlistexpandedsubscriber)


***
<a name="constructor"></a>

## constructor

### Description
```ts
class ExpandableCheckboxList {
  constructor(container: HTMLElement) {

  }
}
```

### Valid parameters
container - HTMLElement, that contains structure for expandable checkbox list. 
> If there are few expandable checkbox list structures in the container - the first one will be chosen.

### Parameters validity check
None

### Usage example
```js
const expandableCheckboxListContainer = document.querySelector('.expandable-checkbox-list-container');
const expandableCheckboxList = new ExpandableCheckboxList(expandableCheckboxListContainer);
```

[Back to the top](#top)


***
<a name="getlistexpanded"></a>

## getListExpanded

### Description
Returns listExpanded.

```ts
class ExpandableCheckboxList {
  getListExpanded(): boolean {
    return this.listExpanded;
  }
}
```

### State parameter
Works with [`listExpanded`](expandable-checkbox-list.state.md#listexpanded).

### Valid parameters
Does not have any parameters

### Return value
Returns `true | false`

### Usage example
```js
const listExpanded = expandableCheckboxList.getListExpanded();
```

[Back to the top](#top)


***
<a name="setlistexpanded"></a>

## setListExpanded

### Description
Sets listExpanded.

```ts
class ExpandableCheckboxList {
  setListExpanded(value: boolean) {
    this.listExpanded = value;
  }
}
```

### State parameter
Works with [`listExpanded`](expandable-checkbox-list.state.md#listexpanded).

### Valid parameters
`value` : `true | false`

### Parameters validity check
None

### Return value
None

### Usage example
```js
expandableCheckboxList.setListExpanded(true;
```

[Back to the top](#top)


***
<a name="setlistexpandedsubscriber"></a>

## setListExpandedSubscriber

### Description
Sets listExpanded subscriber.

```ts
class ExpandableCheckboxList {
  setListExpandedSubscriber(subscriber: function) {
    this.listExpandedSubscriber = subscriber;
  }
}
```

### State parameter
Works with [`listExpanded`](expandable-checkbox-list.state.md#listexpanded).

### Valid parameters
subscriber should be a function
```ts
subscriber = function(listExpanded: boolean) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```ts
const subscriber = function(listExpanded: boolean) {
  console.log(listExpanded);
}

expandableCheckboxList.setListExpandedSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setListExpandedSubscriber(() => {})`.
If you need to add few functions, use:
```ts
subscriber = function(listExpanded: boolean) {
  function1(listExpanded);
  function2(listExpanded);
  function3(listExpanded);
}

expandableCheckboxList.setListExpandedSubscriber(subscriber);
```

[Back to the top](#top)
