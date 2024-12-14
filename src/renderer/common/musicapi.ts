import { preload } from "@youliso/electronic/render";

/**
 * 搜索
 */
export async function search(keywords: string, limit: number = 5, offset: number = 1) {
  return await preload.invoke('musicapi-search', { keywords, limit, offset });
}