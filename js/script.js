import MenuMobile from './menu-mobile.js'
import Contador from './contador.js'

const menuMobile = new MenuMobile('.menu-icone', '.navegacao-icone-fechar', '.navegacao')
menuMobile.iniciar()

const contador = new Contador('#incremento', '#decremento', '#contador')
contador.iniciar()
