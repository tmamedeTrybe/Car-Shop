import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarsModel';
import { CarUpdatedResultMock, CarForUpdateMock, newCarMock, CarWithIdMock } from '../../mocks/carsMocks';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../errors/catalogs';
const { expect } = chai;

describe('Cars Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(CarWithIdMock);
    sinon.stub(Model, 'find').resolves([CarWithIdMock]);
    sinon.stub(Model, 'findOne').resolves(CarWithIdMock);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(CarUpdatedResultMock);
    sinon.stub(Model, 'findByIdAndDelete').resolves(CarWithIdMock);
  });

  after(() => {
    sinon.restore();
  });

  describe('POST, creating a new car', () => {
    it('Sucessfully created',  async () => {
        const newCar = await carModel.create(newCarMock);
        expect(newCar).to.be.deep.equal(CarWithIdMock);
    });
  });

  describe('GET, searching cars', () => {
    it('Sucessfully searched',  async () => {
        const cars = await carModel.read();
        expect(cars).to.be.deep.equal([CarWithIdMock]);
    });
  });

  describe('GET/:id, searching a car', () => {
    it('Sucessfully searched',  async () => {
        const car = await carModel.readOne("635692044cdb342282555065");
        expect(car).to.be.deep.equal(CarWithIdMock);
    });
    it('not found', async () => {
      try {
        await carModel.readOne("idERRADO");
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('PUT, updating a car', () => {
    it ('Sucessfully updated', async () => {
      const carUpdated = await carModel.update("635692044cdb342282555065", CarForUpdateMock);
      expect(carUpdated).to.be.deep.equal(CarUpdatedResultMock);
    });

    it ('update failure', async () => {
      try {
        await carModel.update('idERRADO', CarForUpdateMock);
      } catch (error:any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('DELETE, deleting a car', () => {
    it ('Sucessfully deleted', async () => {
      const carDeleted = await carModel.delete("635692044cdb342282555065");
      expect(carDeleted).to.be.deep.equal(CarWithIdMock);
    });

    it ('update failure', async () => {
      try {
        await carModel.delete('idERRADO');
      } catch (error:any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

});