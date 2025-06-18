import { api } from "@/api/api";
import { type Unit, unitsSchema } from "@/entities/unit.entity";
import { isAxiosError } from "axios";

export const getUnitsByOwner = async (id: number): Promise<Unit[]> => {
    try {
        const { data } = await api.get(`/owners/${id}/units`);
        const validation = unitsSchema.safeParse(data);
        if (!validation.success) {
            console.error("Invalid data:", validation.error);
            return [];
        }
        return validation.data;
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
            console.error(`No units found for owner with ID ${id}`);
        }
        console.error("Error fetching units by owner:", error);
        return [];
    }
};
