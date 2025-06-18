import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import UnitForm from './UnitForm'

export const UnitDialog = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Añadir Unidad</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Añadir unidad</DialogTitle>
                    <DialogDescription>
                        Por favor, rellene los campos.
                    </DialogDescription>
                </DialogHeader>
                <UnitForm setModalOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}