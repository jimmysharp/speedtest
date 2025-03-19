/**
 * CORS設定を処理するユーティリティ関数
 */

/**
 * CORSヘッダーを設定したレスポンスを返す
 */
export function handleCORS(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * レスポンスにCORSヘッダーを追加する
 */
export function addCorsHeaders(headers: Headers): Headers {
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', '*');
  return headers;
}
