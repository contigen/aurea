const API_KEY = process.env.PINATA_API_KEY
const API_SECRET = process.env.PINATA_API_SECRET
const PINATA_JWT = process.env.PINATA_JWT

function base64ToBlob(base64: string, type: string) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new Blob([bytes], { type })
}

export async function uploadBase64ToPinata(
  base64: string,
  type: string,
  fileName = `thread-image`
) {
  const blob = base64ToBlob(base64, type)
  const formData = new FormData()
  formData.append(`file`, blob, fileName)

  const response = await fetch(
    `https://api.pinata.cloud/pinning/pinFileToIPFS`,
    {
      method: `POST`,
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        pinata_api_key: API_KEY!,
        pinata_secret_api_key: API_SECRET!,
      },

      body: formData,
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Pinata upload failed: ${error}`)
  }

  const result = await response.json()
  const ipfsHash = result.IpfsHash
  console.log('ipfs hash: ', ipfsHash)
  return `ipfs://${ipfsHash}`
}
