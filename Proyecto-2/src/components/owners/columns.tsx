
import type { Owner } from '@/entities/owner.entity';
import type { ColumnDef, FilterFn, Row } from "@tanstack/react-table";
import { Button } from '../ui/button';
import { UnitsByOwner } from './units-by-owner/UnitsByOwnerDialog';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const myCustomFilterFn: FilterFn<Owner> = (row: Row<Owner>, _columnId: string, filterValue: any, _addMeta: (meta: any) => void) => {
    if (row.original.name.toLowerCase().includes(filterValue.toLowerCase())) {
        return true;
    }
    if (row.original.rut.toLowerCase().includes(filterValue.toLowerCase())) {
        return true;
    }
    if (row.original.email.toLowerCase().includes(filterValue.toLowerCase())) {
        return true;
    }
    return false;
}

export const columns: ColumnDef<Owner>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
        filterFn: myCustomFilterFn,
    },
    {
        accessorKey: 'rut',
        header: 'RUT',
        filterFn: myCustomFilterFn,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        filterFn: myCustomFilterFn,
    },
    {
        accessorKey: 'birthDate',
        header: ({ column }) => {
            return (
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="ml-2"
                    >
                        Fecha de nacimiento {column.getIsSorted() === 'asc' ? "↑" : '↓'}
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const birthDate = row.getValue('birthDate') as Date;
            return birthDate.toLocaleDateString();
        },
    },
    {
        accessorKey: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            const owner = row.original;
            return (
                <div className="flex space-x-2">
                    <UnitsByOwner owner={owner} />
                </div>
            );
        },
    }

]