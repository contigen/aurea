'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowRight,
  ArrowLeft,
  Music,
  Film,
  Palette,
  BookOpen,
} from 'lucide-react'
import { computePersona } from '@/actions'

const culturalCategories = [
  { id: 'music', label: 'Music', icon: Music },
  { id: 'film', label: 'Film & TV', icon: Film },
  { id: 'fashion', label: 'Fashion', icon: Palette },
  { id: 'books', label: 'Books & Literature', icon: BookOpen },
]

const toneOptions = [
  {
    value: 'minimalist',
    label: 'Minimalist & Clean',
    preview: 'Less is more. Refined simplicity.',
  },
  {
    value: 'artisanal',
    label: 'Artisanal & Crafted',
    preview: 'Handmade with care and attention.',
  },
  {
    value: 'editorial',
    label: 'Editorial & Sophisticated',
    preview: 'Thoughtful, curated, intelligent.',
  },
  {
    value: 'experimental',
    label: 'Experimental & Bold',
    preview: 'Pushing boundaries, breaking norms.',
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    brandDescription: '',
    culturalInspirations: [] as string[],
    tone: '',
  })
  const [pending, startTransition] = useTransition()

  const handleCulturalToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      culturalInspirations: prev.culturalInspirations.includes(categoryId)
        ? prev.culturalInspirations.filter(id => id !== categoryId)
        : [...prev.culturalInspirations, categoryId],
    }))
  }

  const handleGenerate = () =>
    startTransition(
      async () =>
        await computePersona(
          formData.brandDescription,
          `Cultural inspirations: ${formData.culturalInspirations.join(
            ', '
          )}. Tone: ${formData.tone}.
      `
        )
    )

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.brandDescription.trim().length > 0
      case 2:
        return formData.culturalInspirations.length > 0
      case 3:
        return formData.tone !== ''
      default:
        return false
    }
  }

  const stepTitles: { [key: number]: string } = {
    1: 'Tell us about your brand',
    2: 'What inspires you culturally?',
    3: 'Choose your brand tone',
  }

  return (
    <div className='min-h-screen py-12'>
      <div className='container mx-auto px-6 max-w-2xl'>
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <span className='text-sm text-stone-600 dark:text-stone-400'>
              Step {currentStep} of 3
            </span>
            <span className='text-sm text-stone-600 dark:text-stone-400'>
              {Math.round((currentStep / 3) * 100)}%
            </span>
          </div>
          <div className='w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2'>
            <div
              className='bg-gradient-to-r from-amber-500 to-rose-500 h-2 rounded-full transition-all duration-500'
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className='border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm'>
          <CardHeader className='text-center pb-8'>
            <CardTitle className='text-2xl font-light tracking-tight'>
              {stepTitles[currentStep]}
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-8'>
            {currentStep === 1 && (
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium mb-3'>
                    Describe your brand or product
                  </label>
                  <Textarea
                    placeholder='e.g., Handcrafted ceramic mugs for coffee enthusiasts who appreciate minimalist design...'
                    value={formData.brandDescription}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        brandDescription: e.target.value,
                      }))
                    }
                    className='min-h-32 resize-none border-stone-300 dark:border-stone-600'
                  />
                </div>
                <div className='text-xs text-stone-500 dark:text-stone-400'>
                  Be specific about your product, values, and what makes you
                  unique.
                </div>
              </div>
            )}{' '}
            {currentStep === 2 && (
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium mb-4'>
                    Select your cultural inspirations
                  </label>
                  <div className='grid grid-cols-2 gap-4'>
                    {culturalCategories.map(category => {
                      const Icon = category.icon
                      const isSelected = formData.culturalInspirations.includes(
                        category.id
                      )
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCulturalToggle(category.id)}
                          className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                              : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                          }`}
                        >
                          <Icon
                            className={`size-8 mx-auto mb-3 ${
                              isSelected ? 'text-amber-600' : 'text-stone-500'
                            }`}
                          />
                          <div className='text-sm font-medium'>
                            {category.label}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className='text-xs text-stone-500 dark:text-stone-400'>
                  Choose the cultural areas that most influence your brand
                  aesthetic.
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium mb-4'>
                    Select your brand tone
                  </label>
                  <div className='space-y-3'>
                    {toneOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setFormData(prev => ({ ...prev, tone: option.value }))
                        }
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          formData.tone === option.value
                            ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                            : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                        }`}
                      >
                        <div className='font-medium mb-1'>{option.label}</div>
                        <div className='text-sm text-stone-600 dark:text-stone-400'>
                          {option.preview}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className='flex justify-between pt-8'>
              <Button
                variant='outline'
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
                className='border-stone-300 dark:border-stone-600'
              >
                <ArrowLeft className='size-4 mr-2' />
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!canProceed()}
                  className='bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white border-0'
                >
                  Continue
                  <ArrowRight className='size-4 ml-2' />
                </Button>
              ) : (
                <Button
                  onClick={handleGenerate}
                  disabled={!canProceed()}
                  className='bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white border-0'
                  pending={pending}
                >
                  Generate Profile
                  <ArrowRight className='size-4 ml-2' />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
