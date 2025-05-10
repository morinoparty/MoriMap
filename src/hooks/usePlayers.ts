import { useQuery } from "@tanstack/react-query";
import { PlayersSnapshot } from "../types/MapPlayers";

export const usePlayers = () => {
  return useQuery<PlayersSnapshot>({
    queryKey: ["players"],
    queryFn: async () => {
      const res = await fetch(
        "https://seikatsumain.map.morino.party/tiles/players.json"
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    refetchInterval: 3000, // 3秒ごとに自動更新
  });
};
