import { NextFunction, Request, Response } from 'express';
import IMotorcyle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotocyleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const newMotocyle: IMotorcyle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotocyleInserted = await this.service.insertNewMotocycle(newMotocyle);
      return this.res.status(201).json(newMotocyleInserted);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;