import { Player } from "../types/MapPlayers";
import { Marker, Tooltip } from "react-leaflet";
import { pointToLatLng } from "../utils/crs";
import L from "leaflet";

interface MapPlayersProps {
  players: Player[];
}

const playerIconHtml = (uuid: string, name: string) => `
  <div style="
    width: 40px;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    border: 3px solid #fff;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <img src='https://mc-heads.net/avatar/${uuid}/40' alt='${name}' style='width:100%;height:100%;object-fit:cover;display:block;' />
  </div>
`;

export const MapPlayers = ({ players }: MapPlayersProps) => {
  return (
    <>
      {players.map((player) => {
        const icon = L.divIcon({
          html: playerIconHtml(player.uuid, player.name),
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
          className: "player-marker-icon",
        });
        return (
          <Marker
            key={player.uuid}
            position={pointToLatLng({ x: player.x, y: player.z }, 1)}
            icon={icon}
          >
            <Tooltip direction="bottom">{player.name}</Tooltip>
          </Marker>
        );
      })}
    </>
  );
};
