import { ErrorTypes } from '../errors/catalogs';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _carModel: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._carModel = model;
  }

  public create(obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._carModel.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._carModel.read();
    return cars;
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._carModel.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const carUpdated = await this._carModel.update(_id, parsed.data);
    if (!carUpdated) throw new Error(ErrorTypes.EntityNotFound);
    return carUpdated;
  }

  public async delete(_id: string): Promise<ICar> {
    const carDeleted = await this._carModel.delete(_id);
    if (!carDeleted) throw new Error(ErrorTypes.EntityNotFound);
    return carDeleted;
  }
}

export default CarService;