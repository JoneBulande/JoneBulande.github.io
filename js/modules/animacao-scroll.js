///////////////////////////////////////////////
/////| ANIMAÇÃO AO SCROLL
///////////////////////////////////////////////
export default function initAnimacaoScroll() {
	
	const downs = document.querySelectorAll('[data-anime="right"]');
	const windowMetade = window.innerHeight * 0.8;

	function animationScroll(){	

		downs.forEach((down)=>{
			const top = down.getBoundingClientRect().top;
			const isVisible = (top - windowMetade) < 0;
			if (isVisible) {
				down.classList.add("ativo");
			}else{
				down.classList.remove("ativo");
			}
		});
	}
	window.addEventListener("scroll", animationScroll);
}
