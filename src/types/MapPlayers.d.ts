import { Worlds } from "./Worlds";

/** 単一プレイヤーの状態 */
export interface Player {
  /** どのワールドにいるか（例: "minecraft_overworld"） */
  world: Worlds;
  /** 防具ポイント (0–20) */
  armor: number;
  /** プレイヤー名 */
  name: string;
  /** 座標 */
  x: number;
  y: number;
  z: number;
  /** 体力 (0–20) */
  health: number;
  /** 一意の UUID */
  uuid: string;
  /** 視線のヨー角度 (−180–180) */
  yaw: number;
}

/** サーバーに接続中のプレイヤー一覧＋上限 */
export interface PlayersSnapshot {
  /** サーバー設定上の上限人数 */
  max: number;
  /** 現在接続しているプレイヤー配列 */
  players: Player[];
}
