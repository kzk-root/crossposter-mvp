import { BskyAgent, RichText } from '@atproto/api'

export default async (request: Request) => {
  try {
    const requestBody = await request.json()
    const authHeader = request.headers.get('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return Response.json({ message: 'No token provided' }, { status: 401 })
    }

    if (process.env.N8N_RECEIVE_TOKEN !== token) {
      return Response.json({ message: 'Wrong provided' }, { status: 401 })
    }

    const blueskyAgent = new BskyAgent({ service: 'https://bsky.social' })

    const contentSnippet = requestBody.contentSnippet
    const richText = new RichText({ text: contentSnippet.replace(/\|\|/g, '\n') })
    await richText.detectFacets(blueskyAgent)

    console.log({
      contentSnippet,
      richText: richText.text,
    })

    return Response.json({
      text: richText.text.replace(/\n/g, '||'),
      facets: richText.facets || [],
    })
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Failed creating facets' }, { status: 500 })
  }
}
