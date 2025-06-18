import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import OwnerForm from './OwnerForm';

export const OwnerDialog = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Añadir Propietario</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Añadir propietario</DialogTitle>
                    <DialogDescription>
                        Por favor, rellene los campos.
                    </DialogDescription>
                </DialogHeader>
                <OwnerForm setModalOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}