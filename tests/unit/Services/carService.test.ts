import { expect } from 'chai';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarsService';

describe('Testando a rota de Cars', () => {
  it('cadastrando um novo carro com sucesso', async function () {
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

  it('Verifique se é retornado um carro ao passar o Id', async function () {
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
});