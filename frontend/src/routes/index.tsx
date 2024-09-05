import { createFileRoute } from "@tanstack/react-router";
import { AppType } from "../../../backend/src/app.ts";
import { hc } from "hono/client";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient } from "../main.tsx";
import ConnectButton from "../components/ConnectWallet.tsx";
const client = hc<AppType>("http://localhost:3000/");

async function fetchPosts() {
  try {
    const response = await client.explorer.getMarketData.$get();
    if (!response.ok) {
    }
    const data = await response.json();
    return data.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}

const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => fetchPosts(),
});

export const Route = createFileRoute("/")({
  loader: async () => queryClient.ensureQueryData(postsQueryOptions),
  component: () => {
    const { data } = useSuspenseQuery(postsQueryOptions);

    return (
      <div>
        <ConnectButton />
        {data.map((val: any) => <div></div>) ?? ""}
      </div>
    );
  },
});
