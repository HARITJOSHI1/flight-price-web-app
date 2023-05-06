import express from 'express';
import { getIataCode, getPrice } from '../controllers/FlightController';
const Router = express.Router();

Router.route('/prices').get(getPrice);
Router.route('/iataCode').get(getIataCode);

export default Router;