import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  private _motorcycleService: IService<IMotorcycle>;

  constructor(motorcycleService: IService<IMotorcycle>) {
    this._motorcycleService = motorcycleService;
  }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const motorcycleServiceCreated = await this._motorcycleService.create(req.body);
    return res.status(201).json(motorcycleServiceCreated);
  }

  public async read(req: Request, res: Response<IMotorcycle[]>) {
    const motorcycleServices = await this._motorcycleService.read();
    return res.status(200).json(motorcycleServices);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const motorcycleService = await this._motorcycleService.readOne(req.params.id);
    return res.status(200).json(motorcycleService);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const motorcycleServiceUpdated = await this._motorcycleService.update(req.params.id, req.body);
    return res.status(200).json(motorcycleServiceUpdated);
  }

  public async delete(req: Request, res: Response<IMotorcycle>) {
    const motorcycleServiceDeleted = await this._motorcycleService.delete(req.params.id);
    return res.status(204).json(motorcycleServiceDeleted);
  }
}

export default MotorcycleController;