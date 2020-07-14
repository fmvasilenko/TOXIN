# FSD - TOXIN
Test task for FSD.

## Table of contents
1. Initialization
2. Github pages
3. Architecture



## 1. Initialization
After downloading the project run
```
npm init
npm postinstall
```

`npm postinstall` is used to provide aliases for some pathes.
> Notice!
> `npm postinstall` adds `@plugins, @blocks and @frontend` directories to node_modules, that must be removed before running `npm install`. Otherwise it might lead to losing files from mentioned directories.



## 2. Github pages
1. [Colors & Types](https://fmvasilenko.github.io/TOXIN/dist/colors)
2. [Form Elements](https://fmvasilenko.github.io/TOXIN/dist/form-elements)
3. [Cards](https://fmvasilenko.github.io/TOXIN/dist/cards)
4. [Headers & Footers](https://fmvasilenko.github.io/TOXIN/dist/headers)
5. [Landing page](https://fmvasilenko.github.io/TOXIN/dist/landing)
6. [Search room](https://fmvasilenko.github.io/TOXIN/dist/searchroom)
7. [Room details](https://fmvasilenko.github.io/TOXIN/dist/room_details)
8. [Registration](https://fmvasilenko.github.io/TOXIN/dist/registration)
9. [Login](https://fmvasilenko.github.io/TOXIN/dist/login)



## 3. Architecture

### this.state
All js objects extend `Component` class.
The main idea behind it was to bind data between different modules.
To achieve it each instance of `Component` has `this.state` variable.
For example for `LikeButton` we have the following state:

```js
this.state = {
  liked: {
    value: true,
    alias: "likeButtonPressed",
    isGlobal: true,
    subscribers: [
      this.someFunction.bind(this)
    ]
  }
}
```

In this example `LikeButton` has one variable that it dependends on: `liked`. 
To interact with it use `this.liked`, not `this.state.liked`.

`alias` means what name will the parent class work with. In this case for `LikeButton` class it will be `this.liked` and for 
parent class - `this.likeButtonPressed`.

`isGlobal` means that this variable will copy the parents state, according with the name or alias.

`subscribers` will be run after any implementation:
```js
this.liked = true;
```

### this.children
All children classes are supposed to be added to `this.children` to keep data binding.


### clickHandler()
`Component` also has events delegating.
Any component that does not have parent will add eventListener to itself. And depending on what part of it`s body was clicked - 
will delegate this event to children by calling their `clickHandler()`.

### this.closers
`this.closers` contains functions that will be called when click event happend out of the element.

### P.S.
This architecture probably is not the best solution but any try to fix it would require changing all the classes that extend Component.js.
