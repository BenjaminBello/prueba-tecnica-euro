import { api } from "@/api/api";
import { type CreateUnit } from "../entities/unit.entity";

export const createUnitAction = async (unit: CreateUnit) => {
    await api.post("/units", unit);
};
