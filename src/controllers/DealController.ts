import { Request, Response } from 'express';

import DealService from '../services/DealService';

export default class DealController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const dealService = new DealService();

      const findWonDeals = await dealService.run({
        status: 'won',
        limit: 500,
      });

      const { statusCode, ...body } = findWonDeals;

      return response.status(statusCode).json(body);
    } catch (err) {
      const { statusCode, error } = err;
      return response.status(statusCode).json(error);
    }
  }
}
