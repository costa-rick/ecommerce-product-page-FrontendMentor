import ArgumentoInvalidoErro from './ArgumentoInvalidoErro.js'
import CarrinhoModel from './CarrinhoModel.js'
import QuantidadeCarrinho from './QuantidadeCarrinho.js'

export default class ExibirCarrinho {
	constructor(botaoCarrinho, carrinho, listaProdutos, carrinhoVazio, botaoCheckout) {
		this.botaoCarrinhoEl = document.querySelector(botaoCarrinho)
		this.carrinhoEl = document.querySelector(carrinho)
		this.listaProdutosEl = document.querySelector(listaProdutos)
		this.carrinhoVazioEl = document.querySelector(carrinhoVazio)
		this.botaoCheckoutEl = document.querySelector(botaoCheckout)

		this.carrinhoModel = new CarrinhoModel()
		this.carrinho = this.carrinhoModel.puxarProdutosLocalStorage()
		this.classeMostrar = 'mostrar'
		this.classeAtivo = 'ativo'

		this.botaoCarrinho_Click = this.botaoCarrinho_Click.bind(this)
		this.removerProdutoDoCarrinho_Click = this.removerProdutoDoCarrinho_Click.bind(this)
		this.clickForaDoCarrinho_Click = this.clickForaDoCarrinho_Click.bind(this)
	}

	autalizarCarrinho() {
		this.carrinho = this.carrinhoModel.puxarProdutosLocalStorage()
	}

	botaoCarrinho_Click() {
		this.carrinhoEl.classList.toggle(this.classeAtivo)
		this.atualizarExibicaoCarrinhoVazio()

		if (this.carrinho.length > 0) {
			this.adicionarTemplateProdutoALista(this.carrinho)

			const botoes = this.pegarListaDeBotoes(this.listaProdutosEl, '.botao-remover-item')
			this.adicionarEventoRemoverProdutoCarrinho(botoes)
		}
	}

	atualizarExibicaoCarrinhoVazio() {
		this.autalizarCarrinho()

		if (this.carrinho.length === 0) {
			this.carrinhoVazioEl.classList.add(this.classeMostrar)
			this.botaoCheckoutEl.classList.remove(this.classeMostrar)
			return
		}

		this.carrinhoVazioEl.classList.remove(this.classeMostrar)
		this.botaoCheckoutEl.classList.add(this.classeMostrar)
	}

	adicionarTemplateProdutoALista(produtos) {
		this.listaProdutosEl.innerHTML = ''

		const gerarTemplateProdutoEAdicionarALista = (produto) => {
			const templateProduto = this.gerarTemplateProduto(produto)
			this.listaProdutosEl.innerHTML += templateProduto
		}

		produtos.forEach(gerarTemplateProdutoEAdicionarALista)
	}

	adicionarEventoRemoverProdutoCarrinho(listaDeBotoes) {
		const adicionarEvento = (botao) => {
			botao.removeEventListener('click', this.removerProdutoDoCarrinho_Click)
			botao.addEventListener('click', this.removerProdutoDoCarrinho_Click)
		}

		listaDeBotoes.forEach(adicionarEvento)
	}

	pegarListaDeBotoes(elemento, classeDosBotoes) {
		return Array.from(elemento.querySelectorAll(classeDosBotoes))
	}

	removerProdutoDoCarrinho_Click({ currentTarget }) {
		const produto = currentTarget.parentElement
		const tituloProduto = produto.querySelector('.item-titulo').innerText
		const produtos = this.carrinhoModel.puxarProdutosLocalStorage()

		const produtoCarrinho = this.carrinhoModel.procurarProduto(produtos, tituloProduto)

		if (produtoCarrinho) {
			this.carrinhoModel.removerProdutoDoCarrinho(produtoCarrinho)
		}

		produto.remove()
		const exibirQuantidade = new QuantidadeCarrinho('.quantidade-carrinho')
		exibirQuantidade.exibirQuantidade(this.carrinhoModel.quantidadeDeProdutosCarrinho())
		this.atualizarExibicaoCarrinhoVazio()
	}

	clickForaDoCarrinho_Click(event = new PointerEvent()) {
		const medidas = this.carrinhoEl.getBoundingClientRect()
		const distanciaDoTopo = medidas.top
		const areaCarrinhoEl = medidas.top + medidas.height

		const { clientY } = event

		if (clientY > areaCarrinhoEl || clientY < distanciaDoTopo) {
			this.carrinhoEl.classList.remove(this.classeAtivo)
		}
	}

	gerarTemplateProduto(produto) {
		return `<li class="carrinho-lista-item">
                    <img
                        src="${produto.imagem}"
                        alt="par de tênis"
                    />
                    <div class="item-descricao">
                        <h3 class="item-titulo">${produto.titulo}</h3>
                        <span class="item-preco">$${produto.preco.toFixed(2)}</span>
                        <span>x</span>
                        <span class="item-quantidade">${produto.quantidade}</span>
                        <span class="item-total">$${produto.total.toFixed(2)}</span>
                    </div>
                    <button class="botao-remover-item">
                        <img src="./images/icon-delete.svg" alt="" />
                    </button>
                </li>`
	}

	iniciar() {
		if (
			!this.botaoCarrinhoEl ||
			!this.carrinhoEl ||
			!this.listaProdutosEl ||
			!this.carrinhoVazioEl ||
			!this.botaoCarrinhoEl
		) {
			throw new ArgumentoInvalidoErro()
		}

		this.botaoCarrinhoEl.addEventListener('click', this.botaoCarrinho_Click)
		document.addEventListener('click', this.clickForaDoCarrinho_Click)
	}
}
