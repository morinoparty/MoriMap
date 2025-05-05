import { parseRailwayHtmlToJson, RailwayJson } from "./parseRailwayHtmlToJson";

function assertEqual(
  testName: string,
  actual: RailwayJson,
  expected: RailwayJson
) {
  const ok =
    actual.fromStation === expected.fromStation &&
    actual.lineName === expected.lineName &&
    actual.toStation === expected.toStation &&
    actual.travelTime === expected.travelTime &&
    actual.direction === expected.direction;
  if (ok) {
    console.log(`✅ ${testName}: 成功`);
  } else {
    console.error(`❌ ${testName}: 失敗`);
    console.error("  actual:", actual);
    console.error("  expected:", expected);
  }
}

function testParseRailwayHtmlToJson() {
  // テスト1
  const html1 = `行き先 : 囲碁村 <-> 多久村 </span><br/> 所要時間 : 約 0.9 分 </span><br/> 旧遠野森林鉄道`;
  const expected1: RailwayJson = {
    fromStation: "囲碁村",
    toStation: "多久村",
    travelTime: "約 0.9 分",
    lineName: "旧遠野森林鉄道",
    direction: "bidirectional",
  };
  assertEqual("テスト1", parseRailwayHtmlToJson(html1), expected1);

  // テスト2
  const html2 = `行き先 : 町湯中央 -> 森が丘ターミナル </span><br/> 所要時間 : 約 6.9 分 </span><br/> ユクリパ高速鉄道ユクリ本線`;
  const expected2: RailwayJson = {
    fromStation: "町湯中央",
    toStation: "森が丘ターミナル",
    travelTime: "約 6.9 分",
    lineName: "ユクリパ高速鉄道ユクリ本線",
    direction: "unidirectional",
  };
  assertEqual("テスト2", parseRailwayHtmlToJson(html2), expected2);
}

testParseRailwayHtmlToJson();
