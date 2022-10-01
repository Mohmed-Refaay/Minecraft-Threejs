import { PublicApi } from "@react-three/cannon";
import { useEffect, useRef } from "react";

export const useSetPhysics = (api: PublicApi) => {
  const position = useRef([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.position.subscribe(
      (p) => (position.current = p),
    );
    return unsubscribe;
  }, [api.position]);

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe(
      (p) => (velocity.current = p),
    );
    return unsubscribe;
  }, [api.velocity]);

  return { position, velocity };
};
