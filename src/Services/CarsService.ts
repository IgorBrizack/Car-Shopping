import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarsService {
  public async insertNewCar(newCar: ICar) {
    const carODM = new CarODM();
    const result = carODM.create(newCar);
    return result
  }
}

export default CarsService;