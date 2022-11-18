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
      const newMotorcyleInserted = await this.service.insertNewMotorcycle(newMotocyle);
      return this.res.status(201).json(newMotorcyleInserted);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycles() {
    const allMotorcycles = await this.service.getAllMotorcycles();
    return this.res.status(200).json(allMotorcycles);
  }

  public async getMotorcycleById() {
    try {
      await this.service.idVerify(this.req.params.id);
      const motorcycle = await this.service.getMotorcycleId(this.req.params.id);
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateMotorcycleById() {
    try {
      const motorcycleUpdated = await 
      this.service.updateMotorcycle(this.req.params.id, this.req.body);
      
      return this.res.status(200).json(motorcycleUpdated);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;