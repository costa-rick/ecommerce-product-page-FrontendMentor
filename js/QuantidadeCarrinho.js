export default class QuantidadeCarrinho {
	constructor(elementoExibirQuantidade) {
		this.exibirQuantidadeEl = document.querySelector(elementoExibirQuantidade)
	}

	exibirQuantidade(quantidade) {
		if (this.exibirQuantidadeEl) {
			if (quantidade === 0) {
				this.exibirQuantidadeEl.style.display = 'none'
				return
			}

			this.exibirQuantidadeEl.innerText = quantidade
			this.exibirQuantidadeEl.style.display = 'block'
			return
		}

		throw new Error(`Elemento 'this.exibirQuantidadeEl' não existe.`)
	}
}
