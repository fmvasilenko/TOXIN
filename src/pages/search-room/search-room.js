import '../../scss/main.scss';
import SearchRoomConnector from './SearchRoomConnector';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

const classes = require('./search-room.classes.json');

const searchRoomContainer = document.querySelector(`.js-${classes.searchRoom}`);
new SearchRoomConnector(searchRoomContainer);
