import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cubes from "./components/Cubes";
import FPV from "./components/FPV";
import Ground from "./components/Ground";
import Player from "./components/Player";

function App() {
  return (
    <div className="h-screen w-full relative">
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Physics>
          <Cubes />
          <Player />
          <Ground />
        </Physics>
        <FPV />
      </Canvas>

      <div className="absolute text-white z-10 text-4xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        +
      </div>
    </div>
  );
}

export default App;
