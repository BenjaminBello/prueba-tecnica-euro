import { api } from "@/api/api";
import type { CreateOwner } from "@/entities/owner.entity";

export const createOwnerAction = async (owner: CreateOwner) => {
    const { birthDate, email, name, rut, ...rest } = owner;
    await api.post("/owners/assign-unit", {
        name,
        rut,
        email,
        birthDate,
    }, {
        params: {
            ...rest,
        },
    });
};
