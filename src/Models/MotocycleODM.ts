import { Schema } from 'mongoose';
import IMotocycle from '../Interfaces/IMotocycle';
import AbstractODM from './AbstractODM';

class MotocycleODM extends AbstractODM<IMotocycle> {
  constructor() {
    const schema = new Schema<IMotocycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motocycle');
  }

  public async getMotocycle(id: string): Promise<IMotocycle | null> {
    return this.model.findById(id);
  }
}

export default MotocycleODM;