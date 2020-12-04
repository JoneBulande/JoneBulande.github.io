///////////////////////////////////////////////
/////| SCROLL SUAVE
///////////////////////////////////////////////
export default function initScrollSuave() {
	const links = document.querySelectorAll('[data-menu] a');
	
	function scrollSuave(event) {
		event.preventDefault();		
		
		const href = event.target.getAttribute('href')
		const section = document.querySelector(href);
		const menu = document.querySelector('[data-menu]');
		const btnMenu = document.querySelector('.btn-menu');
		
		if(menu.classList.contains('ativo')) {
			btnMenu.classList.remove('ativo');
			menu.classList.remove('ativo');
		}
		
		section.scrollIntoView({
			block:'start',
			behavior: 'smooth'
		});
	}

	links.forEach((link) => {
		link.addEventListener('click', scrollSuave)
	});

}
