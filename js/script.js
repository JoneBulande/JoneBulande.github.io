import initScrollSuave from './modules/scrollsuave.js';
import initScrollMenu from './modules/menumobile.js';

initScrollMenu()
initScrollSuave();

/*
const links = document.querySelectorAll('[data-menu] a');
links[0].classList.add('sublinhado')
links.forEach((link) => {
	link.addEventListener('click', addBorder)
})

function addBorder(event) {
	event.preventDefault();
	const link = event.target;
	links.forEach((link) => {
		link.classList.remove('sublinhado')
	})
	link.classList.add('sublinhado')
}

///////////////////////////////////////////////////////////////////
*/