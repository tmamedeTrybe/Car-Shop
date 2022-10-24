import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalogs';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleForUpdateMock, motorcycleUpdatedResultMock,
  motorcycleWithIdMock, newMotorcycleMock, motorcycleUpdateWrongMock } from '../../mocks/motocycleMocks';

describe('motorcycles service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(() => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleWithIdMock);
    sinon.stub(motorcycleModel, 'read').resolves([motorcycleWithIdMock]);
    sinon
      .stub(motorcycleModel, 'readOne')
      .onCall(0)
      .resolves(motorcycleWithIdMock)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(motorcycleModel, 'update')
      .onCall(0)
      .resolves(motorcycleUpdatedResultMock)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
    sinon
      .stub(motorcycleModel, 'delete')
      .onCall(0)
      .resolves(motorcycleWithIdMock)
      .onCall(1)
      .resolves(null)
  });

  after(() => {
    sinon.restore();
  });

  describe('POST - creating a motorcycle', () => {
    it ('Sucessfully created', async () => {
      const newmotorcycle = await motorcycleService.create(newMotorcycleMock);
      expect(newmotorcycle).to.be.deep.equal(motorcycleWithIdMock);
    });
    it('Create failure', async () => {
      let error;
      try {
        await motorcycleService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('GET - searching motorcycles', () => {
    it('Sucessfully search', async () => {
      const motorcycles = await motorcycleService.read();
      expect(motorcycles).to.be.deep.equal([motorcycleWithIdMock]);
    });
  });

  describe('GET/:id - searching a motorcycle', () => {
    it('Sucessfully search', async () => {
      const motorcycles = await motorcycleService.readOne("635692044cdb342282555065");
      expect(motorcycles).to.be.deep.equal(motorcycleWithIdMock);
    });
    it('Failure search', async () => {
      let error;
      try {
        await motorcycleService.readOne('idERRADO');
      } catch (err:any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('PUT - updating a motorcycle', () => {
    it ('Successfully upated', async () => {
      const newmotorcycle = await motorcycleService.update("635692044cdb342282555065", motorcycleForUpdateMock);
      expect(newmotorcycle).to.be.deep.equal(motorcycleUpdatedResultMock);
    });
    it('Failure update', async () => {
      let error;
      try {
        await motorcycleService.update('idERRADO', motorcycleForUpdateMock);
      } catch (err:any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
    it('Failure: motorcycle invalid', async () => {
      let error;
      try {
        await motorcycleService.update("635692044cdb342282555065", motorcycleUpdateWrongMock);
      } catch (err: any) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('DELETE - Deleting a motorcycle', async () => {
    it ('Succesfully deleted', async () => {
      const deletedmotorcycle = await motorcycleService.delete("635692044cdb342282555065");
      expect(deletedmotorcycle).to.be.deep.equal(motorcycleWithIdMock);
    });
    it ('Failure delete', async () => {
      let error;
      try {
        await motorcycleService.delete('idERRADO');
      } catch (err:any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });
});