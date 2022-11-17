import Car from '../Domains/Car';
import ErrorWithStatus from '../helpers/ErrorWithStatus';
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

  public async getAllCars() {
    const carODM = new CarODM();
    const result = await carODM.getAll();
    const resulWithDomains = result.map((el) => this.createCarDomain(el));
    return resulWithDomains;
  }

  public async getCarId(id: string) {
    const carODM = new CarODM();
    const result = await carODM.getCar(id);
    
    if (!result) throw new ErrorWithStatus('Car not found', 404);

    return this.createCarDomain(result);
  }

  public async idVerify(id: string) {
    const carODM = new CarODM();
    const isValid = await carODM.isValidId(id);
    if (!isValid) throw new ErrorWithStatus('Invalid mongo id', 422);
  }
}

export default CarsService;