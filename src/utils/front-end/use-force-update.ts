import { useReducer } from "react";

export default function useForceUpdate() {
  const [_, forceUpdate] = useReducer((x: number) => x + 1, 0);
  return forceUpdate;
}
