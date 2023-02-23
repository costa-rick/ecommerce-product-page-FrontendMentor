export default class MenuMobile {
	constructor(botaoAbrir, botaoFechar, menu) {
		this.botaoAbrirEl = document.querySelector(botaoAbrir)
		this.menuEl = document.querySelector(menu)
		this.botaoFecharEl = document.querySelector(botaoFechar)
		this.classe = 'ativo'

		this.botaoAbrir_Click = this.botaoAbrir_Click.bind(this)
		this.botaoFechar_Click = this.botaoFechar_Click.bind(this)
		this.menu_Click = this.menu_Click.bind(this)
	}

	adicionarClasseAoElemento(alvo) {
		alvo.classList.add(this.classe)
	}

	removerClasseDoElemento(alvo) {
		alvo.classList.remove(this.classe)
	}

	adicionarEventos() {
		this.botaoAbrirEl.addEventListener('click', this.botaoAbrir_Click)
		this.botaoFecharEl.addEventListener('click', this.botaoFechar_Click)
		this.menuEl.addEventListener('click', this.menu_Click)
		this.menuEl.addEventListener('touch', this.menu_Click)
	}

	botaoAbrir_Click() {
		this.adicionarClasseAoElemento(this.menuEl)
	}

	botaoFechar_Click() {
		this.removerClasseDoElemento(this.menuEl)
	}

	menu_Click({ currentTarget, target }) {
		if (currentTarget === target) {
			this.removerClasseDoElemento(this.menuEl)
		}
	}

	iniciar() {
		if (!this.botaoAbrirEl || !this.botaoFecharEl || !this.menuEl) {
			throw new Error('Valores undefined não são aceitos, forneça argumentos válidos.')
		}
		this.adicionarEventos()
	}
}
