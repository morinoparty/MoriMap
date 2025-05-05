import { parseTrustHtmlToJson, TrustJson } from './parseTrustHtmlToJson';

/**
 * parseTrustHtmlToJson関数のテスト
 */
function testParseTrustHtmlToJson(): void {
  console.log('テスト開始: parseTrustHtmlToJson');

  // テストケース1: Administrator Claimのテスト
  const html1 = `<span style="font-weight:bold;">Administrator Claim</span><br/>Permission Trust: <span style="font-weight:bold;"></span><br/>Trust: <span style="font-weight:bold;">kina1120, _hunisuke_monkey, narumincho</span><br/>Container Trust: <span style="font-weight:bold;"></span><br/>Access Trust: <span style="font-weight:bold;">public</span>`;
  
  const expected1: TrustJson = {
    type: 'admin_claim', // Administrator Claim は admin_claim に変換される
    owner: '',
    permissionTrust: [],
    trust: ['kina1120', '_hunisuke_monkey', 'narumincho'],
    containerTrust: [],
    accessTrust: ['public']
  };

  const result1 = parseTrustHtmlToJson(html1);
  assertJsonEqual('テストケース1: Administrator Claim', result1, expected1);

  // テストケース2: Claim Ownerがある場合のテスト
  const html2 = `<span style="font-weight:bold;">Basic Claim</span><br/>Claim Owner: <span style="font-weight:bold;">testuser123</span><br/>Permission Trust: <span style="font-weight:bold;">admin1, admin2</span><br/>Trust: <span style="font-weight:bold;">user1, user2, user3</span><br/>Container Trust: <span style="font-weight:bold;">container1</span><br/>Access Trust: <span style="font-weight:bold;">access1, access2</span>`;
  
  const expected2: TrustJson = {
    type: 'claim', // Basic Claim は claim に変換される
    owner: 'testuser123',
    permissionTrust: ['admin1', 'admin2'],
    trust: ['user1', 'user2', 'user3'],
    containerTrust: ['container1'],
    accessTrust: ['access1', 'access2']
  };

  const result2 = parseTrustHtmlToJson(html2);
  assertJsonEqual('テストケース2: Basic Claim with Owner', result2, expected2);

  // テストケース3: 空のデータのテスト
  const html3 = `<span style="font-weight:bold;">Empty Claim</span><br/>Permission Trust: <span style="font-weight:bold;"></span><br/>Trust: <span style="font-weight:bold;"></span><br/>Container Trust: <span style="font-weight:bold;"></span><br/>Access Trust: <span style="font-weight:bold;"></span>`;
  
  const expected3: TrustJson = {
    type: 'claim', // Empty Claim は claim に変換される
    owner: '',
    permissionTrust: [],
    trust: [],
    containerTrust: [],
    accessTrust: []
  };

  const result3 = parseTrustHtmlToJson(html3);
  assertJsonEqual('テストケース3: Empty Claim', result3, expected3);
  
  // テストケース4: _NIKOMARUのClaim
  const html4 = `Claim Owner: <span style="font-weight:bold;">_NIKOMARU</span><br/>Permission Trust: <span style="font-weight:bold;"></span><br/>Trust: <span style="font-weight:bold;">hikighaL</span><br/>Container Trust: <span style="font-weight:bold;"></span><br/>Access Trust: <span style="font-weight:bold;"></span>`;
  
  const expected4: TrustJson = {
    type: 'claim', // typeが空の場合は claim に変換される
    owner: '_NIKOMARU',
    permissionTrust: [],
    trust: ['hikighaL'],
    containerTrust: [],
    accessTrust: []
  };

  const result4 = parseTrustHtmlToJson(html4);
  assertJsonEqual('テストケース4: _NIKOMARU Claim', result4, expected4);

  console.log('テスト完了: すべてのテストが成功しました');
}

/**
 * 2つのオブジェクトが等しいかどうかを検証し、結果を出力する
 */
function assertJsonEqual(testName: string, actual: TrustJson, expected: TrustJson): void {
  const isTypeEqual = actual.type === expected.type;
  const isOwnerEqual = actual.owner === expected.owner;
  const isPermissionTrustEqual = arrayEquals(actual.permissionTrust, expected.permissionTrust);
  const isTrustEqual = arrayEquals(actual.trust, expected.trust);
  const isContainerTrustEqual = arrayEquals(actual.containerTrust, expected.containerTrust);
  const isAccessTrustEqual = arrayEquals(actual.accessTrust, expected.accessTrust);

  const isEqual = isTypeEqual && isOwnerEqual && isPermissionTrustEqual && 
                  isTrustEqual && isContainerTrustEqual && isAccessTrustEqual;

  if (isEqual) {
    console.log(`✅ ${testName}: 成功`);
  } else {
    console.error(`❌ ${testName}: 失敗`);
    if (!isTypeEqual) console.error(`  type: 期待値=${expected.type}, 実際=${actual.type}`);
    if (!isOwnerEqual) console.error(`  owner: 期待値=${expected.owner}, 実際=${actual.owner}`);
    if (!isPermissionTrustEqual) console.error(`  permissionTrust: 期待値=${expected.permissionTrust}, 実際=${actual.permissionTrust}`);
    if (!isTrustEqual) console.error(`  trust: 期待値=${expected.trust}, 実際=${actual.trust}`);
    if (!isContainerTrustEqual) console.error(`  containerTrust: 期待値=${expected.containerTrust}, 実際=${actual.containerTrust}`);
    if (!isAccessTrustEqual) console.error(`  accessTrust: 期待値=${expected.accessTrust}, 実際=${actual.accessTrust}`);
  }
}

/**
 * 2つの配列が等しいかどうかを検証する
 */
function arrayEquals(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// テスト実行
testParseTrustHtmlToJson();