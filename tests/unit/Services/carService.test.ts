import { expect } from 'chai';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarsService';

describe('Testando a rota de Cars', () => {
  it('Cadastrando um novo carro com sucesso', async function () {
    const carOutput: Car = new Car({
      id: '6376c07a3fe0c9fdb2d99ab8',
      model: 'marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    sinon.stub(Model, 'create').resolves(carOutput);
    
    const service = new CarService();
    const result = await service.insertNewCar({ 
      model: 'marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5 });

    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Verifica se é retornado um carro ao passar o Id', async function () {
    const carOutput: Car = new Car({
      id: '6376c07a3fe0c9fdb2d99ab8',
      model: 'marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const result = await service.getCarId('6376c07a3fe0c9fdb2d99ab8');

    expect(result).to.be.deep.equal(carOutput);

    sinon.restore();
  });

  it('Deve retornar todos os carros cadastrados', async function () {
    const allCars: Car[] = [new Car(
      {
        id: '6376ea91b337b952bb80bae1',
        model: 'marea',
        year: 2002,
        color: 'Pink',
        buyValue: 15.99,
        status: true,
        doorsQty: 4,
        seatsQty: 5,
      },
    ), new Car({
      id: '6376eaa3b337b952bb80bae3',
      model: 'escort',
      year: 2005,
      color: 'Preto',
      buyValue: 15.99,
      status: true,
      doorsQty: 4,
      seatsQty: 5,
    })];
    sinon.stub(Model, 'find').resolves(allCars);

    const service = new CarService();
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(allCars);
  });

  it('Deve lançar uma exceção caso um seja passado um id inválido', async function () {
    const invalidId = '12345678aaaaaaaaaaaaaaaaaaaa';

    try {
      const service = new CarService();
      await service.idVerify(invalidId);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deve ser possível atualizar um carro com sucesso', async function () {
    const carOutput: Car = new Car({
      id: '6376c07a3fe0c9fdb2d99ab8',
      model: 'marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    
    const id = '634852326b35b59438fbea2f';

    const carUpdate: ICar = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const carUpdated: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findById').resolves(carOutput);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carUpdated);

    const service = new CarService();
    const result = await service.updateCar(id, carUpdate);

    expect(result).to.be.deep.equal(carUpdated);
  });

  afterEach(function () {
    sinon.restore();
  });
});
