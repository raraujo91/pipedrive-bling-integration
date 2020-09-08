import { connect } from 'mongoose';

interface MongooseConstructor {
	cluster: string;
	user: string;
	password: string;
	database: string;
}

export default class MongooseWrapper {
	private cluster: string;

	private user: string;

	private password: string;

	private database: string;

	constructor({
	  cluster, user, password, database,
	}: MongooseConstructor) {
	  this.cluster = cluster;
	  this.user = user;
	  this.password = password;
	  this.database = database;
	}

	async init() {
	  try {
		  const request = await connect(`mongodb+srv://${this.user}:${this.password}@${this.cluster}/${this.database}?retryWrites=true&w=majority`, {
			  useNewUrlParser: true,
			  useUnifiedTopology: true,
			  useCreateIndex: true,
		  });

	    return request;
	  } catch (err) {
	    console.log(err);
	    return err;
	  }
	}
}
