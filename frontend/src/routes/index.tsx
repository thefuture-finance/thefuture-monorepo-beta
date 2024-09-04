import { createFileRoute } from '@tanstack/react-router'
import { AppType } from '../../../backend/src/index.ts'
import { hc } from 'hono/client'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { queryClient } from '../main.tsx'
import ConnectButton from '../components/ConnectWallet.tsx'
// const client = hc<AppType>('http://localhost:3000/')

async function fetchPosts() {
  return "asd"}

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
        <ConnectButton/>
        {data.data ?? ""}
      </div>
    )
}
})




