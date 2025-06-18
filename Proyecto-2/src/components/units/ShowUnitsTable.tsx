import type { Unit } from '@/entities/unit.entity';
import { use } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';

interface Props {
    unitsPromise: Promise<Unit[]>;
}
export const ShowUnitsTable = ({ unitsPromise }: Props) => {
    const units = use(unitsPromise);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Unidades</h1>
            <DataTable columns={columns} data={units} />
        </div>
    )
}