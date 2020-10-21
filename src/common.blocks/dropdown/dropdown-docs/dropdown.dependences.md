<a name="top"></a>

[`Project documentation`](../../../../README.md#documentation)
[`Dropdown`](dropdown.md)
[`Dropdown API`](dropdown.API.md)
[`Dropdown State`](dropdown.state.md)

# Dropdown External Dependences

## Table of contents
1. [External dependences list](#dependenceslist)
2. [State dependences](#statedependences)
    1. [totalNumber](#totalnumber)
3. [Public API logic](#apilogic)
    1. [getTotalNumber](#gettotalnumber)
    2. [setTotalNumberSubscriber](#settotalnumbersubscriber)

<a name="dependenceslist"></a>


***
## External dependences List:
1. [DropdownOption](../../dropdown-option/dropdown-option-docs/dropdown-option.md)

### DropdownOption API in use
[`getState(): object`](../../dropdown-option/dropdown-option-docs/dropdown-option.API.md#getstate)  
[`setValue(value: number)`](../../dropdown-option/dropdown-option-docs/dropdown-option.API.md#setvalue)  
[`valueOnChangeFunction()`](../../dropdown-option/dropdown-option-docs/dropdown-option.API.md#valueonchangefunction)  
  
[Back to the top](#top)


***

<a name="statedependences"></a>

## State dependences

### 
[`totalNumber`](dropdown.state.md#totalnumber) change is initiated by [`DropdownOption`](../../dropdown-option/dropdown-option-docs/dropdown-option.md) and then calculated in [`Dropdown`](dropdown.md) and given to external subscriber.

```ts
class Dropdown {
  constructor() {
    this.options = [
      new DropdownOption(dropdownOptionContainer, this.onChangeFunction.bind(this)),
    ];
  }

  onChangeFunction() {
    this.totalNumber = this.calculateTotalNumber();
    this.totalNumberExternalSubscriber(this.totalNumber);
  }
}
```

[Back to the top](#top)


***

<a name="apilogic"></a>

## Public API logic

<a name="gettotalnumber"></a>

### getTotalNumber
[`dropdown.getTotalNumber`](dropdown.API.md#gettotalnumber) is connected to [`Dropdown`](dropdown.md) internal logic.
```ts
class DateDropdown {
  getTotalNumber(): number {
    return this.totalNumber;
  }
}
```

[Back to the top](#top)


<a name="settotalnumbersubscriber"></a>

### setTotalNumberSubscriber
[`dropdown.setTotalNumberSubscriber`](dropdown.API.md#settotalnumbersubscriber) is connected to [`Dropdown`](dropdown.md) internal logic.
```ts
class Dropdown {
  setTotalNumberSubscriber(subscriber: function) {
    this.totalNumberExternalSubscriber = subscriber;
  }
}
```

[Back to the top](#top)
