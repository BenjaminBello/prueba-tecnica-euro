import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createOwnerSchema } from '@/entities/owner.entity'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { createOwnerAction } from '@/actions/create-owner.action'

interface Props {
    setModalOpen?: (open: boolean) => void
}

type CreateOwnerForm = z.infer<typeof createOwnerSchema>

export default function OwnerForm({ setModalOpen }: Props) {
    const [state, setState] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateOwnerForm>({
        resolver: zodResolver(createOwnerSchema),
        defaultValues: {
            unitId: 0,
            ownershipPercentage: 0,
        },
    })

    const formatRut = (value: string) => {
        const cleaned = value.replace(/[^0-9kK]/g, "");

        if (cleaned.length === 0) return cleaned;
        const number = cleaned.slice(0, -1);
        const dv = cleaned.slice(-1);

        const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `${formattedNumber}-${dv}`;
    }

    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatRut(e.target.value);
        e.target.value = formatted;
    }

    const onSubmit = async (data: CreateOwnerForm) => {
        try {
            await createOwnerAction(data);
            window.location.reload();
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                setState(error.response?.data ?? "Error al guardar el propietario");
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input id="name" placeholder="Ej: John Doe" {...register("name")} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="rut">RUT</Label>
                        <Input
                            id="rut"
                            placeholder="12.345.678-9"
                            maxLength={12}
                            {...register("rut")}
                            onChange={handleRutChange}
                        />
                        {errors.rut && <p className="text-sm text-red-500">{errors.rut.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="ejemplo@correo.com" {...register("email")} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                        <Input id="birthDate" type="date" {...register("birthDate")} />
                        {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="unitId">ID de Unidad</Label>
                        <Input
                            id="unitId"
                            type="number"
                            min="1"
                            placeholder="Ej: 101"
                            {...register("unitId", { valueAsNumber: true })}
                        />
                        {errors.unitId && <p className="text-sm text-red-500">{errors.unitId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ownershipPercentage">Porcentaje de Propiedad (0-100%)</Label>
                        <div className="relative">
                            <Input
                                id="ownershipPercentage"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                placeholder="100.00"
                                className="pr-8"
                                {...register("ownershipPercentage", { valueAsNumber: true })}
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                        </div>
                        {errors.ownershipPercentage && (
                            <p className="text-sm text-red-500">{errors.ownershipPercentage.message}</p>
                        )}
                    </div>
                </div>

                {state && <p className="text-sm text-red-500">{state}</p>}

                <div className="flex justify-end space-x-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setModalOpen?.(false)}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Guardando..." : "Guardar Propietario"}
                    </Button>
                </div>
            </form>

        </div>
    )
}
