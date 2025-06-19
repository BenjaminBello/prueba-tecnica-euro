import type { Unit } from '@/entities/unit.entity';
import { use } from 'react';

interface Props {
    unitsByOwnerPromise: Promise<Unit[]>;
}
export const UnitsByOwnerList = ({ unitsByOwnerPromise }: Props) => {
    const units = use(unitsByOwnerPromise);
    return (
        <div>
            {
                units.length > 0 ? (
                    <ul className='list-disc pl-5'>
                        {units.map((unit) => (
                            <li key={unit.id}>
                                {unit.address} {unit.number}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay unidades para este propietario.</p>
                )
            }
        </div>
    )
}