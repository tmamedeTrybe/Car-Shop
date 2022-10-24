import chai from 'chai';
import { Model } from "mongoose"
import * as sinon from 'sinon';
import { ErrorTypes } from '../../../errors/catalogs';
import MotorcycleModel from "../../../models/MotorcycleModel";
import { motorcycleWithIdMock, newMotorcycleMock,
  motorcycleForUpdateMock, motorcycleUpdatedResultMock } from "../../mocks/motocycleMocks";
const { expect } = chai;

describe('Motorcycles Model', () => {
    const motorcyclesModel = new MotorcycleModel();

    before(() => {
      sinon.stub(Model, 'create').resolves(motorcycleWithIdMock);
      sinon.stub(Model, 'find').resolves([motorcycleWithIdMock]);
      sinon.stub(Model, 'findOne').resolves(motorcycleWithIdMock);
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleUpdatedResultMock);
      sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleWithIdMock);
    });

    after(() => {
      sinon.restore();
    });

    describe('POST - Creating a motorcycle', () => {
      it('Successfully created', async () => {
          const newMotorcycle = await motorcyclesModel.create(newMotorcycleMock);
          expect(newMotorcycle).to.be.deep.equal(motorcycleWithIdMock);
      });
    });

    describe('GET, searching motorcycle', () => {
      it('Sucessfully searched',  async () => {
          const motorcycles = await motorcyclesModel.read();
          expect(motorcycles).to.be.deep.equal([motorcycleWithIdMock]);
      });
    });
  
    describe('GET/:id, searching a motorcycle', () => {
      it('Sucessfully searched',  async () => {
          const motorcycle = await motorcyclesModel.readOne("635692044cdb342282555065");
          expect(motorcycle).to.be.deep.equal(motorcycleWithIdMock);
      });
      it('not found', async () => {
        try {
          await motorcyclesModel.readOne("idERRADO");
        } catch (error: any) {
          expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
        }
      });
    });
  
    describe('PUT, updating a motorcycle', () => {
      it ('Sucessfully updated', async () => {
        const motorcycleUpdated = await motorcyclesModel.update("635692044cdb342282555065", motorcycleForUpdateMock);
        expect(motorcycleUpdated).to.be.deep.equal(motorcycleUpdatedResultMock);
      });
  
      it ('update failure', async () => {
        try {
          await motorcyclesModel.update('idERRADO', motorcycleForUpdateMock);
        } catch (error:any) {
          expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
        }
      });
    });
  
    describe('DELETE, deleting a motorcycle', () => {
      it ('Sucessfully deleted', async () => {
        const motorcycleDeleted = await motorcyclesModel.delete("635692044cdb342282555065");
        expect(motorcycleDeleted).to.be.deep.equal(motorcycleWithIdMock);
      });
  
      it ('update failure', async () => {
        try {
          await motorcyclesModel.delete('idERRADO');
        } catch (error:any) {
          expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
        }
      });
    });
});