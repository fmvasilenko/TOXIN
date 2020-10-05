import '../../scss/main.scss';
import '../../common.blocks/like-button/LikeButton';
import LikeButton from '../../common.blocks/like-button/LikeButton';
import RateButton from '../../common.blocks/rate-button/RateButton';
import ExpandableCheckboxList from '../../common.blocks/expandable-checkbox-list/ExpandableCheckboxList';
import DropDown from '../../common.blocks/dropdown/Dropdown';
// import FormElementsController from './FormElementsController';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

// new FormElementsController();

const likeButtonContainer = document.querySelector('.form-elements__like-button');
console.log(new LikeButton(likeButtonContainer));

const rateButtonContainer = document.querySelector('.form-elements__rate-button');
console.log(new RateButton(rateButtonContainer));

const expandableChecboxList = document.querySelector('.form-elements__expandable-checkbox-list');
console.log(new ExpandableCheckboxList(expandableChecboxList));

const dropDown = document.querySelector('.form-elements__dropdown');
console.log(new DropDown(dropDown));
