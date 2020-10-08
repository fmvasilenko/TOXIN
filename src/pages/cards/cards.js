import Calendar from '../../common.blocks/calendar/Calendar';
import Receipt from '../../common.blocks/receipt/Receipt';
import Suite from '../../common.blocks/suite/Suite';
import '../../scss/main.scss';
// import CardsController from './CardsController';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

// new CardsController();

const calendar = document.querySelector('.cards__calendar');
console.log(new Calendar(calendar));

const suite = document.querySelector('.cards__suite');
console.log(new Suite(suite));

const receiptContainer = document.querySelector('.cards__receipt');
const receipt = new Receipt(receiptContainer);
receipt.setTotalPriceSubscriber((value) => console.log(value));
