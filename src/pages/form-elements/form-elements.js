import '../../scss/main.scss';
import LikeButton from '../../common.blocks/like-button/LikeButton';
import RateButton from '../../common.blocks/rate-button/RateButton';
import ExpandableCheckboxList from '../../common.blocks/expandable-checkbox-list/ExpandableCheckboxList';
import Dropdown from '../../common.blocks/dropdown/Dropdown';
import DateDropdown from '../../common.blocks/date-dropdown/DateDropdown';
import FilterDateDropdown from '../../common.blocks/filter-date-dropdown/FilterDateDropdown';
import RangeSlider from '../../common.blocks/range-slider/RangeSlider';
// import FormElementsController from './FormElementsController';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

// new FormElementsController();

const likeButtonContainer = document.querySelector('.form-elements__like-button');
const likeButton = new LikeButton(likeButtonContainer);
/*
likeButton.setLikesNumber(0);
likeButton.setIsLiked(true);
likeButton.setIsLiked(true);
likeButton.setIsLiked(true);
console.log(likeButton.getIsLiked());
console.log(likeButton.getLikesNumber());
likeButton.setLikesNumberSubscriber((likesNumber) => console.log(likesNumber));
likeButton.setIsLikedSubscriber((isLiked) => console.log(isLiked));
*/

/*
const rateButtonContainer = document.querySelector('.form-elements__rate-button');
console.log(new RateButton(rateButtonContainer));

const expandableChecboxList = document.querySelector('.form-elements__expandable-checkbox-list');
console.log(new ExpandableCheckboxList(expandableChecboxList));

const dropDown = document.querySelectorAll('.form-elements__dropdown');
dropDown.forEach((item) => {
  console.log(new Dropdown(item));
});
*/

const dateDropdownContainer = document.querySelector('.form-elements__date-dropdown');
const dateDropdown = new DateDropdown(dateDropdownContainer);
/*
dateDropdown.setArrivalDate(new Date('2020-10-10'));
dateDropdown.setLeavingDate(new Date('2020-10-20'));
console.log(dateDropdown.getArrivalDate());
console.log(dateDropdown.getLeavingDate());
dateDropdown.setArrivalDateSubscriber((date) => console.log(date));
dateDropdown.setLeavingDateSubscriber((date) => console.log(date));
*/

const filterDateDropdownContainer = document.querySelector('.form-elements__filter-date-dropdown');
const filterDateDropdown = new FilterDateDropdown(filterDateDropdownContainer);
/*
filterDateDropdown.setArrivalDate(new Date('2020-10-10'));
filterDateDropdown.setLeavingDate(new Date('2020-10-20'));
console.log(filterDateDropdown.getArrivalDate());
console.log(filterDateDropdown.getLeavingDate());
filterDateDropdown.setArrivalDateSubscriber((date) => console.log(date));
filterDateDropdown.setLeavingDateSubscriber((date) => console.log(date));
*/

const slider = document.querySelector('.form-elements__slider');
const rangeSlider = new RangeSlider(slider);
