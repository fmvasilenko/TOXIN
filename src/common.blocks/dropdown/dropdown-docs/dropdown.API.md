<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`Dropdown`](dropdown.md)
[`Dropdown State`](dropdown.state.md)
[`Dropdown Dependencies`](dropdown.dependencies.md)

# Dropdown API

## Table of contents
1. [constructor](#constructor)
2. [getTotalNumber](#gettotalnumber)
3. [setTotalNumberSubscriber](#settotalnumbersubscriber)


***
<a name="constructor"></a>

## constructor

### Description
```ts
class Dropdown {
  constructor(container: HTMLElement) {

  }
}
```

### Valid parameters
container - HTMLElement, that contains structure for dropdown. 
> If there are few dropdown structures in the container - the first one will be chosen.

### Parameters validity check
None

### Usage example
```js
const dropdownContainer = document.querySelector('.dropdown-container');
const dropdown = new Dropdown(DropdownContainer);
```

[Back to the top](#top)


***
<a name="gettotalnumber"></a>

## getTotalNumber

### Description
Returns totalNumber.

```ts
class Dropdown {
  getTotalNumber(): number {
    return this.totalNumber;
  }
}
```

### State parameter
Works with [`totalNumber`](dropdown.state.md#totalnumber).

### Valid parameters
Does not have any parameters

### Return value
Returns number `0 - unlimited`

### Usage example
```js
const totalNumber = dropdown.getTotalNumber();
```

[Back to the top](#top)


***
<a name="settotalnumbersubscriber"></a>

## setTotalNumberSubscriber

### Description
Sets totalNumber subscriber.

```ts
class Dropdown {
  setTotalNumberSubscriber(subscriber: function) {
    this.totalNumberSubscriber = subscriber;
  }
}
```

### State parameter
Works with [`totalNumber`](dropdown.state.md#totalnumber).

### Valid parameters
subscriber should be a function
```ts
subscriber = function(totalNumber: number) {
  //some code
}
```

### Parameters validity check
None

### Return value
None

### Usage example
```ts
const subscriber = function(totalNumber: number) {
  console.log(totalNumber);
}

dropdown.setTotalNumberSubscriber(subscriber);
```

### Notes
> Note! There can be only one subscriber! If you use the method twice, only the second subscriber will work.
So to remove subscriber you can use `setTotalNumberSubscriber(() => {})`.
If you need to add few functions, use:
```ts
subscriber = function(totalNumber: number) {
  function1(totalNumber);
  function2(totalNumber);
  function3(totalNumber);
}

dropdown.setTotalNumberSubscriber(subscriber);
```

[Back to the top](#top)
