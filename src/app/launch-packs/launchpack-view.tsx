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
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Rocket,
  Plus,
  Download,
  Target,
  Zap,
  Sparkles,
  Clock,
  CheckCircle,
  ArrowRight,
  MoreHorizontal,
  Copy,
  Edit,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Check,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { LaunchPack } from '@/lib/schema'

export function LaunchPackView({ launchPacks }: { launchPacks: LaunchPack }) {
  const [selectedPack, setSelectedPack] = useState(launchPacks.packs[0])
  const [selectedContentType, setSelectedContentType] = useState('Social Posts')
  const [copiedItems, setCopiedItems] = useState<Set<number>>(new Set())

  const copyToClipboard = async (
    content: string,
    id: number,
    type = 'content'
  ) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedItems(prev => new Set(prev).add(id))

      toast.info('Copied to clipboard!', {
        description: `${type} has been copied successfully.`,
      })

      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }, 2000)
    } catch {
      toast.error('Failed to copy', {
        description: 'Please try again or copy manually.',
      })
    }
  }

  const getContentToCopy = (content: LaunchPack['content'][0]) => {
    let copyText = content.content
    if (content.hashtags && content.hashtags.length > 0) {
      copyText += '\n\n' + content.hashtags.join(' ')
    }
    return copyText
  }

  const ContentPreviewModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm'>
          View All <ArrowRight className='ml-1 size-3' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-7xl w-[95vw] h-[90vh] p-0 bg-gradient-to-br from-white/95 to-amber-50/50 dark:from-stone-900/95 dark:to-stone-800/50 backdrop-blur-sm border-stone-200 dark:border-stone-700'>
        <DialogHeader className='p-6 pb-0'>
          <DialogTitle className='flex items-center space-x-2'>
            <Sparkles className='size-5 text-amber-500' />
            <span className='bg-gradient-to-r from-stone-900 to-amber-600 bg-clip-text text-transparent dark:from-stone-100 dark:to-amber-400'>
              All Content - {selectedPack.title}
            </span>
          </DialogTitle>
          <DialogDescription className='text-stone-600 dark:text-stone-400'>
            Browse and manage all generated content pieces for this campaign
          </DialogDescription>
        </DialogHeader>

        <div className='flex h-[calc(90vh-120px)] overflow-hidden'>
          <div className='w-64 border-r border-stone-200 dark:border-stone-700 flex-shrink-0 bg-gradient-to-b from-stone-50/50 to-amber-50/30 dark:from-stone-800/50 dark:to-stone-700/30'>
            <ScrollArea className='h-full px-4'>
              <div className='py-4'>
                <h4 className='font-medium mb-3'>Content Types</h4>
                <div className='space-y-2'>
                  {launchPacks.content.map((pack, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedContentType(pack.type)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedContentType === pack.type
                          ? 'bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900/50 dark:to-rose-900/50 border border-amber-200 dark:border-amber-800'
                          : 'hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-lg'>{pack.icon}</span>
                          <span className='font-medium text-sm'>
                            {pack.type}
                          </span>
                        </div>
                        <Badge
                          variant='secondary'
                          className='text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
                        >
                          {pack.content.length}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          <div className='flex-1 flex flex-col overflow-hidden'>
            <div className='flex items-center justify-between p-6 pb-4 border-b border-stone-200 dark:border-stone-700'>
              <h4 className='font-medium'>{selectedContentType}</h4>
            </div>

            <ScrollArea className='flex-1 px-6'>
              <div className='space-y-4 py-4'>
                {launchPacks.content.map((pack, idx) => (
                  <Card
                    key={idx}
                    className='hover:shadow-md transition-shadow border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-amber-50/30 dark:from-stone-800/80 dark:to-stone-700/30 backdrop-blur-sm'
                  >
                    <CardContent className='p-4'>
                      <div className='flex items-start justify-between mb-3'>
                        <div className='flex items-center space-x-3'>
                          <div className='flex items-center space-x-2'>
                            <span className='text-lg'>{pack.icon}</span>
                            <Badge
                              variant='outline'
                              className='text-xs border-amber-200 text-amber-800 dark:border-amber-800 dark:text-amber-200'
                            >
                              {pack.platform}
                            </Badge>
                          </div>
                          <Badge
                            variant='secondary'
                            className='text-xs bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200'
                          >
                            {pack.type}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              <MoreHorizontal className='size-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='bg-white/95 dark:bg-stone-800/95 backdrop-blur-sm border-stone-200 dark:border-stone-700'>
                            <DropdownMenuItem>
                              <Edit className='mr-2 size-4' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                copyToClipboard(
                                  getContentToCopy(pack),
                                  pack.count
                                )
                              }
                            >
                              <Copy className='mr-2 size-4' />
                              Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className='mr-2 size-4' />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className='mr-2 size-4' />
                              Share
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className='bg-gradient-to-br from-stone-50/80 to-amber-50/50 dark:from-stone-800/80 dark:to-stone-700/50 rounded-lg p-3 mb-3 relative backdrop-blur-sm'>
                        <p className='text-sm leading-relaxed whitespace-pre-line'>
                          {pack.content}
                        </p>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='absolute top-2 right-2 size-6 p-0'
                          onClick={() =>
                            copyToClipboard(pack.content, pack.count, 'Content')
                          }
                        >
                          {copiedItems.has(pack.count) ? (
                            <Check className='size-3 text-amber-600' />
                          ) : (
                            <Copy className='size-3' />
                          )}
                        </Button>
                      </div>

                      {pack.hashtags && pack.hashtags.length > 0 && (
                        <div className='mb-3 relative'>
                          <span className='text-xs text-stone-500'>
                            Hashtags:{' '}
                          </span>
                          <span className='text-xs text-amber-600 dark:text-amber-400'>
                            {pack.hashtags.join(' ')}
                          </span>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='absolute top-0 right-0 size-4 p-0'
                            onClick={() =>
                              copyToClipboard(
                                pack.hashtags.join(' '),
                                pack.count + 1000,
                                'Hashtags'
                              )
                            }
                          >
                            {copiedItems.has(pack.count + 1000) ? (
                              <Check className='size-2 text-amber-600' />
                            ) : (
                              <Copy className='size-2' />
                            )}
                          </Button>
                        </div>
                      )}

                      <Separator className='my-3 bg-stone-200 dark:bg-stone-700' />

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-4 text-xs text-stone-500'>
                          <div className='flex items-center space-x-1'>
                            <Eye className='size-3' />
                            <span>{pack.estimatedReach}</span>
                          </div>
                          <div className='flex items-center space-x-1'>
                            <Heart className='size-3' />
                            <span>{pack.estimatedEngagement}</span>
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='border-stone-300 dark:border-stone-600 bg-transparent'
                            onClick={() =>
                              copyToClipboard(
                                getContentToCopy(pack),
                                pack.count + 2000,
                                'Full content'
                              )
                            }
                          >
                            {copiedItems.has(pack.count + 2000) ? (
                              <Check className='mr-1 size-3 text-amber-600' />
                            ) : (
                              <Copy className='mr-1 size-3' />
                            )}
                            Copy All
                          </Button>
                          <Button
                            size='sm'
                            className='bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white border-0'
                          >
                            <Bookmark className='mr-1 size-3' />
                            Use
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

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
              AI-Powered Campaigns
            </Badge>
            <h1 className='text-4xl md:text-5xl font-light tracking-tight mb-4 bg-gradient-to-br from-stone-900 via-stone-700 to-amber-600 bg-clip-text text-transparent dark:from-stone-100 dark:via-stone-300 dark:to-amber-400'>
              Launch Packs
            </h1>
            <p className='text-lg text-stone-600 dark:text-stone-400'>
              AI-generated marketing campaigns tailored to your audience
              personas
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-1 space-y-4'>
            {launchPacks.packs.map(pack => (
              <Card
                key={pack.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm ${
                  selectedPack.id === pack.id
                    ? 'ring-2 ring-amber-400 shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedPack(pack)}
              >
                <CardContent className='p-4'>
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex items-center space-x-3'>
                      <div className={`size-4 rounded-full ${pack.colour}`} />
                      <div>
                        <h3 className='font-medium text-sm'>{pack.title}</h3>
                        <p className='text-xs text-stone-500 mt-1'>
                          {pack.persona}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between text-xs'>
                      <span className='text-stone-500'>Content pieces</span>
                      <span className='font-medium'>{pack.contentPieces}</span>
                    </div>
                    <div className='flex items-center justify-between text-xs'>
                      <span className='text-stone-500'>Est. reach</span>
                      <span className='font-medium'>{pack.estimatedReach}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='lg:col-span-2'>
            <Card className='h-full border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='p-3 bg-gradient-to-r from-amber-500 to-rose-500 rounded-lg'>
                      <Rocket className='size-6 text-white' />
                    </div>
                    <div>
                      <CardTitle className='text-xl'>
                        {selectedPack.title}
                      </CardTitle>
                      <CardDescription className='text-stone-600 dark:text-stone-400'>
                        {selectedPack.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='overview' className='w-full'>
                  <TabsList className='grid w-full grid-cols-4 bg-stone-100 dark:bg-stone-800'>
                    <TabsTrigger value='overview'>Overview</TabsTrigger>
                    <TabsTrigger value='content'>Content</TabsTrigger>
                    <TabsTrigger value='schedule'>Schedule</TabsTrigger>
                    <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value='overview' className='space-y-6 mt-6'>
                    <div className='grid grid-cols-3 gap-4'>
                      <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-amber-50/50 dark:from-stone-800/80 dark:to-stone-700/50'>
                        <CardContent className='p-4 text-center'>
                          <Target className='size-8 mx-auto mb-2 text-amber-600' />
                          <div className='text-2xl font-bold'>
                            {selectedPack.estimatedReach}
                          </div>
                          <div className='text-sm text-stone-500'>
                            Est. Reach
                          </div>
                        </CardContent>
                      </Card>
                      <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-rose-50/50 dark:from-stone-800/80 dark:to-stone-700/50'>
                        <CardContent className='p-4 text-center'>
                          <Zap className='size-8 mx-auto mb-2 text-rose-500' />
                          <div className='text-2xl font-bold'>
                            {selectedPack.engagement}%
                          </div>
                          <div className='text-sm text-stone-500'>
                            Engagement
                          </div>
                        </CardContent>
                      </Card>
                      <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-stone-50/50 dark:from-stone-800/80 dark:to-stone-700/50'>
                        <CardContent className='p-4 text-center'>
                          <Clock className='size-8 mx-auto mb-2 text-stone-600' />
                          <div className='text-2xl font-bold'>
                            {selectedPack.timeline}
                          </div>
                          <div className='text-sm text-stone-500'>Timeline</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className='font-medium mb-3'>Target Platforms</h4>
                      <div className='flex flex-wrap gap-2'>
                        {selectedPack.platforms.map((platform, index) => (
                          <Badge
                            key={index}
                            variant='secondary'
                            className='px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
                          >
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className='font-medium mb-3'>Campaign Progress</h4>
                      <Progress
                        value={85}
                        className='h-3 bg-stone-200 dark:bg-stone-700'
                      />
                      <div className='flex justify-between text-sm text-stone-500 mt-1'>
                        <span>Draft</span>
                        <span>Ready</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='content' className='space-y-4 mt-6'>
                    <h4 className='font-medium'>Content Breakdown</h4>
                    <div className='grid grid-cols-2 gap-4'>
                      {launchPacks.content.map((pack, index) => {
                        const contentCount = pack.content.length
                        const sampleContent = launchPacks.content[index]
                        return (
                          <Card
                            key={index}
                            className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-amber-50/30 dark:from-stone-800/80 dark:to-stone-700/30'
                          >
                            <CardContent className='p-4'>
                              <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-3'>
                                  <span className='text-2xl'>
                                    {sampleContent?.icon}
                                  </span>
                                  <div>
                                    <div className='font-medium text-sm'>
                                      {pack.type}
                                    </div>
                                    <div className='text-xs text-stone-500'>
                                      {contentCount} pieces
                                    </div>
                                  </div>
                                </div>
                                <CheckCircle className='size-5 text-amber-600' />
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    <Card className='mt-6 border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-stone-50/30 dark:from-stone-800/80 dark:to-stone-700/30'>
                      <CardContent className='p-4'>
                        <h5 className='font-medium mb-3'>
                          Sample Content Preview
                        </h5>
                        <div className='bg-gradient-to-br from-stone-50/80 to-amber-50/50 dark:from-stone-800/80 dark:to-stone-700/50 rounded-lg p-4'>
                          <p className='text-sm italic'>
                            {launchPacks.contentPreview.cotent}
                          </p>
                        </div>
                        <div className='flex justify-between items-center mt-3'>
                          <Badge
                            variant='outline'
                            className='border-amber-200 text-amber-800 dark:border-amber-800 dark:text-amber-200'
                          >
                            {launchPacks.contentPreview.platform}{' '}
                            {launchPacks.contentPreview.type}
                          </Badge>
                          <ContentPreviewModal />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value='schedule' className='space-y-4 mt-6'>
                    <h4 className='font-medium'>Publishing Schedule</h4>
                    <div className='space-y-3'>
                      {launchPacks.schedule.map((item, index) => (
                        <Card
                          key={index}
                          className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-stone-50/30 dark:from-stone-800/80 dark:to-stone-700/30'
                        >
                          <CardContent className='p-4'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-4'>
                                <div className='text-center'>
                                  <div className='text-sm font-medium'>
                                    {item.date}
                                  </div>
                                </div>
                                <div>
                                  <div className='font-medium text-sm'>
                                    {item.platform}
                                  </div>
                                  <div className='text-xs text-stone-500'>
                                    {item.type}
                                  </div>
                                </div>
                              </div>
                              <div className='flex items-center space-x-2'>
                                <Badge
                                  variant='outline'
                                  className='border-amber-200 text-amber-800 dark:border-amber-800 dark:text-amber-200'
                                >
                                  Scheduled
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant='ghost' size='sm'>
                                      <MoreHorizontal className='size-4' />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className='bg-white/95 dark:bg-stone-800/95 backdrop-blur-sm border-stone-200 dark:border-stone-700'>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Reschedule
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Remove</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value='analytics' className='space-y-4 mt-6'>
                    <h4 className='font-medium'>Predicted Performance</h4>
                    <div className='grid grid-cols-2 gap-4'>
                      <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-amber-50/50 dark:from-stone-800/80 dark:to-stone-700/50'>
                        <CardContent className='p-4'>
                          <div className='flex items-center justify-between'>
                            <div>
                              <div className='text-2xl font-bold'>
                                {selectedPack.estimatedReach}
                              </div>
                              <div className='text-sm text-stone-500'>
                                Estimated Impressions
                              </div>
                            </div>
                            <Sparkles className='size-8 text-amber-500' />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-rose-50/50 dark:from-stone-800/80 dark:to-stone-700/50'>
                        <CardContent className='p-4'>
                          <div className='flex items-center justify-between'>
                            <div>
                              <div className='text-2xl font-bold'>
                                {selectedPack.engagement}%
                              </div>
                              <div className='text-sm text-stone-500'>
                                Expected Engagement Rate
                              </div>
                            </div>
                            <Target className='size-8 text-rose-500' />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className='border-stone-200 dark:border-stone-700 bg-gradient-to-br from-white/80 to-stone-50/30 dark:from-stone-800/80 dark:to-stone-700/30'>
                      <CardContent className='p-4'>
                        <h5 className='font-medium mb-3'>
                          Performance Insights
                        </h5>
                        <div className='space-y-3'>
                          <div className='flex items-start space-x-3'>
                            <div className='w-2 h-2 bg-amber-500 rounded-full mt-2' />
                            <div>
                              <div className='text-sm font-medium'>
                                High Engagement Potential
                              </div>
                              <div className='text-xs text-stone-500'>
                                Content aligns well with audience interests
                              </div>
                            </div>
                          </div>
                          <div className='flex items-start space-x-3'>
                            <div className='w-2 h-2 bg-rose-500 rounded-full mt-2' />
                            <div>
                              <div className='text-sm font-medium'>
                                Optimal Timing
                              </div>
                              <div className='text-xs text-stone-500'>
                                Scheduled during peak audience activity
                              </div>
                            </div>
                          </div>
                          <div className='flex items-start space-x-3'>
                            <div className='w-2 h-2 bg-stone-500 rounded-full mt-2' />
                            <div>
                              <div className='text-sm font-medium'>
                                Cross-Platform Synergy
                              </div>
                              <div className='text-xs text-stone-500'>
                                Content adapted for each platform&apos;s
                                strengths
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
