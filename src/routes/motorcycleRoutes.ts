import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';

const motorcycleRoute = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const carController = new MotorcycleController(motorcycleService);

const routeId = '/motorcycles/:id';

motorcycleRoute.get(routeId, (req, res) => carController.readOne(req, res));
motorcycleRoute.put(routeId, (req, res) => carController.update(req, res));
motorcycleRoute.delete(routeId, (req, res) => carController.delete(req, res));
motorcycleRoute.post('/motorcycles', (req, res) => carController.create(req, res));
motorcycleRoute.get('/motorcycles', (req, res) => carController.read(req, res));

export default motorcycleRoute;