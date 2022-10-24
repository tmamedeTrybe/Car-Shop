import { model as CreateModel, Schema } from 'mongoose';
import AbstractModel from './AbstractModel';
import { ICar } from '../interfaces/ICar';

const carMongooseSchema = new Schema<ICar>({
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class CarModel extends AbstractModel<ICar> {
  constructor(model = CreateModel('Car', carMongooseSchema)) {
    super(model);
  }
}

export default CarModel;