export default class headerAnimation {
  constructor(hero, cabecalho) {
    this.hero = document.querySelector(hero);
    this.cabecalho = document.querySelector(cabecalho);
  }

  mostrar() {
    if (this.hero.getBoundingClientRect().top < 0) {
      this.hero.classList.add('ativo');
      this.cabecalho.classList.add('ativo');
    } else {
      this.hero.classList.remove('ativo');
      this.cabecalho.classList.remove('ativo');
    }
    console.log('nice');
  }
  init() {
    window.addEventListener('scroll', () => {
      console.log('nice');
      this.mostrar();
    });
  }
}
