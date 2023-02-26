const mensagemPadrao = 'Valores undefined não são aceitos, forneça argumentos válidos.'

export default class ArgumentoInvalidoErro extends Error {
	constructor(message) {
		super(message || mensagemPadrao)
		this.name = 'ArgumentoInvalidoErro'
	}
}
