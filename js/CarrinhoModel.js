export default class CarrinhoModel {
	constructor() {
		this.produtosChave = 'produtos'
		this.criarProdutosCarrinho()
	}

	adicionarProduto(produto) {
		const produtos = this.puxarProdutosLocalStorage()
		const indiceProduto = this.procurarIndiceProduto(produtos, produto)

		if (indiceProduto >= 0) {
			this.atualizarProduto(produtos, produtos[indiceProduto], produto)
		} else {
			this.adicionarProdutoAoCarrinho(produto)
		}
	}

	atualizarProduto(produtos, produtoCarrinho, produto) {
		this.adicionarQuantidadeAoProduto(produtoCarrinho, produto)
		this.atualizarTotalProduto(produtoCarrinho)

		this.atualizarCarrinho(produtos)
	}

	atualizarCarrinho(produtos) {
		localStorage.setItem(this.produtosChave, JSON.stringify(produtos))
	}

	adicionarProdutoAoCarrinho(produto) {
		const produtos = this.puxarProdutosLocalStorage()
		produtos.push(produto)
		localStorage.setItem(this.produtosChave, JSON.stringify(produtos))
	}

	removerProdutoDoCarrinho(produto) {
		const produtos = this.puxarProdutosLocalStorage()
		const indiceProduto = this.procurarIndiceProduto(produtos, produto)

		if (indiceProduto >= 0) {
			produtos.splice(indiceProduto, 1)
			this.atualizarCarrinho(produtos)
		}
	}

	puxarProdutosLocalStorage() {
		return JSON.parse(localStorage.getItem(this.produtosChave))
	}

	adicionarQuantidadeAoProduto(produtoCarrinho, produto) {
		produtoCarrinho.quantidade += produto.quantidade
	}

	atualizarTotalProduto(produto) {
		produto.total = Number((produto.quantidade * produto.preco).toFixed(2))
	}

	procurarIndiceProduto(produtos, produto) {
		const procurarProduto = (produtoCarrinho) => {
			return produtoCarrinho.titulo === produto.titulo
		}

		return produtos.findIndex(procurarProduto)
	}

	procurarProduto(produtos, produtoTitulo) {
		const procurarProduto = (produtoCarrinho) => {
			return produtoCarrinho.titulo === produtoTitulo
		}

		return produtos.find(procurarProduto) || undefined
	}

	quantidadeDeProdutosCarrinho() {
		const produtos = this.puxarProdutosLocalStorage()
		const quantidade = produtos.reduce((valorAnterior, { quantidade }) => {
			return quantidade + valorAnterior
		}, 0)
		return quantidade
	}

	criarProdutosCarrinho() {
		const produtos = this.puxarProdutosLocalStorage(this.produtosChave)

		if (!produtos) {
			localStorage.setItem(this.produtosChave, JSON.stringify([]))
		}
	}
}
