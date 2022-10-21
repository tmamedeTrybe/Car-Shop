import { z } from 'zod';
import { IVehicle } from './IVehicle';

const carZodSchema = z.object({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(4),
});

interface ICar extends IVehicle {
  doorsQty: number,
  seatsQty: number,
}

export {
  ICar,
  carZodSchema,
};