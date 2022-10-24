import { model as CreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import AbstractModel from './AbstractModel';

const motorclycleZodSchema = new Schema<IMotorcycle>({
  status: { type: Boolean, required: false },
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class MotorcycleModel extends AbstractModel<IMotorcycle> {
  constructor(model = CreateModel('Motorcycles', motorclycleZodSchema)) {
    super(model);
  }
}

export default MotorcycleModel;