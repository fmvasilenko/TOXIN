<a name="top"></a>

# FSD - TOXIN
Test task for FSD.

## Table of contents
1. [Initialization](#initialization)
2. [Github pages](#githubPages)
3. [Documentation](#documentation)


***
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

[Back to the top](#top)


***
<a name="githubPages"></a>

## 2. Github pages
1. [Colors & Types](https://fmvasilenko.github.io/TOXIN/colors)
2. [Form Elements](https://fmvasilenko.github.io/TOXIN/form-elements)
3. [Cards](https://fmvasilenko.github.io/TOXIN/cards)
4. [Headers & Footers](https://fmvasilenko.github.io/TOXIN/headers)
5. [Landing page](https://fmvasilenko.github.io/TOXIN/landing)
6. [Search room](https://fmvasilenko.github.io/TOXIN/search-room)
7. [Room details](https://fmvasilenko.github.io/TOXIN/room-details)
8. [Registration](https://fmvasilenko.github.io/TOXIN/registration)
9. [Login](https://fmvasilenko.github.io/TOXIN/login)

[Back to the top](#top)


***
<a name="documentation"></a>

## 3. Documentation

## Blocks documentation
1. [Calendar](src/common.blocks/calendar/calendar-docs/calendar.md)
2. [DateDropdown](src/common.blocks/date-dropdown/date-dropdown-docs/date-dropdown.md)
3. [FilterDateDropdown](src/common.blocks/filter-date-dropdown/filter-date-dropdown-docs/filter-date-dropdown.md)
4. [LikeButton](src/common.blocks/like-button/like-button-docs/like-button.md)
5. [RateButton](src/common.blocks/rate-button/rate-button-docs/rate-button.md)

[Back to the top](#top)
