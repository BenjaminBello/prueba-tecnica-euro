import { z } from "zod";

export const createOwnerSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    rut: z.string(),
    email: z.string().email("Debe ser un email válido"),
    birthDate: z.coerce.date({
        errorMap: () => ({ message: "Debe ser una fecha válida" }),
    }),
    unitId: z.number().positive("Debe ser un número positivo"),
    ownershipPercentage: z.number().min(
        0,
        "Debe ser mayor o igual a 0",
    ).max(
        100,
        "Debe ser menor o igual a 100",
    ),
});

export const ownerSchema = z.object({
    id: z.coerce.number(),
    name: z.string().min(1, "El nombre es requerido"),
    rut: z.string(),
    email: z.string().email("Debe ser un email válido"),
    birthDate: z.coerce.date({
        errorMap: () => ({ message: "Debe ser una fecha válida" }),
    }),
});

export const ownersSchema = z.array(ownerSchema);

export type Owner = z.infer<typeof ownerSchema>;
export type CreateOwner = z.infer<typeof createOwnerSchema>;
