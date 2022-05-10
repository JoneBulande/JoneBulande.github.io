import menuMobile from './modules/menumobile.js';
import initScrollSuave from './modules/scrollsuave.js';
import initAnimacaoScroll from './modules/animacao-scroll.js';
import HeaderAnimation from './modules/scrollChangeHPosition.js';


const headerAnimation = new HeaderAnimation('.container', 'header');
headerAnimation.init();

menuMobile();
initScrollSuave();
initAnimacaoScroll();

