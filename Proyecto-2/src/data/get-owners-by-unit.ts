import { api } from "@/api/api";
import { type Owner, ownersSchema } from "@/entities/owner.entity";
import { isAxiosError } from "axios";

export const getOwnersByUnit = async (id: number): Promise<Owner[]> => {
    try {
        const { data } = await api.get(`/units/${id}/owners`);
        const validation = ownersSchema.safeParse(data);
        if (!validation.success) {
            console.error("Invalid data:", validation.error);
            return [];
        }
        return validation.data;
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
            console.error(`No owners found for unit with ID ${id}`);
            return [];
        }
        console.error("Error fetching owners by unit:", error);
        return [];
    }
};
