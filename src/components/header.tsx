'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Sparkles, Users, Rocket, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  // {
  //   name: 'Dashboard',
  //   href: '/dashboard',
  //   icon: LayoutDashboard,
  // },
  {
    name: 'Personas',
    href: '/personas',
    icon: Users,
  },
  {
    name: 'Launch Packs',
    href: '/launch-packs',
    icon: Rocket,
  },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md'>
      <div className='container mx-auto px-6'>
        <div className='flex h-16 items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-xl font-bold bg-gradient-to-r from-amber-600 via-rose-500 to-stone-600 bg-clip-text text-transparent'>
              Aurea
            </span>
          </Link>

          <nav className='hidden md:flex items-center space-x-1'>
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50',
                  pathname === item.href &&
                    'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                )}
              >
                <item.icon className='mr-2 size-4' />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className='flex items-center space-x-4'>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='sm' className='md:hidden'>
                  <Menu className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-80'>
                <div className='flex flex-col space-y-4 mt-8'>
                  <div className='flex items-center space-x-2 px-4'>
                    <div className='size-8 bg-gradient-to-r from-amber-500 to-rose-500 rounded-lg flex items-center justify-center'>
                      <Sparkles className='size-5 text-white' />
                    </div>
                    <span className='text-xl font-bold bg-gradient-to-r from-amber-600 via-rose-500 to-stone-600 bg-clip-text text-transparent'>
                      Aurea
                    </span>
                  </div>

                  <nav className='flex flex-col space-y-2 px-4'>
                    {navigation.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
                          pathname === item.href &&
                            'bg-slate-100 dark:bg-slate-800'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className='size-4' />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
