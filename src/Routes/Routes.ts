import { Router } from 'express';
import CarsController from '../Controllers/CarsController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).create(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).getCars(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).getCarById(req.params.id),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).updateCarById(req.params.id, req.body),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

export default routes;