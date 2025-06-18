import { Suspense } from 'react';
import { ShowUnitsTable } from './components/units/ShowUnitsTable'
import { getUnits } from './data/get-units'
import { getOwners } from './data/get-owners';
import { ShowOwners } from './components/owners/ShowOwners';

function App() {
  const unitsPromise = getUnits();
  const ownersPromise = getOwners();
  return (
    <main className='bg-background min-h-screen flex flex-col items-center py-16 px-4 max-w-7xl mx-auto'>


      <Suspense fallback={<div>Cargando unidades...</div>}>
        <ShowUnitsTable unitsPromise={unitsPromise} />
      </Suspense>

      <Suspense fallback={<div>Cargando propietarios...</div>}>
        <ShowOwners ownersPromise={ownersPromise} />
      </Suspense>

    </main>
  )
}

export default App
