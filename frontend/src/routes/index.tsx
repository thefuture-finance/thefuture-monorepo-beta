import { createFileRoute } from '@tanstack/react-router'
import { AppType } from '../../../backend/src/index.ts'
import { hc } from 'hono/client'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { queryClient } from '../main.tsx'
const client = hc<AppType>('http://localhost:3000/')

async function fetchPosts() {
 const resp = await client.posts.$post({form:{title:"asd",body:"asd"}})
  if (!resp.ok) {
  }
  return await resp.json()
}

const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts(),
})

export const Route = createFileRoute('/')({
  loader:async () => queryClient.ensureQueryData(postsQueryOptions),
  component: () => {


    const data = useSuspenseQuery(postsQueryOptions)

    return (
      <div>
        ads
        {data.data.message ?? ""}
      </div>
    )
}
})




