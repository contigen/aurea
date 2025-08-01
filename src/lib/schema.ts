import { platform } from 'os'
import { date, z } from 'zod'

export const entitySchema = z.array(
  z.object({
    entityType: z.string(),
    label: z.string(),
  })
)

export const personaSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    character: z.string(),
    name: z.string(),
    description: z.string(),
    size: z.string(),
    totalAudience: z.string(),
    growthRate: z.string(),
    colour: z.string(),
    engagement: z.number(),
    interests: z.array(
      z.object({
        title: z.string(),
        affinity: z.string(),
        icon: z.string(),
      })
    ),
    insights: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    platforms: z.array(z.string()),
    avatarPrompt: z.string(),
    avatar: z.string().default(''),
  })
)

export const launchPackSchema = z.object({
  packs: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      persona: z.string(),
      platforms: z.array(z.string()),
      contentPieces: z.number(),
      estimatedReach: z.string(),
      engagement: z.number(),
      timeline: z.string(),
      colour: z.string(),
    })
  ),
  schedule: z.array(
    z.object({
      date: z.string(),
      platform: z.string(),
      type: z.string(),
    })
  ),
  content: z.array(
    z.object({
      type: z.string(),
      platform: z.string(),
      hashtags: z.array(z.string()),
      content: z.string(),
      count: z.number(),
      estimatedReach: z.string(),
      estimatedEngagement: z.string(),
      icon: z.string(),
    })
  ),
  contentPreview: z.object({
    cotent: z.string(),
    type: z.string(),
    platform: z.string(),
  }),
})

export type Persona = z.infer<typeof personaSchema>

export type LaunchPack = z.infer<typeof launchPackSchema>
