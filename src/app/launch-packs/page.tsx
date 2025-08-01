import { LaunchPackView } from './launchpack-view'
import { LaunchPack, Persona } from '@/lib/schema'
import Link from 'next/link'
import {
  generateLaunchPacks,
  getStoredLaunchPack,
  getStoredPersona,
} from '@/actions'

export default async function LaunchPacksPage() {
  const personas: Persona | null = await getStoredPersona()
  if (!personas) {
    return (
      <div className='p-4'>
        <h1 className='text-3xl font-[650] text-neutral-700'>Launch Packs.</h1>
        <p className='mt-2 text-gray-700'>
          Please generate a persona first to create launch packs.
        </p>
        <Link href='/persona' className='underline underline-offset-2'>
          Go to Personas Page
        </Link>
      </div>
    )
  }
  let launchPacks: LaunchPack | null
  try {
    launchPacks =
      (await getStoredLaunchPack()) || (await generateLaunchPacks(personas))
  } catch {
    launchPacks = null
  }
  if (!launchPacks) {
    return (
      <div className='p-4'>
        <h1 className='text-3xl font-[650] text-neutral-700'>Launch Packs.</h1>
        <p className='mt-2 text-gray-700'>
          Error generating launch packs . Please generate a persona first to
          create launch packs.
        </p>
        <Link href='/persona' className='underline underline-offset-2'>
          Go to Personas Page
        </Link>
        &thinsp;&thinsp;
        <Link href='/onboarding' className='underline underline-offset-2'>
          Go to Onboarding Page
        </Link>
      </div>
    )
  }
  console.log(launchPacks)
  return <LaunchPackView launchPacks={launchPacks} />
}
