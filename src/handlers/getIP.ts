/**
 * IPアドレス取得用ハンドラ
 * クライアントのIPアドレスを返す
 */

import { addCorsHeaders } from '../utils/cors';

/**
 * getIPハンドラ - IPアドレス取得用
 * クライアントのIPアドレスを返す
 */
export async function handleGetIP(request: Request): Promise<Response> {
  // クライアントのIPアドレスを取得
  // Cloudflare Workersでは、CF-Connecting-IPヘッダーにクライアントの実際のIPアドレスが含まれる
  const clientIP =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Real-IP') ||
    '127.0.0.1';

  // レスポンスデータを作成
  const responseData = {
    processedString: clientIP,
  };

  // レスポンスヘッダーを設定
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Cache-Control', 'no-store');

  // CORSヘッダーを追加
  addCorsHeaders(headers);

  return new Response(JSON.stringify(responseData), {
    status: 200,
    headers,
  });
}
