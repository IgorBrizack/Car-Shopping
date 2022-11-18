import { expect } from 'chai';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
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

    sinon.restore();
  });

  // afterEach(function () {
  //   sinon.restore();
  // });
});