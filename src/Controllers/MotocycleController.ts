import { NextFunction, Request, Response } from 'express';
import IMotocyle from '../Interfaces/IMotocycle';
import MotocycleService from '../Services/MotocyleService';

class MotocycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotocycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotocycleService();
  }

  public async create() {
    const newMotocyle: IMotocyle = {
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

export default MotocycleController;