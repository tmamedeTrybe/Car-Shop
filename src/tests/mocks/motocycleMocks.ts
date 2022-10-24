import { IMotorcycle } from "../../interfaces/IMotorcycle"

const newMotorcycleMock:IMotorcycle = {
  status: true,
  model: 'Harley Davidson',
  year: 2015,
  color: 'Preto',
  buyValue: 50000,
  category: 'Street',
  engineCapacity: 2000,
};

const motorcycleWithIdMock:IMotorcycle & { _id: string } = {
  _id: '1654646464465465',
  status: true,
  model: 'Harley Davidson',
  year: 2015,
  color: 'Preto',
  buyValue: 50000,
  category: 'Street',
  engineCapacity: 2000,
};

const motorcycleForUpdateMock:IMotorcycle = {
  status: true,
  model: 'Harley Davidson',
  year: 2022,
  color: 'Preto e vermelho',
  buyValue: 90000,
  category: 'Street',
  engineCapacity: 2250,
};

const motorcycleUpdatedResultMock:IMotorcycle & { _id: string} = {
  _id: '1654646464465465',
  status: true,
  model: 'Harley Davidson',
  year: 2022,
  color: 'Preto e vermelho',
  buyValue: 90000,
  category: 'Street',
  engineCapacity: 2250,
};

const motorcycleUpdateWrongMock:IMotorcycle = {
  status: true,
  model: 'Harley Davidson',
  year: 2022,
  color: 'Preto e vermelho',
  buyValue: 90000,
  category: 'Street',
  engineCapacity: 8000,
};

export {
  newMotorcycleMock,
  motorcycleWithIdMock,
  motorcycleForUpdateMock,
  motorcycleUpdatedResultMock,
  motorcycleUpdateWrongMock,
};