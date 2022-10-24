import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalogs';
import CarModel from "../../../models/CarsModel";
import CarService from "../../../services/CarService"
import { CarForUpdateMock, CarUpdatedResultMock, carUpdateWrongMock, CarWithIdMock, newCarMock } from '../../mocks/carsMocks';

describe('Cars service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(CarWithIdMock);
    sinon.stub(carModel, 'read').resolves([CarWithIdMock]);
    sinon
      .stub(carModel, 'readOne')
      .onCall(0)
      .resolves(CarWithIdMock)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(carModel, 'update')
      .onCall(0)
      .resolves(CarUpdatedResultMock)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
    sinon
      .stub(carModel, 'delete')
      .onCall(0)
      .resolves(CarWithIdMock)
      .onCall(1)
      .resolves(null)
  });

  after(() => {
    sinon.restore();
  });

  describe('POST - creating a car', () => {
    it ('Sucessfully created', async () => {
      const newCar = await carService.create(newCarMock);
      expect(newCar).to.be.deep.equal(CarWithIdMock);
    });
    it('Create failure', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('GET - searching cars', () => {
    it('Sucessfully search', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal([CarWithIdMock]);
    });
  });

  describe('GET/:id - searching a car', () => {
    it('Sucessfully search', async () => {
      const cars = await carService.readOne("635692044cdb342282555065");
      expect(cars).to.be.deep.equal(CarWithIdMock);
    });
    it('Failure search', async () => {
      let error;
      try {
        await carService.readOne('idERRADO');
      } catch (err:any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('PUT - updating a car', () => {
    it ('Successfully upated', async () => {
      const newCar = await carService.update("635692044cdb342282555065", CarForUpdateMock);
      expect(newCar).to.be.deep.equal(CarUpdatedResultMock);
    });
    it('Failure update', async () => {
      let error;
      try {
        await carService.update('idERRADO', CarForUpdateMock);
      } catch (err:any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
    it('Failure: car invalid', async () => {
      let error;
      try {
        await carService.update("635692044cdb342282555065", carUpdateWrongMock);
      } catch (err: any) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('DELETE - Deleting a car', async () => {
    it ('Succesfully deleted', async () => {
      const deletedCar = await carService.delete("635692044cdb342282555065");
      expect(deletedCar).to.be.deep.equal(CarWithIdMock);
    });
    it ('Failure delete', async () => {
      let error;
      try {
        await carService.delete('idERRADO');
      } catch (err:any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });
});