import { useRef, useCallback } from "react";

function useRefs() {
  const refs = useRef({});

  const register = useCallback(
    (refName) => (ref) => {
      refs.current[refName] = ref;
    },
    []
  );

  return [refs, register];
}

export default useRefs;
