import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const MotorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z
    .number({
      required_error: 'engineCapacity is required',
      invalid_type_error: 'engineCapacity must be a number',
    })
    .int({ message: 'engineCapacity must be a integer' })
    .positive({ message: 'engineCapacity must be a positiver number' })
    .lte(2500, { message: 'engineCapacity must be less than 2500' }),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export {
  IMotorcycle,
  MotorcycleZodSchema,
};