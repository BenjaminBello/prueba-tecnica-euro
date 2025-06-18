import { createUnitAction } from '@/actions/create-unit.action'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUnitSchema } from '@/entities/unit.entity'
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
    setModalOpen?: (open: boolean) => void
}

type CreateUnitForm = z.infer<typeof createUnitSchema>

export default function UnitForm({ setModalOpen }: Props) {
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, },
    } = useForm<CreateUnitForm>({
        resolver: zodResolver(createUnitSchema),
        defaultValues: {
            bedrooms: 0,
            bathrooms: 0,
            rentPrice: 0,
            commonExpense: 0,
        },
    })

    const onSubmit = async (data: CreateUnitForm) => {
        try {
            await createUnitAction(data);
            window.location.reload();
        } catch (error) {
            if (isAxiosError(error)) {
                setError(error.response?.data ?? "Error desconocido");
            }
            else {
                setError("Error al crear la unidad");
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" placeholder="Ej: Av. Principal 123" {...register("address")} />
                        {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="number">Número</Label>
                        <Input id="number" placeholder="Ej: 101, A-5" {...register("number")} />
                        {errors.number && <p className="text-sm text-red-500">{errors.number.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="orientation">Orientación</Label>
                        <Select onValueChange={(value) => setValue("orientation", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar orientación" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="norte">Norte</SelectItem>
                                <SelectItem value="sur">Sur</SelectItem>
                                <SelectItem value="este">Este</SelectItem>
                                <SelectItem value="oeste">Oeste</SelectItem>
                                <SelectItem value="noreste">Noreste</SelectItem>
                                <SelectItem value="noroeste">Noroeste</SelectItem>
                                <SelectItem value="sureste">Sureste</SelectItem>
                                <SelectItem value="suroeste">Suroeste</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.orientation && <p className="text-sm text-red-500">{errors.orientation.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="model">Modelo</Label>
                        <Input id="model" placeholder="Ej: 1D+1B+KA,etc" {...register("model")} />
                        {errors.model && <p className="text-sm text-red-500">{errors.model.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="bedrooms">Dormitorios</Label>
                        <Input
                            id="bedrooms"
                            type="number"
                            min="0"
                            placeholder="0"
                            {...register("bedrooms", { valueAsNumber: true })}
                        />
                        {errors.bedrooms && <p className="text-sm text-red-500">{errors.bedrooms.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bathrooms">Baños</Label>
                        <Input
                            id="bathrooms"
                            type="number"
                            min="0"
                            placeholder="0"
                            {...register("bathrooms", { valueAsNumber: true })}
                        />
                        {errors.bathrooms && <p className="text-sm text-red-500">{errors.bathrooms.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="rentPrice">Precio de Arriendo</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <Input
                                id="rentPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-8"
                                {...register("rentPrice", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.rentPrice && <p className="text-sm text-red-500">{errors.rentPrice.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="commonExpense">Gastos Comunes</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <Input
                                id="commonExpense"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-8"
                                {...register("commonExpense", { valueAsNumber: true })}
                            />
                        </div>
                        {errors.commonExpense && <p className="text-sm text-red-500">{errors.commonExpense.message}</p>}
                    </div>
                </div>
                {
                    error && <p className="text-sm text-red-500">{error}</p>
                }

                <div className="flex justify-end space-x-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setModalOpen?.(false)}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Guardando..." : "Guardar Unidad"}
                    </Button>
                </div>
            </form>

        </div>
    )
}
