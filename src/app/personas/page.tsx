import { PersonasInterface } from './personas-interface'
import { getStoredPersona } from '@/actions'
import { Persona } from '@/lib/schema'
import Link from 'next/link'

export default async function PersonasPage() {
  const personas: Persona | null = await getStoredPersona()
  console.log(personas)
  if (!personas) {
    return (
      <div className='p-4'>
        <h1 className='text-3xl font-[650] text-neutral-700'>Personas.</h1>
        <p className='mt-2 text-gray-700'>
          Please go to onboarding first to generate personas.
        </p>
        <Link href='/onboarding' className='underline underline-offset-2'>
          Go to Onboarding Page
        </Link>
      </div>
    )
  }
  return <PersonasInterface personas={personas} />
}
