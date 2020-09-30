import '../../scss/main.scss';
import CardsController from './CardsController';
import Calendar from '../../common.blocks/calendar-exp/Calendar';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

// eslint-disable-next-line no-unused-vars
const cards = new CardsController();

const calendarContainer = document.querySelector('.cards__calendar');
const calendar = new Calendar(calendarContainer);
