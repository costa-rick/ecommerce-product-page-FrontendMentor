import MenuMobile from './menu-mobile.js'
import Contador from './contador.js'
import Slide from './slide.js'
import BotaoAdicionarProduto from './BotaoAdicionarProduto.js'
import CarrinhoModel from './CarrinhoModel.js'
import QuantidadeCarrinho from './QuantidadeCarrinho.js'
import ExibirCarrinho from './ExibirCarrinho.js'

const menuMobile = new MenuMobile('.menu-icone', '.navegacao-icone-fechar', '.navegacao')
menuMobile.iniciar()

const contador = new Contador('#incremento', '#decremento', '#contador')
contador.iniciar()

const slide = new Slide(
	'.galeria-container-imagens',
	'.galeria-botao-anterior',
	'.galeria-botao-proximo'
)
slide.iniciar()

const botaoAdicionar = new BotaoAdicionarProduto(
	'.botao-adicionar-carrinho',
	'.titulo-produto',
	'.preco',
	'#contador',
	'.imagem-produto',
	'.quantidade-carrinho'
)

botaoAdicionar.iniciar()

const carrinho = new CarrinhoModel()
const exibirQuantidade = new QuantidadeCarrinho('.quantidade-carrinho')
exibirQuantidade.exibirQuantidade(carrinho.quantidadeDeProdutosCarrinho())

const exibirCarrinho = new ExibirCarrinho(
	'.descricao-carrinho',
	'.carrinho',
	'.carrinho-lista-produtos',
	'.carrinho-vazio-texto'
)
exibirCarrinho.iniciar()
