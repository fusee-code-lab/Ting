import { preload } from '@youliso/electronic/main';
import { MusicSearchType, MusicType, netease, qq, SongQualityType } from 'ting_lib';

const search = async (
  keywords: string,
  limit: number,
  offset: number,
  type: MusicSearchType = MusicSearchType.single
) => {
  let func = [netease.search(keywords, limit, offset, type), qq.search(keywords, limit, offset, type)];
  let data: any = {};
  const res = await Promise.all<any>(func);
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
  ids: (string | number)[],
  level: SongQualityType = SongQualityType.exhigh
) => {
  switch (type) {
    case MusicType.Netease:
      return netease.song_url(ids.map(id => Number(id)), level);
    case MusicType.QQ:
      return qq.song_url(ids.map(id => id.toString()), level);
  }
};

/**
 * 监听
 */
export function musicApiOn() {
  preload.handle('musicapi-search', async (_, args) =>
    search(args.keywords, args.limit, args.offset, args.type)
  );
  preload.handle('musicapi-songurl', async (_, args) => song_url(args.type, args.ids, args.level));
}
