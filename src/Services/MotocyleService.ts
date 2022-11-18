import Motorcycle from '../Domains/Motorcycle';
import ErrorWithStatus from '../helpers/ErrorWithStatus';
import IMotorcyle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcyle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async insertNewMotorcycle(newMotorcycle: IMotorcyle) {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.create(newMotorcycle);
    return this.createMotorcycleDomain(result);
  }

  public async getAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.getAll();
    const resultWithDomain = result.map((el) => this.createMotorcycleDomain(el));
    return resultWithDomain;
  }

  public async getMotorcycleId(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.getById(id);
    
    if (!result) throw new ErrorWithStatus('Motorcycle not found', 404);

    return this.createMotorcycleDomain(result);
  }

  public async idVerify(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const isValid = await motorcycleODM.isValidId(id);

    if (!isValid) throw new ErrorWithStatus('Invalid mongo id', 422);
  }

  public async updateMotorcycle(id: string, data: IMotorcyle) {
    await this.idVerify(id);
    await this.getMotorcycleId(id);
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.update(id, data);
    return this.createMotorcycleDomain(result);
  }
}

export default MotorcycleService;