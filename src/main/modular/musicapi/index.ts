import * as Netease from './Netease';
import * as Qq from './qq';
import { preload } from '@youliso/electronic/main';

const search = (keywords: string, limit: number, offset: number) => Promise.all([
  Qq.search(keywords, limit, offset),
  Netease.search(keywords, limit, offset)
])

/**
 * 监听
 */
export function musicApiOn() {
  preload.handle('musicapi-search', async (_, args) =>
    search(args.keywords, args.limit, args.offset)
  );
}