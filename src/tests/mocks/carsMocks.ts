import { ICar } from "../../interfaces/ICar";

const newCarMock:ICar = {
  model: "Fiesta",
  year: 2017,
  color: "preto",
  status: true,
  buyValue: 14000,
  doorsQty: 4,
  seatsQty: 5
};

const CarWithIdMock:ICar & { _id: string } = {
  model: "Fiesta",
  year: 2017,
  color: "preto",
  status: true,
  buyValue: 14000,
  doorsQty: 4,
  seatsQty: 5,
  _id: "635692044cdb342282555065",
};

const CarUpdatedResultMock:ICar & { _id: string } = {
  model: "Fiesta",
  year: 2022,
  color: "cinza escuro",
  status: true,
  buyValue: 14500,
  doorsQty: 4,
  seatsQty: 5,
  _id: "635692044cdb342282555065",
};

const CarForUpdateMock:ICar = {
  model: "Fiesta",
  year: 2022,
  color: "cinza escuro",
  status: true,
  buyValue: 14500,
  doorsQty: 4,
  seatsQty: 5,
};

const carUpdateWrongMock = {
  model: "Fiesta",
  year: 2077,
  color: "cinza escuro",
  status: true,
  buyValue: 14500,
  doorsQty: 4,
  seatsQty: 5,
};

export {
  newCarMock,
  CarWithIdMock,
  CarUpdatedResultMock,
  CarForUpdateMock,
  carUpdateWrongMock
}