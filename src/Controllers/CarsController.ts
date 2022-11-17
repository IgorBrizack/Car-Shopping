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

  public async getCarById(id: string) {
    await this.service.idVerify(id);
    const car = await this.service.getCarId(id);
    return this.res.status(200).json(car);
  }
}

export default CarsController;