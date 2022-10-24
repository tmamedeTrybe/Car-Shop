import { Router } from 'express';
import CarModel from '../models/CarsModel';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

const carRoute = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoute.get('/cars/:id', (req, res) => carController.readOne(req, res));
carRoute.put('/cars/:id', (req, res) => carController.update(req, res));
carRoute.delete('/cars/:id', (req, res) => carController.delete(req, res));
carRoute.post('/cars', (req, res) => carController.create(req, res));
carRoute.get('/cars', (req, res) => carController.read(req, res));

export default carRoute;