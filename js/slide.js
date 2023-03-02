import ArgumentoInvalidoErro from './ArgumentoInvalidoErro.js'

export default class Slide {
	constructor(galeria, botaoAnterior, botaoProximo) {
		this.galeriaEl = document.querySelector(galeria)
		this.botaoAnteriorEl = document.querySelector(botaoAnterior)
		this.botaoProximoEl = document.querySelector(botaoProximo)

		this.totalItens = this.galeriaEl.children.length
		this.estadoSlide = 0
		this.movimentado = 0
		this.distancia = Number(this.galeriaEl.clientWidth)
		this.imagens = Array.from(this.galeriaEl.children)

		this.botaoAnterior_Click = this.botaoAnterior_Click.bind(this)
		this.botaoProximo_Click = this.botaoProximo_Click.bind(this)
		this.recalcularDistancia_WindowResize = this.recalcularDistancia_WindowResize.bind(this)

		this.esconderBotao()
	}

	mover(negativo) {
		if (negativo) {
			this.movimentado -= this.distancia
		} else {
			this.movimentado += this.distancia
		}

		this.transformar(this.movimentado)
	}

	transformar(distancia) {
		this.galeriaEl.style.transform = `translateX(-${distancia}px)`
	}

	botaoAnterior_Click() {
		if (this.estadoSlide - 1 < 0) {
			return
		}

		this.mover(true)
		this.estadoSlide -= 1
		this.esconderBotao()
	}

	botaoProximo_Click() {
		if (this.estadoSlide + 1 >= this.totalItens) {
			return
		}

		this.mover()
		this.estadoSlide += 1
		this.esconderBotao()
	}

	esconderBotao() {
		if (this.estadoSlide === 0) {
			this.botaoAnteriorEl.style.display = 'none'
		} else {
			this.botaoAnteriorEl.style.display = 'block'
		}

		if (this.estadoSlide === this.totalItens - 1) {
			this.botaoProximoEl.style.display = 'none'
		} else {
			this.botaoProximoEl.style.display = 'block'
		}
	}

	adicionarEventos() {
		this.botaoAnteriorEl.addEventListener('click', this.botaoAnterior_Click)
		this.botaoProximoEl.addEventListener('click', this.botaoProximo_Click)
		window.addEventListener('resize', this.recalcularDistancia_WindowResize)
	}

	recalcularDistancia_WindowResize() {
		this.distancia = Number(this.galeriaEl.clientWidth)
		this.atualizarImagemAtual()
	}

	atualizarImagemAtual() {
		const distancia = this.imagens[this.estadoSlide].offsetLeft
		this.movimentado = distancia
		this.transformar(this.movimentado)
	}

	iniciar() {
		if (!this.botaoAnteriorEl || !this.galeriaEl || !this.botaoProximoEl) {
			throw new ArgumentoInvalidoErro()
		}

		this.adicionarEventos()
	}
}
