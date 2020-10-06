import Calendar from '../../common.blocks/calendar/Calendar';
import '../../scss/main.scss';
// import CardsController from './CardsController';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

// new CardsController();

const calendar = document.querySelector('.cards__calendar');
console.log(new Calendar(calendar));
