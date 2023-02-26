import MenuMobile from './menu-mobile.js'
import Contador from './contador.js'
import Slide from './slide.js'

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
