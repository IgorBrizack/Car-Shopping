import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarsService from '../Services/CarsService';

class CarsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarsService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarsService();
  }

  public async create() {
    const newCar: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCarInserted = await this.service.insertNewCar(newCar);
      return this.res.status(201).json(newCarInserted);
    } catch (error) {
      this.next(error);
    }
  }

  public async getCars() {
    const allCars = await this.service.getAllCars();
    return this.res.status(200).json(allCars);
  }

  public async getCarById() {
    try {
      await this.service.idVerify(this.req.params.id);
      const car = await this.service.getCarId(this.req.params.id);
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }
  
  public async updateCarById() {
    try {
      const carUpdated = await this.service.updateCar(this.req.params.id, this.req.body);
      return this.res.status(200).json(carUpdated);
    } catch (error) {
      this.next(error);
    }
  } 
}

export default CarsController;