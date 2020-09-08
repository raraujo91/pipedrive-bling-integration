import axios, { AxiosInstance } from 'axios';

interface PipedriveInterface {
	domain: string;
	apiKey: string;
}

export interface PipedriveStatusInterface {
	status: string;
	limit: number
}

export default class Pipedrive {
	private baseURL: string;

	private api: AxiosInstance;

	constructor(payload: PipedriveInterface) {
	  this.baseURL = `https://${payload.domain}.pipedrive.com/api/v1`;
	  this.api = axios.create({
		  baseURL: this.baseURL,
		  params: {
			  api_token: payload.apiKey,
		  },
	  });
	}

	async getDealsWithStatus(payload: PipedriveStatusInterface) {
	  try {
	    const response = await this.api.get('/deals', {
	      params: {
	        limit: payload.limit,
	        status: payload.status,
	      },
	    });

	    return response.data;
	  } catch (err) {
	    console.log(err);
	    return err;
	  }
	}
}
