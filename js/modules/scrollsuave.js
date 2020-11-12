///////////////////////////////////////////////
/////| SCROLL SUAVE
///////////////////////////////////////////////

export default function initScrollSuave() {
	const links = document.querySelectorAll('[data-menu] a');
	
	function scrollSuave(event) {
		event.preventDefault();		
		const href = event.target.getAttribute('href')
		const section = document.querySelector(href);
		const menu = document.querySelector('[data-menu] ul');
		if(menu.classList.contains('ativo')) {
			menu.classList.add('ativo');
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
