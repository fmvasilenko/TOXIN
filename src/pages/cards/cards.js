import '../../scss/main.scss';
import CardsController from './CardsController';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

// eslint-disable-next-line no-unused-vars
const cards = new CardsController();
