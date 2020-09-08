import axios, { AxiosInstance } from 'axios';
import qs from 'querystring';

interface BlingInterface {
	apiKey: string;
}

export interface BlingRequestInterface {
	route: string;
	returnType?: string;
	xml?: string;
}

export default class Bling {
	private baseURL: string;

	private apiKey: string;

	private api: AxiosInstance;

	constructor(payload: BlingInterface) {
	  this.baseURL = 'https://bling.com.br/Api/v2';
	  this.apiKey = payload.apiKey;
	  this.api = axios.create({
	    baseURL: this.baseURL,
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded',
	    },
	  });
	}

	async create(payload: BlingRequestInterface) {
	  try {
	    const response = await this.api.post(`/${payload.route}/${payload.returnType}`, qs.stringify({ xml: payload.xml, apikey: this.apiKey }));
	    return response.data;
	  } catch (err) {
	    console.log(err);
	    return err;
	  }
	}

	async list(payload: BlingRequestInterface) {
	  try {
	    const response = await this.api.get(`/${payload.route}/${payload.returnType}`, {
	      params: {
	        apikey: this.apiKey,
	      },
	    });

	    return response.data;
	  } catch (err) {
	    console.log(err);
	    return err;
	  }
	}
}
