import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z
    .string({
      required_error: 'Model is required',
      invalid_type_error: 'Model must be a string',
    })
    .min(3, { message: 'Must be a string with at least 3 characters' }),
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a string',
    })
    .int({ message: 'Must be a integer' })
    .positive({ message: 'Must be a positive number' })
    .gte(1900, { message: 'Year must be greater than 1900' })
    .lte(2022, { message: 'Year must be less than 2022' }),
  color: z
    .string({
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    })
    .min(3, { message: 'Must be a string with at least 3 characters' }),
  status: z.optional((z.boolean({
    invalid_type_error: 'Status must be a boolean',
  }))),
  buyValue: z.number({ required_error: 'BuyValue is required',
    invalid_type_error: 'BuyValue must be a number' })
    .int({ message: 'Must be a integer' }),
});

type IVehicle = z.infer<typeof vehicleZodSchema>;

export {
  IVehicle,
  vehicleZodSchema,
};