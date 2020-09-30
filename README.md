# FSD - TOXIN
Test task for FSD.

## Table of contents
1. [Initialization](#initialization)
2. [Github pages](#githubPages)
3. [Architecture](#architecture)

<a name="initialization"></a>

## 1. Initialization
After downloading the project run
```
npm install
```

To build the project use
```
npm run build
```
To run development mode use
```
npm run dev
```

### Adding new modules to node_modules
Before installing new modules to `node_modules` - remove `@plugins, @frontend and @blocks` directories. 
Those are links for `js/plugins, js/frontend and common.blocks` 
and if you have them while running `npm install...` - you lose all the files in mentioned directories.  

After installing all needed modules run `npm run postinstall` to put the links back.

<a name="githubPages"></a>

## 2. Github pages
1. [Colors & Types](https://fmvasilenko.github.io/TOXIN/dist/colors)
2. [Form Elements](https://fmvasilenko.github.io/TOXIN/dist/form-elements)
3. [Cards](https://fmvasilenko.github.io/TOXIN/dist/cards)
4. [Headers & Footers](https://fmvasilenko.github.io/TOXIN/dist/headers)
5. [Landing page](https://fmvasilenko.github.io/TOXIN/dist/landing)
6. [Search room](https://fmvasilenko.github.io/TOXIN/dist/search-room)
7. [Room details](https://fmvasilenko.github.io/TOXIN/dist/room-details)
8. [Registration](https://fmvasilenko.github.io/TOXIN/dist/registration)
9. [Login](https://fmvasilenko.github.io/TOXIN/dist/login)

<a name="architecture"></a>

## 3. Architecture

### this.state
All js objects extend `Component` class.
The main idea behind it was to bind data between different modules.
To achieve it each instance of `Component` has `this.state` variable.
For example for `LikeButton` we have the following state:

```js
class LikeButton {
  state = {
    liked: {
      value: true,
      alias: "likeButtonPressed",
      isGlobal: true,
      subscribers: [
        this.someFunction.bind(this)
      ]
    }
  }
}
```
```js
class Feedback {
  state = {
    likeButtonPressed: {
      value: true,
      subscribers: [
        this.someOtherFunction
      ]
    }
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

> Basically `likeButton.liked` and `feedback.likedButtonPressed` are refering to the same object.
> And in case of any implementation `this.liked = true` or `this.likedButtonPressed = true` 
> both `someFunction` and `someOtherFunction` will be called.


### this.children
All children classes are supposed to be added to `this.children` to keep data binding.
Otherwise `states` won`t be connected.


### clickHandler()
`Component` also has events delegating.
Any component that does not have parent will add eventListener to itself. And depending on what part of it`s body was clicked - 
will delegate this event to children by calling their `clickHandler()`.


### this.closers
`this.closers` contains functions that will be called when click event happend out of the element.
