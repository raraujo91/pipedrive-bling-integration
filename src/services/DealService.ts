import difference from 'lodash/difference';
import convertDate from '../utils/convertDate';

import PipedriveAPI, { PipedriveStatusInterface } from '../config/api/PipedriveAPI';

import XML2JS from '../config/xml/XML2JS';

import DealSchema from '../models/DealsSchema';

export default class DealService {
	private service = new PipedriveAPI({
	  apiKey: process.env.PIPEDRIVE_API_KEY,
	  domain: process.env.PIPEDRIVE_DOMAIN,
	});

	private xml = new XML2JS();

	async run({ status, limit }: PipedriveStatusInterface) {
	  try {
	    const response = await this.service.getDealsWithStatus({
	      status,
	      limit,
	    });

	    const { data: deals } = await response;

	    // await DealSchema.deleteMany({});

	    const dealsIds = deals.map((deal) => String(deal.id));

	    const existentDeals = await DealSchema.find();

	    const databaseIds = existentDeals.map((doc) => doc.dealId);

	    const notSyncDatabases = difference(dealsIds, databaseIds);

	    const dealsToAdd = deals.map((deal) => {
	      if (notSyncDatabases.includes(String(deal.id))) {
	        const xml = this.xml.create({
	          pedido: {
	            cliente: {
	              nome: deal.org_id.name,
	              tipoPessoa: 'J',
	              email: deal.person_id.email[0].value || 'sem@email.com',
	              fone: deal.person_id.phone[0].value || '11999999999',
	            },
	            itens: {
	              item: {
	                codigo: String(Date.parse(deal.won_time)),
	                descricao: deal.title,
	                qtde: '1',
	                un: '1',
	                vlr_unit: deal.value,
	              },
	            },
	            parcelas: {
	              parcela: {
	                data: convertDate(deal.won_time),
	                obs: deal.title,
	                vlr: deal.value,
	              },
	            },
	          },
	        });
	        return {
	          dealId: deal.id,
	          date: convertDate(deal.won_time),
	          orgId: deal.org_id.owner_id,
	          value: deal.value,
	          xml,
	          sentToBling: false,
	        };
	      }
	      return false;
	    }).filter((deal) => deal !== false);

	    if (dealsToAdd.length === 0) {
	      return {
	        statusCode: 200, message: 'All newer deals were already included to MongoDB.', existentDeals, addedDeals: dealsToAdd,
	      };
	    }

	    const addedDeals = await DealSchema.insertMany(dealsToAdd);

	    return {
		  statusCode: 201,
	      message: `${dealsToAdd.length === 1 ? `${dealsToAdd.length} new deal have been` : `${dealsToAdd.length} new deals have been`} included to MongoDB.`,
	      existentDeals,
	      addedDeals,
	    };
	  } catch (err) {
	    console.log(err);
	    return { statusCode: 500, error: err };
	  }
	}
}
