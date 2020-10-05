import '../../scss/main.scss';
import '../../common.blocks/like-button/LikeButton';
import LikeButton from '../../common.blocks/like-button/LikeButton';
// import FormElementsController from './FormElementsController';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

// new FormElementsController();

const likeButtonContainer = document.querySelector('.form-elements__like-button');
console.log(new LikeButton(likeButtonContainer));
