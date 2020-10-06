import '../../scss/main.scss';
import LikeButton from '../../common.blocks/like-button/LikeButton';
import RateButton from '../../common.blocks/rate-button/RateButton';
import ExpandableCheckboxList from '../../common.blocks/expandable-checkbox-list/ExpandableCheckboxList';
import Dropdown from '../../common.blocks/dropdown/Dropdown';
import DateDropdown from '../../common.blocks/date-dropdown/DateDropdown';
// import FormElementsController from './FormElementsController';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

// new FormElementsController();

/*
const likeButtonContainer = document.querySelector('.form-elements__like-button');
console.log(new LikeButton(likeButtonContainer));

const rateButtonContainer = document.querySelector('.form-elements__rate-button');
console.log(new RateButton(rateButtonContainer));

const expandableChecboxList = document.querySelector('.form-elements__expandable-checkbox-list');
console.log(new ExpandableCheckboxList(expandableChecboxList));

const dropDown = document.querySelectorAll('.form-elements__dropdown');
dropDown.forEach((item) => {
  console.log(new Dropdown(item));
});
*/

const dateDropdown = document.querySelector('.form-elements__date-dropdown');
console.log(new DateDropdown(dateDropdown));
