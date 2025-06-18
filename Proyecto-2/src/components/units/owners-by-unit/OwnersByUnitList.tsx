import type { Owner } from '@/entities/owner.entity';
import { use } from 'react';

interface Props {
    ownersByUnitPromise: Promise<Owner[]>;
}
export const OwnersByUnitList = ({ ownersByUnitPromise }: Props) => {
    const owners = use(ownersByUnitPromise);
    return (
        <div>
            {
                owners.length > 0 ? (
                    <ul className='list-disc pl-5'>
                        {owners.map((owner) => (
                            <li key={owner.id}>
                                {owner.name} - {owner.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay propietarios para esta unidad.</p>
                )
            }
        </div>
    )
}