import { api } from "@/api/api";
import { type Owner, ownersSchema } from "@/entities/owner.entity";

export const getOwners = async (): Promise<Owner[]> => {
    const { data } = await api.get("/owners");
    const result = ownersSchema.safeParse(data);

    if (!result.success) {
        console.log(result);
        throw new Error("Invalid data");
    }

    return result.data ?? [];
};
