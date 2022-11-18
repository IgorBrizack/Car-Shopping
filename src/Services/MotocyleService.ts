import Motorcycle from '../Domains/Motorcycle';
import IMotorcyle from '../Interfaces/IMotorcycle';
import MotocycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotocycleDomain(motocycle: IMotorcyle | null): Motorcycle | null {
    if (motocycle) {
      return new Motorcycle(motocycle);
    }
    return null;
  }

  public async insertNewMotocycle(newMotocycle: IMotorcyle) {
    const motocycleODM = new MotocycleODM();
    const result = await motocycleODM.create(newMotocycle);
    return this.createMotocycleDomain(result);
  }
}

export default MotorcycleService;