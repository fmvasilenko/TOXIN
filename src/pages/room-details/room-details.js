import '../../scss/main.scss';
import RoomDetailsConnector from './RoomDetailsConnector';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

const classes = require('./room-details.classes.json');

const roomDetailsContainer = document.querySelector(`.js-${classes.roomDetails}`);
new RoomDetailsConnector(roomDetailsContainer);
