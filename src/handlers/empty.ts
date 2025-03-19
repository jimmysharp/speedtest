/**
 * アップロードテスト用ハンドラ
 * クライアントからのデータを受け取るだけで、特に処理は行わない
 */

import { addCorsHeaders } from '../utils/cors';

/**
 * emptyハンドラ - アップロードテスト用
 * リクエストボディを読み捨て、200 OKを返す
 */
export async function handleEmpty(request: Request): Promise<Response> {
  // リクエストボディを読み捨てる（実際には何もしない）
  // 必要に応じて、ここでリクエストボディを読み込むことも可能

  // レスポンスヘッダーを設定
  const headers = new Headers();
  headers.set('Connection', 'keep-alive');
  headers.set('Cache-Control', 'no-store');

  // CORSヘッダーを追加
  addCorsHeaders(headers);

  // 空のレスポンスを返す
  return new Response(null, {
    status: 200,
    headers,
  });
}
