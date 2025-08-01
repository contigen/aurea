'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  TrendingUp,
  Heart,
  Eye,
  Edit,
  MoreHorizontal,
  Sparkles,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Persona } from '@/lib/schema'
import { DynamicLucideIcon } from '@/components/dynamic-icon'

export function PersonasInterface({ personas }: { personas: Persona }) {
  const [selectedPersona, setSelectedPersona] = useState(personas[0])

  return (
    <div className='min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/20 dark:from-stone-950 dark:via-stone-900 dark:to-stone-800'>
      <div className='container mx-auto px-6 py-8'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <Badge
              variant='secondary'
              className='mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
            >
              <Sparkles className='size-4 mr-2' />
              Cultural Intelligence
            </Badge>
            <h1 className='text-4xl md:text-5xl font-light tracking-tight mb-4 bg-gradient-to-br from-stone-900 via-stone-700 to-amber-600 bg-clip-text text-transparent dark:from-stone-100 dark:via-stone-300 dark:to-amber-400'>
              Audience Personas
            </h1>
            <p className='text-lg text-stone-600 dark:text-stone-400'>
              Discover and analyze your ideal audience segments through
              AI-powered cultural insights
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-1 space-y-4'>
            {personas.map(persona => (
              <Card
                key={persona.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm ${
                  selectedPersona.id === persona.id
                    ? 'ring-2 ring-amber-400 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedPersona(persona)}
              >
                <CardContent className='p-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <div
                        className={`size-4 rounded-full shadow-inner ${persona.colour}`}
                      />
                      <div>
                        <h3 className='font-medium text-sm'>{persona.name}</h3>
                        <p className='text-xs text-stone-500 mt-1'>
                          {persona.size} audience
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='size--4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className='mr-2 size-4' />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className='mr-2 size-4' />
                          Edit Persona
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className='mt-3 flex items-center justify-between'>
                    <Badge
                      variant='secondary'
                      className='text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
                    >
                      <TrendingUp className='mr-1 size-3' />
                      {persona.growthRate}
                    </Badge>
                    <span className='text-xs text-stone-500'>
                      {persona.engagement}% engaged
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Persona Details */}
          <div className='lg:col-span-2'>
            <Card className='h-full border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={selectedPersona.avatar || '/placeholder.svg'}
                      />
                      <AvatarFallback className='bg-gradient-to-br from-amber-400 to-rose-400 text-white'>
                        <Users className='size-6' />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className='text-xl'>
                        {selectedPersona.name}
                      </CardTitle>
                      <CardDescription className='text-stone-600 dark:text-stone-400'>
                        {selectedPersona.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div
                    className={`size-6 rounded-full ${selectedPersona.colour}`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='overview' className='w-full'>
                  <TabsList className='grid w-full grid-cols-4 bg-stone-100 dark:bg-stone-800'>
                    <TabsTrigger value='overview'>Overview</TabsTrigger>
                    <TabsTrigger value='interests'>Interests</TabsTrigger>
                    <TabsTrigger value='platforms'>Platforms</TabsTrigger>
                    <TabsTrigger value='insights'>Insights</TabsTrigger>
                  </TabsList>

                  <TabsContent value='overview' className='space-y-6 mt-6'>
                    <div className='grid grid-cols-3 gap-4'>
                      <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-amber-50/50 dark:from-stone-800/80 dark:to-stone-700/50'>
                        <CardContent className='p-4 text-center'>
                          <Users className='h-8 w-8 mx-auto mb-2 text-amber-600' />
                          <div className='text-2xl font-bold'>
                            {selectedPersona.size}
                          </div>
                          <div className='text-sm text-stone-500'>
                            Total Audience
                          </div>
                        </CardContent>
                      </Card>
                      <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-rose-50/50 dark:from-stone-800/80 dark:to-stone-700/50'>
                        <CardContent className='p-4 text-center'>
                          <TrendingUp className='h-8 w-8 mx-auto mb-2 text-rose-500' />
                          <div className='text-2xl font-bold'>
                            {selectedPersona.growthRate}
                          </div>
                          <div className='text-sm text-stone-500'>
                            Growth Rate
                          </div>
                        </CardContent>
                      </Card>
                      <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-stone-50/50 dark:from-stone-800/80 dark:to-stone-700/50'>
                        <CardContent className='p-4 text-center'>
                          <Heart className='h-8 w-8 mx-auto mb-2 text-stone-600' />
                          <div className='text-2xl font-bold'>
                            {selectedPersona.engagement}%
                          </div>
                          <div className='text-sm text-stone-500'>
                            Engagement
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className='font-medium mb-3'>Engagement Score</h4>
                      <Progress
                        value={selectedPersona.engagement}
                        className='h-3 bg-stone-200 dark:bg-stone-700'
                      />
                      <div className='flex justify-between text-sm text-stone-500 mt-1'>
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='interests' className='space-y-4 mt-6'>
                    <h4 className='font-medium'>Top Interests</h4>
                    <div className='grid grid-cols-2 gap-4'>
                      {selectedPersona.interests.map(
                        ({ title, affinity, icon }, index) => (
                          <Card
                            key={index}
                            className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-amber-50/30 dark:from-stone-800/80 dark:to-stone-700/30'
                          >
                            <CardContent className='p-4 flex items-center space-x-3'>
                              <div className='flex items-center gap-2'>
                                <div className='p-2 bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-900/50 dark:to-rose-900/50 rounded-lg'>
                                  <DynamicLucideIcon name={icon} />
                                </div>
                                <div>
                                  <div className='font-medium'>{title}</div>
                                  <div className='text-sm text-stone-500'>
                                    {affinity} affinity
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value='platforms' className='space-y-4 mt-6'>
                    <h4 className='font-medium'>Platform Presence</h4>
                    <div className='space-y-3'>
                      {selectedPersona.platforms.map((platform, index) => (
                        <Card
                          key={index}
                          className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-stone-50/30 dark:from-stone-800/80 dark:to-stone-700/30'
                        >
                          <CardContent className='p-4'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-3'>
                                <div className='w-8 h-8 bg-gradient-to-r from-amber-500 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold text-sm'>
                                  {platform[0]}
                                </div>
                                <span className='font-medium'>{platform}</span>
                              </div>
                              <Badge
                                variant='secondary'
                                className='bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
                              >
                                Active
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value='insights' className='space-y-4 mt-6'>
                    <h4 className='font-medium'>AI Insights</h4>
                    <div className='space-y-4'>
                      <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-amber-50/30 dark:from-stone-800/80 dark:to-stone-700/30'>
                        {selectedPersona.insights.map((insight, idx) => (
                          <CardContent className='p-4' key={idx}>
                            <h5 className='font-medium mb-1'>
                              {insight.title}
                            </h5>
                            <p className='text-sm text-stone-600 dark:text-stone-400'>
                              {insight.description}
                            </p>
                          </CardContent>
                        ))}
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
