import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { NextFunction, Request, Response } from 'express';
import CarModel from '../../../models/CarsModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { CarUpdatedResultMock, CarWithIdMock, newCarMock } from '../../mocks/carsMocks';

describe ('Cars Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(CarWithIdMock);
    sinon.stub(carService, 'read').resolves([CarWithIdMock]);
    sinon.stub(carService, 'readOne').resolves(CarWithIdMock);
    sinon.stub(carService, 'update').resolves(CarUpdatedResultMock);
    sinon.stub(carService, 'delete').resolves(CarWithIdMock);
  
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  });

  describe('POST - Creating a car', () => {
    it('Successfully created', async () => {
      req.params = { id: "635692044cdb342282555065" };
      req.body = newCarMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(CarWithIdMock)).to.be.true;
    });
  });

  describe('GET - Searching cars', () => {
    it('Successfully search', async () => {
      req.params = { id: "635692044cdb342282555065" };
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([CarWithIdMock])).to.be.true;
    });
  });

  describe('GET/:id - Searching a car', () => {
    it('Successfully search', async () => {
      req.params = { id: "635692044cdb342282555065" };
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(CarWithIdMock)).to.be.true;
    });
  });

  describe('PUT - Updating a car', () => {
    it('Successfully search', async () => {
      await carController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(CarWithIdMock)).to.be.true;
    });
  });

  describe('DELETE - Deleting a car', () => {
    it('Successfully delete', async () => {
      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(CarWithIdMock)).to.be.true;
    });
  });
});