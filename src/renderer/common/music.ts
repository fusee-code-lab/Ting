import { preload } from '@youliso/electronic/render';
import { MusicSearchType, MusicType, SongQualityType } from 'ting-lib/src/types/music';

/**
 * 搜索
 */
export const search = (
  keywords: string,
  limit: number = 5,
  offset: number = 1,
  type: MusicSearchType = MusicSearchType.single
) => {
  return preload.invoke('music-search', { keywords, limit, offset, type });
};

/**
 * 获取播放链接
 */
export const song_url = (
  type: MusicType,
  ids: (string | number)[],
  level: SongQualityType = SongQualityType.exhigh
) => {
  return preload.invoke<{ [key: string]: string }>('music-songurl', { type, ids, level });
};
