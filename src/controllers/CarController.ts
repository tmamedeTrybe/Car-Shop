import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  private _carService: IService<ICar>;

  constructor(carService: IService<ICar>) {
    this._carService = carService;
  }

  public async create(req: Request, res: Response<ICar>) {
    const carCreated = await this._carService.create(req.body);
    return res.status(201).json(carCreated);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const cars = await this._carService.read();
    return res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const car = await this._carService.readOne(req.params.id);
    return res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar>) {
    const carUpdated = await this._carService.update(req.params.id, req.body);
    return res.status(200).json(carUpdated);
  }

  public async delete(req: Request, res: Response<ICar>) {
    const carDeleted = await this._carService.delete(req.params.id);
    return res.status(204).json(carDeleted);
  }
}

export default CarController;