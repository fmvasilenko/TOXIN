import '../../scss/main.scss';
import CardsConnector from './CardsConnector';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

const cardsContainer = document.querySelector('.cards');
new CardsConnector(cardsContainer);
