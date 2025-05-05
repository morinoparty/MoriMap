export interface RailwayJson {
  lineName: string;
  fromStation: string;
  toStation: string;
  travelTime: string;
  direction: "bidirectional" | "unidirectional" | "";
}

/**
 * Converts railway HTML string to JSON.
 * @param html Railway information HTML
 */
export function parseRailwayHtmlToJson(html: string): RailwayJson {
  // Remove newlines for easier processing
  const src = html.replace(/\n/g, "");

  // Destination
  const destMatch = src.match(
    /行き先\s*:\s*([^<]+?)(<->|->)\s*([^<]+?)\s*<\/span>/
  );
  let fromStation = "",
    toStation = "",
    direction: "bidirectional" | "unidirectional" | "" = "";
  if (destMatch) {
    fromStation = destMatch[1].trim();
    toStation = destMatch[3].trim();
    direction =
      destMatch[2] === "<->"
        ? "bidirectional"
        : destMatch[2] === "->"
          ? "unidirectional"
          : "";
  }

  // Required time
  const timeMatch = src.match(/所要時間\s*:\s*([^<]+?)\s*<\/span>/);
  const time = timeMatch ? timeMatch[1].trim() : "";

  // Line name (text after last <br/>)
  const lineMatch = src.match(/<br\/>\s*([^<]+)$/);
  const line = lineMatch ? lineMatch[1].trim() : "";

  return {
    fromStation,
    toStation,
    travelTime: time,
    lineName: line,
    direction,
  };
}
