import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getUnitsByOwner } from '@/data/get-units-by-owner';
import type { Owner } from '@/entities/owner.entity';
import { Suspense, useState } from 'react';
import { UnitsByOwnerList } from './UnitsByOwnerList';

interface Props {
    owner: Owner
}

export const UnitsByOwner = ({ owner }: Props) => {
    const unitsByOwnerPromise = getUnitsByOwner(owner.id);
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Ver unidades</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalles</DialogTitle>
                    <DialogDescription>
                        Unidades pertenecientes a {owner.name};
                    </DialogDescription>
                </DialogHeader>
                <Suspense fallback={<div>Cargando unidades...</div>}>
                    <UnitsByOwnerList unitsByOwnerPromise={unitsByOwnerPromise} />
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}