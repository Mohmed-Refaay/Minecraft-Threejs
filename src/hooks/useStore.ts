import create from "zustand";
import { v4 } from "uuid";

interface StoreStateType {
  texture: string;
  cubes: {
    key: string;
    position: [number, number, number];
    texture: string;
  }[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (key: string) => void;
}

export const useStore = create<StoreStateType>((set) => ({
  texture: "dirtTexture",
  cubes: [
    {
      key: v4(),
      position: [1, 0, 1],
      texture: "dirtTexture",
    },
  ],

  addCube: (x: number, y: number, z: number) => {
    set((prev) => ({
      ...prev,
      cubes: [
        ...prev.cubes,
        {
          key: v4(),
          position: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: (key: string) => {
    set((prev) => ({
      ...prev,
      cubes: prev.cubes.filter((cube) => cube.key !== key),
    }));
  },
}));
