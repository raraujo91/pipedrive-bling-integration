import MongooseWrapper from '../config/db/Mongoose';

async function mongoDB(): Promise<void> {
  const db = new MongooseWrapper({
    cluster: process.env.MONGODB_CLUSTER,
    database: process.env.MONGODB_DB,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASS,
  });

  try {
	  await db.init();
	  console.log(`\n 🟢 MongoDB up and running on cluster ${process.env.MONGODB_CLUSTER} \n`);
  } catch (err) {
	  console.log(err);
  }
}

export default mongoDB;
