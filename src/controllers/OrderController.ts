import { Request, Response } from 'express';

import ConsolidateService from '../services/ConsolidateService';

export default class OrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
	  const consolidateService = new ConsolidateService();

	  const listOrders = await consolidateService.list();

	  const { statusCode, body } = listOrders;

      return response.status(statusCode).json(body);
    } catch (err) {
	  const { statusCode, error } = err;

      return response.status(statusCode).json(error);
    }
  }
}
