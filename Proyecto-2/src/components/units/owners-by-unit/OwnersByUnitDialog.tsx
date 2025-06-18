import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getOwnersByUnit } from '@/data/get-owners-by-unit';
import type { Unit } from '@/entities/unit.entity';
import { Suspense, useState } from 'react';
import { OwnersByUnitList } from './OwnersByUnitList';

interface Props {
    unit: Unit
}

export const OwnersByUnitDialog = ({ unit }: Props) => {
    const ownersByUnitPromise = getOwnersByUnit(unit.id);
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Ver propietarios</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalles</DialogTitle>
                    <DialogDescription>
                        Propietarios de la unidad {unit.id} con dirección {unit.address} {unit.number}
                    </DialogDescription>
                </DialogHeader>
                <Suspense fallback={<div>Cargando propietarios...</div>}>
                    <OwnersByUnitList ownersByUnitPromise={ownersByUnitPromise} />
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}