import { useQuery } from "@tanstack/react-query";
import { Layer } from "../types/MapMaker";

export const useMarkers = () => {
  const worlds = [
    "minecraft_overworld",
    "minecraft_the_nether",
    "minecraft_the_end",
  ];
  return useQuery<Record<string, Layer[]>>({
    queryKey: ["markers"],
    queryFn: async () => {
      const results = await Promise.all(
        worlds.map(async (world) => {
          const res = await fetch(
            `https://seikatsumain.map.morino.party/tiles/${world}/markers.json`
          );
          if (!res.ok)
            throw new Error(`Network response was not ok for ${world}`);
          return { [world]: await res.json() };
        })
      );
      // 各worldごとにまとめたオブジェクトに変換
      return results.reduce((acc, cur) => ({ ...acc, ...cur }), {});
    },
  });
};
