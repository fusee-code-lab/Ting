import { preload } from '@youliso/electronic/main';
import type { MusicSearchType, MusicType, SongQualityType } from '@fuseecodelab/ting-lib';
import { netease, qq } from '@fuseecodelab/ting-lib';
import { neteaseOn } from './netease';

const search = async (
  keywords: string,
  limit: number,
  offset: number,
  type: MusicSearchType = 'single'
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
  level: SongQualityType = 'exhigh'
) => {
  switch (type) {
    case 'netease':
      return netease.song_url(ids.map(id => Number(id)), level);
    case 'qq':
      return qq.song_url(ids.map(id => id.toString()), level);
  }
};


const playlist_details = (
  type: MusicType,
  id: string
) => {
  switch (type) {
    case 'netease':
      return netease.playlist_detail(id);
    case 'qq':
      return qq.playlist_detail(id);
  }
};

/**
 * 监听
 */
export function musicOn() {
  neteaseOn();
  preload.handle('music-search', async (_, args) =>
    search(args.keywords, args.limit, args.offset, args.type)
  );
  preload.handle('music-songurl', async (_, args) => song_url(args.type, args.ids, args.level));
  preload.handle('music-playlist-details', async (_, args) => playlist_details(args.type, args.id));
}
