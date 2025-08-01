import { LucideProps } from 'lucide-react'
import {
  ComponentType,
  ForwardRefExoticComponent,
  lazy,
  RefAttributes,
  Suspense,
} from 'react'

export function DynamicLucideIcon({ name }: { name: string }) {
  // name = name.toLowerCase()
  // const iconName = name.charAt(0).toUpperCase() + name.slice(1)

  const Icon = lazy(() =>
    import('lucide-react').then(mod => {
      const iconComponent = mod[name] as
        | ComponentType<
            ForwardRefExoticComponent<
              Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
            >
          >
        | undefined
      return {
        default: iconComponent ?? mod.BookOpen,
      }
    })
  )

  return (
    <Suspense fallback={null}>
      <Icon className='size-5 text-amber-600' />
    </Suspense>
  )
}
