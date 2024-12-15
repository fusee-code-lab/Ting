import { MusicList, MusicSearchType, MusicType, SoundQualityType } from '@/types/music';
import { preload } from '@youliso/electronic/render';

/**
 * 搜索
 */
export const search = (
  keywords: string,
  limit: number = 5,
  offset: number = 1,
  type: MusicSearchType = MusicSearchType.single
) => {
  return preload.invoke<MusicList>('musicapi-search', { keywords, limit, offset, type });
};

/**
 * 获取播放链接
 */
export const song_url = (
  type: MusicType,
  id: string | number,
  level: SoundQualityType = SoundQualityType.exhigh
) => {
  return preload.invoke<{ id: string; url: string }>('musicapi-songurl', { type, id, level });
};
