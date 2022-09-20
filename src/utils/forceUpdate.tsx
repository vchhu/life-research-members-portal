import { useReducer } from "react";

function useForceUpdate() {
  const [_, forceUpdate] = useReducer((x: number) => x + 1, 0);
  return forceUpdate;
}

export default useForceUpdate;
