///////////////////////////////////////////////
/////| ANIMAÇÃO AO SCROLL
///////////////////////////////////////////////
export default function initAnimacaoScroll() {
	
	const rights = document.querySelectorAll('[data-anime="right"]');
	
	const lefts = document.querySelectorAll('[data-anime="left"]');
	
	const ups = document.querySelectorAll('[data-anime="up"]');
	
	const windowMetade = window.innerHeight * 0.8;

	function animationScroll(){	

		rights.forEach((right)=>{
			const top = right.getBoundingClientRect().top;
			const isVisible = (top - windowMetade) < 0;
			if (isVisible) {
			right.classList.add("ativo");
			}else{
				right.classList.remove("ativo");
			}
		});
		
		lefts.forEach((left)=>{
			const top = left.getBoundingClientRect().top;
			const isVisible = (top - windowMetade) < 0;
			if (isVisible) {
				left.classList.add("ativo");
			}else{
				left.classList.remove("ativo");
			}
		});

		ups.forEach((up)=>{
			const top = up.getBoundingClientRect().top;
			const isVisible = (top - windowMetade) < 0;
			if (isVisible) {
				up.classList.add("ativo");
			}else{
				up.classList.remove("ativo");
			}
		});
	}
	window.addEventListener("scroll", animationScroll);
}
