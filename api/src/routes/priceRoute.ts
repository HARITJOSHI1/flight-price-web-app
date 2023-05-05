import express from 'express';
import { getPrice } from '../controllers/FlightController';
const Router = express.Router();

Router.route('/prices').get(getPrice);
export default Router;