export default function initScrollMenu() {
      
    function handleMenu(event) {
        event.preventDefault();
        const menu = document.querySelector('[data-menu] ul');
        menu.classList.toggle('ativo')
    }
    
    const btnMenu = document.querySelector('[data-menu] .btn-menu');
    btnMenu.addEventListener('click', handleMenu)
}

