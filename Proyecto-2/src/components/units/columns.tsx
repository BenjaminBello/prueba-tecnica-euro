
import type { Unit } from '@/entities/unit.entity'
import type { ColumnDef, FilterFn, Row } from "@tanstack/react-table"
import { Button } from '../ui/button';
import { OwnersByUnitDialog } from './owners-by-unit/OwnersByUnitDialog';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const myCustomFilterFn: FilterFn<Unit> = (row: Row<Unit>, _columnId: string, filterValue: any, _addMeta: (meta: any) => void) => {
    if (row.original.address.trim().toLowerCase().includes(filterValue.trim().toLowerCase())) {
        return true;
    }
    if (row.original.number.toString().toLowerCase().includes(filterValue.trim().toLowerCase())) {
        return true;
    }
    if (row.original.model.trim().toLowerCase().includes(filterValue.trim().toLowerCase())) {
        return true;
    }
    return false;
}

export const columns: ColumnDef<Unit>[] = [
    {
        accessorKey: "id",
        header: "ID",
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "address",
        header: "Dirección",
        filterFn: myCustomFilterFn,
    },
    {
        accessorKey: "number",
        header: "Número",
        filterFn: myCustomFilterFn,
    },
    {
        accessorKey: "orientation",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className='w-full'
                    >
                        Orientación {column.getIsSorted() === "asc" ? "↑" : "↓"}
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <span className='capitalize'>{row.getValue("orientation")}</span>;
        }

    },
    {
        accessorKey: "bedrooms",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className='w-full'
                    >
                        Dormitorios {column.getIsSorted() === "asc" ? "↑" : "↓"}
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "bathrooms",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className='w-full'
                    >
                        Baños {column.getIsSorted() === "asc" ? "↑" : "↓"}
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: "model",
        header: "Modelo",
        filterFn: myCustomFilterFn,
    },
    {
        accessorKey: "rentPrice",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className='w-full'
                    >
                        Precio de arriendo {column.getIsSorted() === "asc" ? "↑" : "↓"}
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const rentPrice = row.getValue("rentPrice") as number;
            return <span>{`$ ${rentPrice}`}</span>;
        },
    },
    {
        accessorKey: "commonExpense",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className='w-full'
                    >
                        Gasto común {column.getIsSorted() === "asc" ? "↑" : "↓"}
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const commonExpense = row.getValue("commonExpense") as number;
            return <span>{`$ ${commonExpense}`}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const unit = row.original;
            return (
                <div className="flex space-x-2">
                    <OwnersByUnitDialog unit={unit} />
                </div>
            );
        },
    }
]