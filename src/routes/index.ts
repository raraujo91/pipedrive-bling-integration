import { Router } from 'express';

import DealController from '../controllers/DealController';
import ConsolidateController from '../controllers/ConsolidateController';
import OrderController from '../controllers/OrderController';

const consolidateController = new ConsolidateController();
const dealController = new DealController();
const orderController = new OrderController();

const routes = Router();

routes.use('/consolidate', consolidateController.index);
routes.use('/deals', dealController.index);
routes.use('/orders', orderController.index);

export default routes;
