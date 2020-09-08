import { Builder } from 'xml2js';

export interface XMLBuilderInterface {
	pedido: {
		cliente: {
			nome: string;
			tipoPessoa: string;
			ie_rg?: string;
			fone: string;
			email: string;
		},
		itens: {
			item: {
				codigo: string;
				descricao: string;
				un: string;
				qtde: string;
				vlr_unit: string;
			}
		}
		parcelas: {
			parcela: {
				data: string;
				vlr: string;
				obs: string;
			}
		}
	}
}

export default class XML {
	private builder;

	constructor() {
	  this.builder = new Builder();
	}

	create(object: XMLBuilderInterface) {
	  return this.builder.buildObject(object);
	}
}
