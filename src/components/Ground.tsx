import { usePlane } from "@react-three/cannon";
import { RepeatWrapping } from "three";
import { groundTexture } from "../assets/images/textures";
import { useStore } from "../hooks/useStore";

const Ground: React.FC = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI * 0.5, 0, 0],
    position: [0, -0.501, 0],
  }));

  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);

  const [addCube] = useStore((state) => [state.addCube]);

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        const { x, y, z } = { ...e.point };
        addCube(Math.ceil(x), Math.ceil(y), Math.ceil(z));
      }}
      ref={ref as any}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

export default Ground;
