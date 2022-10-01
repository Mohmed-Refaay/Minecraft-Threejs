import { useBox } from "@react-three/cannon";
import { Texture } from "three";
import { useStore } from "../hooks/useStore";

interface CubeProps {
  position: [number, number, number];
  texture: Texture;
  id: string;
}

const Cube: React.FC<CubeProps> = ({ position, texture, id }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    args: [1, 1, 1],
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  return (
    <mesh
      onClick={(e: any) => {
        e.stopPropagation();
        const clickedFace = Math.floor((e.faceIndex as number) / 2);
        const [x, y, z] = position;
        if (e.altKey) {
          removeCube(id);
          return;
        }

        if (clickedFace === 0) {
          addCube(x + 1, y, z);
        } else if (clickedFace === 1) {
          addCube(x - 1, y, z);
        } else if (clickedFace === 2) {
          addCube(x, y + 1, z);
        } else if (clickedFace === 3) {
          addCube(x, y - 1, z);
        } else if (clickedFace === 4) {
          addCube(x, y, z + 1);
        } else if (clickedFace === 5) {
          addCube(x, y, z - 1);
        }
      }}
      ref={ref as any}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Cube;
