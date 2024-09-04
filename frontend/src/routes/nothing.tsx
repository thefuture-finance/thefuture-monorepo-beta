import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/nothing")({
  component: () => (
    <div>
      Hello /nothing!
      <Outlet />
    </div>
  ),
});
