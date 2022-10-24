import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { NextFunction, Request, Response } from 'express';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import MotorcycleController from '../../../controllers/MotorcycleController';
import { motorcycleUpdatedResultMock, motorcycleWithIdMock, newMotorcycleMock } from '../../mocks/motocycleMocks';


describe ('motorcycles Controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleWithIdMock);
    sinon.stub(motorcycleService, 'read').resolves([motorcycleWithIdMock]);
    sinon.stub(motorcycleService, 'readOne').resolves(motorcycleWithIdMock);
    sinon.stub(motorcycleService, 'update').resolves(motorcycleUpdatedResultMock);
    sinon.stub(motorcycleService, 'delete').resolves(motorcycleWithIdMock);
  
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  });

  describe('POST - Creating a motorcycle', () => {
    it('Successfully created', async () => {
      req.params = { id: "635692044cdb342282555065" };
      req.body = newMotorcycleMock;
      await motorcycleController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleWithIdMock)).to.be.true;
    });
  });

  describe('GET - Searching motorcycles', () => {
    it('Successfully search', async () => {
      req.params = { id: "635692044cdb342282555065" };
      await motorcycleController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motorcycleWithIdMock])).to.be.true;
    });
  });

  describe('GET/:id - Searching a motorcycle', () => {
    it('Successfully search', async () => {
      req.params = { id: "635692044cdb342282555065" };
      await motorcycleController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleWithIdMock)).to.be.true;
    });
  });

  describe('PUT - Updating a motorcycle', () => {
    it('Successfully search', async () => {
      await motorcycleController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleWithIdMock)).to.be.true;
    });
  });

  describe('DELETE - Deleting a motorcycle', () => {
    it('Successfully delete', async () => {
      await motorcycleController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleWithIdMock)).to.be.true;
    });
  });
});