import Sidebar from '../../common.blocks/sidebar/Sidebar';
import '../../scss/main.scss';
// import SearchRoomController from './SearchRoomController';

const blocksStyles = require.context('../../common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('../', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);

// new SearchRoomController();

const sidebarContainer = document.querySelector('.sidebar-wrapper');
console.log(new Sidebar(sidebarContainer));
