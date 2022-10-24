import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).int({ message: 'Must be a integer' })
    .positive({ message: 'Must be a positiver number' })
    .lte(4, { message: 'doorsQty must be less than 4' })
    .gte(2, { message: 'doorsQty must be greater than 2' }),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).int({ message: 'Must be a integer' })
    .positive({ message: 'Must be a positiver number' })
    .lte(7, { message: 'seatsQty must be less than 7' })
    .gte(2, { message: 'seatsQty must be greater than 2' }),
});
type ICar = z.infer<typeof carZodSchema>;

export {
  ICar,
  carZodSchema,
};