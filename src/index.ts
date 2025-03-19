/**
 * Cloudflare Workers インターネット速度測定サーバー
 * speedtest-goと同等の機能を持つAPIエンドポイントを実装
 */

import { handleEmpty } from './handlers/empty';
import { handleGarbage } from './handlers/garbage';
import { handleGetIP } from './handlers/getIP';
import { handleCORS } from './utils/cors';

export interface Env {
  // 環境変数があれば定義
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    // リクエストURLを解析
    const url = new URL(request.url);
    const path = url.pathname;

    // OPTIONSリクエスト（プリフライト）の処理
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // パスに基づいてハンドラにルーティング
    if (path.endsWith('/empty') || path.endsWith('/empty.php')) {
      return handleEmpty(request);
    } else if (path.endsWith('/garbage') || path.endsWith('/garbage.php')) {
      return handleGarbage(request, url);
    } else if (path.endsWith('/getIP') || path.endsWith('/getIP.php')) {
      return handleGetIP(request);
    }

    // 404 Not Found
    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
