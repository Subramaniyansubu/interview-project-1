"use client";

import { fetchTurtles } from "@/lib/slices/turtles-slice";
import { store } from "@/lib/store";
import { useDispatch } from "@/lib/redux";
import { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";

function TurtlesProvider({ children }: React.PropsWithChildren) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTurtles());
  }, [dispatch]);
  return children;
}

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <StoreProvider store={store}>
      <TurtlesProvider>{children}</TurtlesProvider>
    </StoreProvider>
  );
}
