import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import { useSetPhysics } from "../hooks/useSetPhysics";
import * as FORCES from "../constants/playerForce";

const Player: React.FC = () => {
  const actions = useKeyboard();

  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));
  const { position, velocity } = useSetPhysics(api);

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        position.current[0],
        position.current[1],
        position.current[2],
      ),
    );

    const direction = new Vector3();
    direction
      .subVectors(
        new Vector3(
          0,
          0,
          (actions.moveBackward ? 1 : 0) -
            (actions.moveForward ? 1 : 0),
        ),
        new Vector3(
          (actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0),
          0,
          0,
        ),
      )
      .normalize()
      .multiplyScalar(FORCES.MOVE_FORCE)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (actions.jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(
        velocity.current[0],
        FORCES.JUMP_FORCE,
        velocity.current[2],
      );
    }
  });

  return <mesh ref={ref as any}></mesh>;
};

export default Player;
