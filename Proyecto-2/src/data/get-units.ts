import { api } from "@/api/api";
import { type Unit, unitsSchema } from "@/entities/unit.entity";

export const getUnits = async (): Promise<Unit[]> => {
    const { data } = await api.get("/units");
    const result = unitsSchema.safeParse(data);

    if (!result.success) {
        throw new Error("Invalid data");
    }

    return result.data ?? [];
};
