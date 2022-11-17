import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarsService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        car,
      );
    }
    return null;
  }

  public async insertNewCar(newCar: ICar) {
    const carODM = new CarODM();
    const result = await carODM.create(newCar);
    return this.createCarDomain(result);
  }
}

export default CarsService;