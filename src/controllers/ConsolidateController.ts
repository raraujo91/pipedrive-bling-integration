import { Request, Response } from 'express';

import ConsolidateService from '../services/ConsolidateService';

export default class ConsolidateController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
	   const consolidateService = new ConsolidateService();

	   const sendToBling = await consolidateService.run();

	   const { statusCode, body } = sendToBling;

	   return response.status(statusCode).json(body);
    } catch (err) {
      const { statusCode, error } = err;
      return response.status(statusCode).json(error);
    }
  }
}
