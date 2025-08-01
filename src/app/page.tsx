import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Users, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { TasteGraph } from './taste-graph'

export default function LandingPage() {
  return (
    <div className='min-h-screen'>
      <section className='container mx-auto px-6 pt-20 pb-16'>
        <div className='max-w-4xl mx-auto text-center'>
          <Badge
            variant='secondary'
            className='mb-6 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
          >
            <Sparkles className='w-4 h-4 mr-2' />
            AI-Powered Cultural Intelligence
          </Badge>

          <h1 className='text-5xl md:text-7xl font-light tracking-tight mb-8 bg-gradient-to-br from-stone-900 via-stone-700 to-amber-600 bg-clip-text text-transparent dark:from-stone-100 dark:via-stone-300 dark:to-amber-400'>
            Discover Your
            <br />
            <span className='font-medium'>Ideal Audience</span>
          </h1>

          <p className='text-xl text-stone-600 dark:text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed'>
            Aurea uses taste data and cultural intelligence to help indie
            creators and niche brands find their perfect audience through the
            power of AI.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
            <Link href='/onboarding'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white border-0'
              >
                Start Discovery
                <ArrowRight className='w-5 h-5 ml-2' />
              </Button>
            </Link>
            <Button
              variant='outline'
              size='lg'
              className='border-stone-300 dark:border-stone-600 bg-transparent'
            >
              Watch Demo
            </Button>
          </div>
          <TasteGraph />
        </div>
      </section>
      <section className='container mx-auto px-6 py-20'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-light tracking-tight mb-6'>
              Your Creative Intelligence Assistant
            </h2>
            <p className='text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto'>
              Transform cultural insights into actionable audience strategies
              with our AI-powered platform.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <Card className='border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm'>
              <CardContent className='p-8'>
                <div className='w-12 h-12 bg-gradient-to-br from-amber-400 to-rose-400 rounded-xl flex items-center justify-center mb-6'>
                  <Target className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-xl font-medium mb-4'>
                  Taste Graph Analysis
                </h3>
                <p className='text-stone-600 dark:text-stone-400 leading-relaxed'>
                  Interactive visualization of cultural affinities and taste
                  clusters that define your ideal audience.
                </p>
              </CardContent>
            </Card>

            <Card className='border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm'>
              <CardContent className='p-8'>
                <div className='w-12 h-12 bg-gradient-to-br from-rose-400 to-amber-400 rounded-xl flex items-center justify-center mb-6'>
                  <Users className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-xl font-medium mb-4'>Audience Personas</h3>
                <p className='text-stone-600 dark:text-stone-400 leading-relaxed'>
                  Detailed personas with moodboards, cultural preferences, and
                  platform recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className='border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm'>
              <CardContent className='p-8'>
                <div className='w-12 h-12 bg-gradient-to-br from-amber-400 to-rose-400 rounded-xl flex items-center justify-center mb-6'>
                  <Zap className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-xl font-medium mb-4'>Launch Packs</h3>
                <p className='text-stone-600 dark:text-stone-400 leading-relaxed'>
                  One-click export of tailored brand copy, visual tone, and
                  community strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className='container mx-auto px-6 py-20'>
        <div className='max-w-4xl mx-auto text-center'>
          <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-amber-50/50 dark:from-stone-800/80 dark:to-stone-700/50 backdrop-blur-sm'>
            <CardContent className='p-12'>
              <h2 className='text-3xl md:text-4xl font-light tracking-tight mb-6'>
                Ready to Find Your Tribe?
              </h2>
              <p className='text-lg text-stone-600 dark:text-stone-400 mb-8 max-w-2xl mx-auto'>
                Join creators who&apos;ve discovered their perfect audience
                through cultural intelligence and AI-powered insights.
              </p>
              <Link href='/onboarding'>
                <Button
                  size='lg'
                  className='bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white border-0'
                >
                  Begin Your Journey
                  <ArrowRight className='size-5 ml-2' />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
