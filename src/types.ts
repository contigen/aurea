type BaseResponse<T> = {
  results: T[]
}

export type Tag = {
  name: string
  tag_id: string
  type: string
  value: string
}

export type Entity = BaseResponse<{
  name: string
  entity_id: string
  types: string[]
  properties: Record<string, number>
  location: {
    lat: number
    lon: number
  }
  tags: Tag[]
  disambiguation: string
}>
