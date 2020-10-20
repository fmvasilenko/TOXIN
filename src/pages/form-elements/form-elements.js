import '../../scss/main.scss';
import FormElementsConnector from './FormElementsConnector';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

const classes = require('./form-elements.classes.json');

const formElementsContainer = document.querySelector(`.${classes.formElements}`);
new FormElementsConnector(formElementsContainer);
