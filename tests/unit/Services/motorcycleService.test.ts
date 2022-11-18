import { expect } from 'chai';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotocyleService';

describe('Testando a rota de Motorcycles', () => {
  it('cadastrando uma nova motorcycle com sucesso', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle({
      id: '6376c07a3fe0c9fdb2d99ab8',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });

    sinon.stub(Model, 'create').resolves(motorcycleOutput);
    
    const service = new MotorcycleService();
    const result = await service.insertNewMotorcycle({ 
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600 });

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('deve retornar todas as motorcycles', async function () {
    const allMotorcycles: Motorcycle[] = [new Motorcycle(
      {
        id: '6376ea91b337b952bb80bae1',
        model: 'xj',
        year: 2002,
        color: 'Black',
        buyValue: 20.990,
        status: true,
        category: 'Street',
        engineCapacity: 600,
      },
    ), new Motorcycle({
      id: '6376eaa3b337b952bb80bae3',
      model: 'Hayabusa',
      year: 2007,
      color: 'Roxo',
      buyValue: 35.99,
      status: true,
      category: 'Street',
      engineCapacity: 1300,
    })];

    sinon.stub(Model, 'find').resolves(allMotorcycles);

    const service = new MotorcycleService();
    const result = await service.getAllMotorcycles();

    expect(result).to.be.deep.equal(allMotorcycles);
  });

  it('Deve retornar uma motorcyle pelo Id', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle({
      id: '6376eaa3b337b952bb80bae3',
      model: 'Hayabusa',
      year: 2007,
      color: 'Roxo',
      buyValue: 35.99,
      status: true,
      category: 'Street',
      engineCapacity: 1300,
    });
    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.getMotorcycleId('6376eaa3b337b952bb80bae3');

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Deve lançar uma exceção caso um seja passado um id inválido', async function () {
    const invalidId = '12345678aaaaaaaaaaaaaaaaaaaa';

    try {
      const service = new MotorcycleService();
      await service.idVerify(invalidId);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deve ser possível atualizar um Motorcycle com sucesso', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle({
      id: '6376eaa3b337b952bb80bae3',
      model: 'Hayabusa',
      year: 2007,
      color: 'Roxo',
      buyValue: 35.99,
      status: true,
      category: 'Street',
      engineCapacity: 1300,
    });
    
    const id = '6376eaa3b337b952bb80bae3';

    const motorcycleUpdate: IMotorcycle = {
      model: 'Hayabusa',
      year: 2007,
      color: 'Roxo',
      buyValue: 35.99,
      status: true,
      category: 'Street',
      engineCapacity: 1300,
    };

    const motorcycleUpdated: IMotorcycle = {
      id: '6376eaa3b337b952bb80bae3',
      model: 'Hayabusa',
      year: 2007,
      color: 'Roxo',
      buyValue: 35.99,
      status: true,
      category: 'Street',
      engineCapacity: 1300,
    };

    sinon.stub(Model, 'findById').resolves(motorcycleOutput);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleUpdated);

    const service = new MotorcycleService();
    const result = await service.updateMotorcycle(id, motorcycleUpdate);

    expect(result).to.be.deep.equal(motorcycleUpdated);
  });

  afterEach(function () {
    sinon.restore();
  });
});