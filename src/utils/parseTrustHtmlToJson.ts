export interface TrustJson {
  type: "claim" | "admin_claim"; // "claim" または "admin_claim" のいずれか
  owner: string; // Claim Owner が無い場合は空文字で返す
  permissionTrust: string[];
  trust: string[];
  containerTrust: string[];
  accessTrust: string[];
}

export function parseTrustHtmlToJson(html: string): TrustJson {
  // 改行を消して扱いやすく
  const src = html.replace(/\n/g, "");

  // ----- type と owner -----
  // 先頭の <span>…</span> を取得（例: "Administrator Claim"）
  // ただし、HTMLが<span>タグから始まらない場合は空文字
  const typeMatch = src.match(/^<span[^>]*>(.*?)<\/span>/);
  const rawType = typeMatch ? typeMatch[1].trim() : "";

  // typeを"claim"または"admin_claim"のいずれかに限定
  // "Administrator Claim"の場合のみ"admin_claim"、それ以外は"claim"
  const type = rawType.toLowerCase().includes("administrator")
    ? "admin_claim"
    : "claim";

  // Claim Owner: があるパターン
  const ownerMatch = src.match(/Claim Owner:\s*<span[^>]*>(.*?)<\/span>/i);
  const owner = ownerMatch ? ownerMatch[1].trim() : "";

  // ----- 各 Trust 系 -----
  // <br/>ラベル: <span>値</span> の形式でマッチさせる
  const permissionTrust = extractListExact(src, "<br/>Permission Trust:");
  const trust = extractListExact(src, "<br/>Trust:");
  const containerTrust = extractListExact(src, "<br/>Container Trust:");
  const accessTrust = extractListExact(src, "<br/>Access Trust:");

  return {
    type,
    owner,
    permissionTrust,
    trust,
    containerTrust,
    accessTrust,
  };
}

/**
 * 厳密に指定されたラベルとそれに続く<span>の内容をマッチングし、
 * カンマ区切り → 配列へ変換。空要素は捨てる。
 */
function extractListExact(source: string, exactLabel: string): string[] {
  const re = new RegExp(
    `${escapeRegExp(exactLabel)}\\s*<span[^>]*>(.*?)<\\/span>`,
    "i"
  );
  const m = source.match(re);
  if (!m) return [];
  return m[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 正規表現のメタ文字をエスケープする
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
