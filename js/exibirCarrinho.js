import ArgumentoInvalidoErro from './ArgumentoInvalidoErro.js'

export default function exibirCarrinho(botaoCarrinho, carrinho) {
	const botaoCarrinhoEl = document.querySelector(botaoCarrinho)
	const carrinhoEl = document.querySelector(carrinho)

	function botaoCarrinho_Click() {
		carrinhoEl.classList.toggle('ativo')
	}

	if (!botaoCarrinhoEl) {
		throw new ArgumentoInvalidoErro()
	}

	botaoCarrinhoEl.addEventListener('click', botaoCarrinho_Click)
}
