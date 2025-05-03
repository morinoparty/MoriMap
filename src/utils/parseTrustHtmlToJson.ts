// JSON変換用ユーティリティ
// Pattern1: type: 'claim', Pattern2: type: 'Administrator Claim'
// owner以外のtrust系はArrayに変換

export interface TrustJson {
  type: string;
  owner: string;
  permissionTrust: string[];
  trust: string[];
  containerTrust: string[];
  accessTrust: string[];
}

/**
 * HTMLからTrustJsonへ変換する
 * @param html HTML文字列
 * @returns TrustJson
 */
export function parseTrustHtmlToJson(html: string): TrustJson {
  // type自動判定
  let type = "";
  if (html.includes("Claim Owner:")) {
    type = "claim";
  } else if (html.includes("Administrator Claim")) {
    type = "Administrator Claim";
  }

  // 各項目の抽出用正規表現
  const ownerMatch = html.match(
    /Claim Owner: <span style="font-weight:bold;">(.*?)<\/span>/
  );
  const permissionTrustMatch = html.match(
    /Permission Trust: <span style="font-weight:bold;">(.*?)<\/span>/
  );
  const trustMatch = html.match(
    /Trust: <span style="font-weight:bold;">(.*?)<\/span>/
  );
  const containerTrustMatch = html.match(
    /Container Trust: <span style="font-weight:bold;">(.*?)<\/span>/
  );
  const accessTrustMatch = html.match(
    /Access Trust: <span style="font-weight:bold;">(.*?)<\/span>/
  );

  // 配列化ヘルパー
  const toArray = (str: string | undefined) => {
    if (!str) return [];
    return str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  return {
    type,
    owner: ownerMatch ? ownerMatch[1] : "",
    permissionTrust: toArray(
      permissionTrustMatch ? permissionTrustMatch[1] : ""
    ),
    trust: toArray(trustMatch ? trustMatch[1] : ""),
    containerTrust: toArray(containerTrustMatch ? containerTrustMatch[1] : ""),
    accessTrust: toArray(accessTrustMatch ? accessTrustMatch[1] : ""),
  };
}
