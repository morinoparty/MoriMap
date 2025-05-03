import { atom } from "jotai";
import { Worlds } from "../types/Worlds";

export const mapStateAtom = atom<{
  layer: {
    world: Worlds;
    markers: {
      Railway: boolean;
      griefprevention: boolean;
      "squaremap-spawn_icon": boolean;
      "squaremap-worldborder": boolean;
      banners: boolean;
    };
  };
}>({
  layer: {
    world: "minecraft_overworld",
    markers: {
      Railway: true,
      griefprevention: false,
      "squaremap-spawn_icon": true,
      "squaremap-worldborder": true,
      banners: true,
    },
  },
});
