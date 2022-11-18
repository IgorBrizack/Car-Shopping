import Motocycle from '../Domains/Motocycle';
import IMotocyle from '../Interfaces/IMotocycle';
import MotocycleODM from '../Models/MotocycleODM';

class MotocycleService {
  private createMotocycleDomain(motocycle: IMotocyle | null): Motocycle | null {
    if (motocycle) {
      return new Motocycle(motocycle);
    }
    return null;
  }

  public async insertNewMotocycle(newMotocycle: IMotocyle) {
    const motocycleODM = new MotocycleODM();
    const result = await motocycleODM.create(newMotocycle);
    return this.createMotocycleDomain(result);
  }
}

export default MotocycleService;