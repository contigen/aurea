'use server'

import { ApiClient } from '@/app/api/client'
import { Entity } from './types'
import { generateObject, generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { SYSTEM_INSTRUCTION } from './app/constant'
import {
  entitySchema,
  LaunchPack,
  launchPackSchema,
  Persona,
  personaSchema,
} from './lib/schema'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { uploadBase64ToPinata } from './lib/pinata'
import { resolveIPFS } from './lib/utils'

export async function findEntityById(entity_id: string[]) {
  const searchParams = new URLSearchParams({ entity_ids: entity_id.join(',') })

  const response = await ApiClient<Entity>(
    `entities?${searchParams.toString()}`
  )
  console.log('Entity response:', response)
  return response
}

export async function getQueryInsight(query: string) {
  const response = await ApiClient('insights/query', {
    method: 'POST',
    body: JSON.stringify({ query }),
  })
  console.log(response)
}

export async function getEntityInsight(query: string, entity_types?: string[]) {
  const params: Record<string, string> = {
    query,
    take: '4',
  }
  if (entity_types?.length) {
    params.types = entity_types.join(',')
  }
  const searchParams = new URLSearchParams(params)
  const { results } = await ApiClient<Entity>(
    `search?${searchParams.toString()}`
  )
  console.log('entity search response:', results[0])
  return results
}

export async function generatePersonaImage(prompt: string) {
  const { files } = await generateText({
    model: google('gemini-2.0-flash-preview-image-generation'),
    providerOptions: {
      google: { responseModalities: ['TEXT', 'IMAGE'] },
    },
    prompt,
  })

  const image = files[0]
  const { mimeType, base64 } = image
  const imageURL = await uploadBase64ToPinata(base64, mimeType)
  return {
    success: true,
    imageURL,
  }
}

export async function getEntities(text: string) {
  const { object } = await generateObject({
    model: google('gemini-2.5-pro'),
    system: SYSTEM_INSTRUCTION,
    prompt: `Extract entities contained in the following text: ${text} per the specified available entity categories.

Your response should be one or more from the above only that are inferred from the ${text} so somethin like: urn:entitiy:'entity_name'.
`,
    schema: entitySchema,
  })
  console.log('Entities:', object)
  return object
}

export async function generatePersonas(data: string) {
  const { object: personas } = await generateObject({
    model: google('gemini-2.5-pro'),
    system: SYSTEM_INSTRUCTION,
    prompt: `Generate 5 personas based on the following data:
    ${data}
    The colour should be a tailwind bg gradient and should be visible against a white bg; engagement should be a number between 0 and 100, icon name should be from lucide-react icons, `,
    schema: personaSchema,
  })
  console.log('Generated personas:', personas)
  return await Promise.all(
    personas.map(async persona => {
      const { success, imageURL } = await generatePersonaImage(
        persona.avatarPrompt
      )
      console.log('Generated persona image:', success, imageURL)
      return { ...persona, avatar: success ? resolveIPFS(imageURL) : '' }
    })
  )
}

export async function computePersona(input: string, data: string) {
  const insights = await getEntityInsight(input)
  const personas = await generatePersonas(JSON.stringify(insights) + data)
  await storePersona(personas)
  redirect('/personas')
}

export async function storePersona(data: Persona) {
  const _cookies = await cookies()
  const jsonData = JSON.stringify(data)
  const chunkSize = 2500

  const existingCookies = _cookies.getAll()
  const personaCookies = existingCookies.filter(c =>
    c.name.startsWith('persona')
  )
  personaCookies.forEach(cookie => _cookies.delete(cookie.name))

  const chunks = []
  for (let i = 0; i < jsonData.length; i += chunkSize) {
    chunks.push(jsonData.slice(i, i + chunkSize))
  }
  const failedChunks = []
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const chunkName = `persona_${i}`

    try {
      _cookies.set(chunkName, chunk, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
      })

      const verification = _cookies.get(chunkName)
      if (!verification) {
        failedChunks.push(i)
      }
    } catch {
      failedChunks.push(i)
    }
  }

  if (failedChunks.length > 0) {
    return false
  }

  _cookies.set('persona_count', chunks.length.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
  })

  return true
}

export async function getStoredPersona() {
  const _cookies = await cookies()
  const countCookie = _cookies.get('persona_count')

  if (!countCookie) return null

  const chunkCount = +countCookie.value
  let cookieDataString = ''

  for (let i = 0; i < chunkCount; i++) {
    const chunk = _cookies.get(`persona_${i}`)
    if (!chunk) return null
    cookieDataString += chunk.value
  }

  try {
    return JSON.parse(cookieDataString)
  } catch {
    return null
  }
}

export async function generateLaunchPacks(data: Persona) {
  const { object } = await generateObject({
    model: google('gemini-2.5-pro'),
    system: SYSTEM_INSTRUCTION,
    prompt: `Generate a launch pack based on the following persona:
    ${JSON.stringify(data)}
    current date: ${new Date().toISOString()} 
    if any requested content already exists in the data supplied, use it.
    icons should be emoji characters like 🎬
The colour should be a tailwind bg gradient and should be visible against a white bg
    `,
    schema: launchPackSchema,
  })
  await storeLaunchPack(object)
  return object
}

export async function storeLaunchPack(data: LaunchPack) {
  const _cookies = await cookies()
  const jsonData = JSON.stringify(data)
  const chunkSize = 2500

  const existingCookies = _cookies.getAll()
  const launchPackCookies = existingCookies.filter(c =>
    c.name.startsWith('launchpack')
  )

  launchPackCookies.forEach(cookie => _cookies.delete(cookie.name))

  const chunks = []
  for (let i = 0; i < jsonData.length; i += chunkSize) {
    chunks.push(jsonData.slice(i, i + chunkSize))
  }

  const failedChunks = []

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const chunkName = `launchpack_${i}`

    try {
      _cookies.set(chunkName, chunk, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
      })

      const verification = _cookies.get(chunkName)
      if (!verification || verification.value !== chunk) {
        failedChunks.push(i)
      }
    } catch {
      failedChunks.push(i)
    }
  }

  if (failedChunks.length > 0) {
    return false
  }

  _cookies.set('launchpack_count', chunks.length.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
  })

  return true
}

export async function getStoredLaunchPack(): Promise<LaunchPack | null> {
  const _cookies = await cookies()
  const countCookie = _cookies.get('launchpack_count')

  if (!countCookie) return null

  const chunkCount = +countCookie.value
  let reassembled = ''

  for (let i = 0; i < chunkCount; i++) {
    const chunk = _cookies.get(`launchpack_${i}`)
    if (!chunk) return null
    reassembled += chunk.value
  }

  try {
    return JSON.parse(reassembled)
  } catch {
    return null
  }
}
