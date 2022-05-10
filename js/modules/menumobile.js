export default function menuMobile() {
    const btnMenu = document.querySelector('.btn-menu');

    function handleMenu(event) {
        event.preventDefault();
        event.target.classList.toggle('ativo');
        const menu = document.querySelector('[data-menu]');
        menu.classList.toggle('ativo');
    }
    btnMenu.addEventListener('click', handleMenu)
}
