import '../../scss/main.scss';
import LandingConnector from './LandingConnector';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

const classes = require('./landing.classes.json');

const landingContainer = document.querySelector(`.${classes.landing}`);
new LandingConnector(landingContainer);
