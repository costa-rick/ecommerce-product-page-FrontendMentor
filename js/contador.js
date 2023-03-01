import ArgumentoInvalidoErro from './ArgumentoInvalidoErro.js'

export default class Contador {
	constructor(botaoIncremento, botaoDecremento, contador) {
		this.botaoIncrementoEl = document.querySelector(botaoIncremento)
		this.botaoDecrementoEl = document.querySelector(botaoDecremento)
		this.contadorEl = document.querySelector(contador)

		this.valorAtual = Number(this.contadorEl.innerText)

		this.incrementar = this.incrementar.bind(this)
		this.decrementar = this.decrementar.bind(this)
	}

	incrementar() {
		this.valorAtual++
		this.atribuirAoElemento(this.valorAtual)
	}

	decrementar() {
		if (this.valorAtual <= 1) {
			return
		}

		this.valorAtual--
		this.atribuirAoElemento(this.valorAtual)
	}

	atribuirAoElemento(valor) {
		this.contadorEl.innerText = valor
	}

	adicionarEventos() {
		this.botaoIncrementoEl.addEventListener('click', this.incrementar)
		this.botaoDecrementoEl.addEventListener('click', this.decrementar)
	}

	iniciar() {
		if (!this.botaoDecrementoEl || !this.botaoIncrementoEl || !this.contadorEl) {
			throw new ArgumentoInvalidoErro()
		}

		this.adicionarEventos()
	}
}
