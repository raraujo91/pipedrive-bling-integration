import BlingAPI from '../config/api/BlingAPI';

import DealSchema from '../models/DealsSchema';

export default class ConsolidateService {
	private erp = new BlingAPI({
	  apiKey: process.env.BLING_API_KEY,
	});

	async run() {
	  try {
	    const notSentToBling = await (await DealSchema.find({ sentToBling: false }));

	    const createUpdateBody = notSentToBling.map((doc) => ({
	      sentToBling: doc.sentToBling,
	      dealId: doc.dealId,
	      xml: doc.xml,
	    }));

	    const createBlingRequests = createUpdateBody.map((request) => this.erp.create({
	      route: 'pedido',
	      returnType: 'json',
	      xml: request.xml,
	    }));

	    await Promise.all(createBlingRequests);

	    const updateSuccessDeals = createUpdateBody.map((deal) => DealSchema.updateOne(
	      { dealId: deal.dealId },
	      { sentToBling: true },
	    ));

	    await Promise.all(updateSuccessDeals);

	    const agreggateBetweenSent = await DealSchema.aggregate([
	      { $match: { sentToBling: true } },
	      { $group: { _id: '$date', total: { $sum: '$value' } } },
	    ]);

		  return { statusCode: 200, body: agreggateBetweenSent };
	  } catch (err) {
	    console.log(err);
	    return { statusCode: 500, error: err };
	  }
	}

	async list() {
	  try {
	    const listOrders = await this.erp.list({
	      route: 'pedidos',
	      returnType: 'json',
	    });
		  return { statusCode: 200, body: listOrders };
	  } catch (err) {
	    console.log(err);
		  return { statusCode: 500, error: err };
	  }
	}
}
