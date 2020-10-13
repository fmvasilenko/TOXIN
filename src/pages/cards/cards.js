import Calendar from '../../common.blocks/calendar/Calendar';
import Receipt from '../../common.blocks/receipt/Receipt';
import SearchForm from '../../common.blocks/search-form/SearchForm';
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

const searchFormContainer = document.querySelector('.cards__search-form');
const searchForm = new SearchForm(searchFormContainer);
/*
searchForm.setArrivalDate(new Date('2020-10-20'));
searchForm.setLeavingDate(new Date('2020-10-30'));
console.log(searchForm.getArrivalDate());
console.log(searchForm.getLeavingDate());
searchForm.setArrivalDateSubscriber((date) => console.log(date));
searchForm.setLeavingDateSubscriber((date) => console.log(date));
console.log(searchForm.getTotalGuestsNumber());
searchForm.setTotalGuestsNumberSubscriber((value) => console.log(value));
*/
