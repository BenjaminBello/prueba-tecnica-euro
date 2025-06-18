import type { Owner } from '@/entities/owner.entity';
import { use } from 'react';
import { columns } from './columns';
import { DataTable } from './data-table';

interface Props {
    ownersPromise: Promise<Owner[]>;
}

export const ShowOwners = ({ ownersPromise }: Props) => {
    const owners = use(ownersPromise);

    return (

        <div>
            <h1 className="text-2xl font-bold mb-4">Propietarios</h1>
            <DataTable columns={columns} data={owners} />
        </div>
    )
}