import { ErrorTypes } from '../errors/catalogs';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycleModel: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycleModel = model;
  }

  public create(obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._motorcycleModel.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    const cars = await this._motorcycleModel.read();
    return cars;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const car = await this._motorcycleModel.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const carUpdated = await this._motorcycleModel.update(_id, parsed.data);
    if (!carUpdated) throw new Error(ErrorTypes.EntityNotFound);
    return carUpdated;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const carDeleted = await this._motorcycleModel.delete(_id);
    if (!carDeleted) throw new Error(ErrorTypes.EntityNotFound);
    return carDeleted;
  }
}

export default MotorcycleService;