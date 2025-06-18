import { z } from "zod";

export const createUnitSchema = z.object({
    address: z.string().min(1, "La dirección es requerida"),
    number: z.string().min(1, "El número es requerido"),
    orientation: z.string().min(1, "La orientación es requerida"),
    bedrooms: z.number().int().nonnegative("Debe ser un número positivo"),
    bathrooms: z.number().int().nonnegative("Debe ser un número positivo"),
    model: z.string().min(1, "El modelo es requerido"),
    rentPrice: z.number().nonnegative("Debe ser un número positivo"),
    commonExpense: z.number().nonnegative("Debe ser un número positivo"),
});

export const unitSchema = createUnitSchema.extend({
    id: z.coerce.number(),
});

export const unitsSchema = z.array(unitSchema);

export type Unit = z.infer<typeof unitSchema>;
export type CreateUnit = z.infer<typeof createUnitSchema>;
