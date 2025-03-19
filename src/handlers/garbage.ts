/**
 * ダウンロードテスト用ハンドラ
 * 固定パターンのデータを返す
 */

import { addCorsHeaders } from '../utils/cors';

// 短い固定パターン
const BASE_PATTERN =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CHUNK_SIZE = 1048576; // 1MB

/**
 * 固定パターンを生成する関数
 * @param size 生成するデータのサイズ（バイト）
 * @returns 指定されたサイズのUint8Array
 */
function generateChunk(size: number): Uint8Array {
  const chunk = new Uint8Array(size);

  // パターンを繰り返して埋める
  for (let i = 0; i < size; i++) {
    chunk[i] = BASE_PATTERN.charCodeAt(i % BASE_PATTERN.length);
  }

  return chunk;
}

/**
 * garbageハンドラ - ダウンロードテスト用
 * 固定パターンのデータを返す
 */
export async function handleGarbage(
  request: Request,
  url: URL
): Promise<Response> {
  // クエリパラメータからチャンク数を取得（デフォルト: 4）
  const ckSizeParam = url.searchParams.get('ckSize');
  let chunks = 4;

  if (ckSizeParam) {
    const parsedSize = parseInt(ckSizeParam, 10);
    if (!isNaN(parsedSize)) {
      // 最大1024チャンクまで
      chunks = Math.min(Math.max(1, parsedSize), 1024);
    }
  }

  // 1MBのチャンクを生成
  const chunk = generateChunk(CHUNK_SIZE);

  // 指定されたチャンク数分のデータを返す
  const responseData = new Uint8Array(chunk.length * chunks);
  for (let i = 0; i < chunks; i++) {
    responseData.set(chunk, i * chunk.length);
  }

  // レスポンスヘッダーを設定
  const headers = new Headers();
  headers.set('Content-Type', 'application/octet-stream');
  headers.set('Content-Disposition', 'attachment; filename=random.dat');
  headers.set('Content-Transfer-Encoding', 'binary');
  headers.set('Cache-Control', 'no-store');

  // CORSヘッダーを追加
  addCorsHeaders(headers);

  return new Response(responseData, {
    status: 200,
    headers,
  });
}
