import { MusicSearchType, MusicType } from '@/types/music';
import { SoundQualityType } from 'NeteaseCloudMusicApi';
import { preload } from '@youliso/electronic/main';
import * as Netease from './netease';
import * as QQ from './qq';
import { getSearchType } from './utils';

const search = async (
  keywords: string,
  limit: number,
  offset: number,
  type: MusicSearchType = MusicSearchType.single
) => {
  let func = [Netease.search(keywords, limit, offset, getSearchType(MusicType.Netease, type)!)];
  const qqType = getSearchType(MusicType.QQ, type);
  typeof qqType === 'number' && func.push(QQ.search(keywords, limit, offset, qqType));
  let data: any = {};
  const res = await Promise.all(func);
  if (res[0]) {
    data['netease'] = res[0];
  }
  if (res[1]) {
    data['qq'] = res[1];
  }
  return data;
};

const song_url = (
  type: MusicType,
  id: string | number,
  level: SoundQualityType = SoundQualityType.exhigh
) => {
  switch (type) {
    case MusicType.Netease:
      return Netease.song_url(id, level);
    case MusicType.QQ:
      return QQ.song_url(id.toString());
  }
};

/**
 * 监听
 */
export function musicApiOn() {
  preload.handle('musicapi-search', async (_, args) =>
    search(args.keywords, args.limit, args.offset, args.type)
  );
  preload.handle('musicapi-songurl', async (_, args) => song_url(args.type, args.id, args.level));
}
