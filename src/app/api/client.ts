const BASE_URL = `https://hackathon.api.qloo.com`

const TOKEN = process.env.QLOO_API_KEY

export async function ApiClient<T>(
  endpoint: string,
  opts: RequestInit = {}
): Promise<T> {
  if (!TOKEN) throw new Error(`API Key not set`)

  const API_BASE_URL = `${BASE_URL}/${endpoint}`
  try {
    const headers: Record<string, string> = {
      'Content-Type': `application/json`,
      ...(TOKEN ? { 'X-Api-Key': TOKEN } : {}),
      ...((opts.headers as Record<string, string>) || {}),
    }

    const response = await fetch(API_BASE_URL, {
      headers,
      ...opts,
    })
    if (!response.ok) {
      try {
        const errResponse = await response.json()
        console.log(`API Error:`, errResponse)
      } catch {}
      const err = new Error(`HTTP Error`)
      err.name = `Error ${response.status}`
      err.cause = response.statusText
      throw err
    }
    return response.json()
  } catch (err: any) {
    throw new Error(err)
  }
}
