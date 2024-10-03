import { useQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppType } from "../../../backend/src/app";
import { hc } from "hono/client";
import ConnectButton from "../components/ConnectWallet";
const client = hc<AppType>("http://localhost:3000/", {
  init: {
    credentials: "include",
  },
});

async function add() {
  const response = await client.addressBook.addAddress.$post({
    json: {
      user: "asd",
      address: `${Math.random() * 100}`,
      name: "asads",
    },
  });
}

async function remove(data: any) {
  console.log(data);
  const response = await client.addressBook.removeAddress.$delete({
    json: {
      user: data.user,
      address: data.address,
    },
  });
}

async function fetchAddress() {
  try {
    const response = await client.addressBook.getAddressBookByUser.$get();
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}

export const Route = createFileRoute("/nothing")({
  component: () => {
    const { data } = useQuery({
      queryKey: ["addressBook"],
      queryFn: () => fetchAddress(),
    });

    return (
      <div>
        {data?.map((data, index) => {
          return (
            <div key={index}>
              JSON.stringify(data);
              <button onClick={() => remove(data)}>remove</button>
            </div>
          );
        })}
        <button onClick={() => add()}>add</button>

        <ConnectButton />
        <Outlet />
      </div>
    );
  },
});
