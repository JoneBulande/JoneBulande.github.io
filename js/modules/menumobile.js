export default function initScrollMenu() {
      
    function handleMenu(event) {
        event.preventDefault();
        event.target.classList.toggle('ativo');
        const menu = document.querySelector('[data-menu]');
        menu.classList.toggle('ativo');
    }
    
    const btnMenu = document.querySelector('.btn-menu');
    btnMenu.addEventListener('click', handleMenu)
}

