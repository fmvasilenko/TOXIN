import './scss/main.scss';

const blocksStyles = require.context('./common.blocks/', true, /\.scss/);
blocksStyles.keys().forEach(blocksStyles);

const pagesStyles = require.context('./pages/', true, /\.scss/);
pagesStyles.keys().forEach(pagesStyles);
