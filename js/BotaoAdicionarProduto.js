import CarrinhoModel from './CarrinhoModel.js'
import ArgumentoInvalidoErro from './ArgumentoInvalidoErro.js'
import QuantidadeCarrinho from './QuantidadeCarrinho.js'

export default class BotaoAdicionarProduto {
	constructor(botao, tituloProduto, precoProduto, quantidadeProduto, exibirQuantidade) {
		this.botaoEl = document.querySelector(botao)
		this.tituloProdutoEl = document.querySelector(tituloProduto)
		this.precoProdutoEl = document.querySelector(precoProduto)
		this.quantidadeProdutoEl = document.querySelector(quantidadeProduto)
		// this.imagemProdutoEl = document.querySelector(imagemProduto)

		this.exibirQuantidade = new QuantidadeCarrinho(exibirQuantidade)

		this.adicionarProdutoCarrinho_Click = this.adicionarProdutoCarrinho_Click.bind(this)
	}

	limparPrecoProduto(preco) {
		return Number(preco.replace(/[^\d+(\.)?\d+]/g, ''))
	}

	montarProduto() {
		const titulo = this.tituloProdutoEl.innerText
		const preco = this.limparPrecoProduto(this.precoProdutoEl.innerText)
		const quantidade = Number(this.quantidadeProdutoEl.innerText)
		const total = preco * quantidade

		return {
			titulo,
			preco,
			quantidade,
			total,
		}
	}

	adicionarEvento() {
		this.botaoEl.addEventListener('click', this.adicionarProdutoCarrinho_Click)
	}

	adicionarProdutoCarrinho_Click() {
		const produto = this.montarProduto()

		const carrinhoModel = new CarrinhoModel()
		carrinhoModel.adicionarProduto(produto)

		const quantidadeProdutosCarrinho = carrinhoModel.quantidadeDeProdutosCarrinho(produto)
		this.exibirQuantidade.exibirQuantidade(quantidadeProdutosCarrinho)
	}

	iniciar() {
		if (!this.botaoEl || !this.precoProdutoEl || !this.quantidadeProdutoEl || !this.tituloProdutoEl)
			throw new ArgumentoInvalidoErro()

		this.adicionarEvento()
	}
}
