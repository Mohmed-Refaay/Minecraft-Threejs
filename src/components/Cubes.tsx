import React from "react";
import { useStore } from "../hooks/useStore";
import * as Textures from "../assets/images/textures";
import Cube from "./Cube";

const Cubes: React.FC = () => {
  const [cubes] = useStore((state) => [state.cubes]);

  return (
    <>
      {cubes.map((cube) => (
        <Cube
          key={cube.key}
          id={cube.key}
          position={cube.position}
          texture={Textures[cube.texture as keyof typeof Textures]}
        />
      ))}
    </>
  );
};

export default Cubes;
