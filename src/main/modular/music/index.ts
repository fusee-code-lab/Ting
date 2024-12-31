import { preload } from '@youliso/electronic/main';
import { neteaseOn, netease } from './netease';
import { qqOn, qq } from './qq';
import { MusicSearchType, MusicType, SongQualityType } from '@/types/music';

const search_song = async (
  keywords: string,
  limit: number,
  offset: number,
  type: MusicSearchType = 'single'
) => {
  let func = [
    netease.search(keywords, limit, offset, type),
    qq.search(keywords, limit, offset, type)
  ];
  const res = await Promise.all<any>(func);
  let data: any = {
    count: 0,
    list: []
  };
  if (res[0]) {
    data.count += res[0]['count'] || 0;
    data.list = [...data.list, ...(res[0]['list'] || [])];
  }
  if (res[1]) {
    data.count += res[1]['count'] || 0;
    data.list = [...data.list, ...(res[1]['list'] || [])];
  }
  return data;
};

const song_url = (type: MusicType, ids: (string | number)[], level: SongQualityType = 'exhigh') => {
  switch (type) {
    case 'netease':
      return netease.song_url(
        ids.map((id) => Number(id)),
        level
      );
    case 'qq':
      return qq.song_url(
        ids.map((id) => id.toString()),
        level
      );
  }
};

const playlist_details = (type: MusicType, id: string) => {
  switch (type) {
    case 'netease':
      return netease.playlist_detail(id);
    case 'qq':
      return qq.playlist_detail(id);
  }
};

const playlist_song_list = (type: MusicType, id: string, limit: number, offset: number) => {
  switch (type) {
    case 'netease':
      return netease.playlist_song_list(id, limit, offset);
    case 'qq':
      return null;
  }
};

/**
 * 监听
 */
export function musicOn() {
  neteaseOn();
  qqOn();
  preload.handle('music-search', async (_, args) =>
    search_song(args.keywords, args.limit, args.offset, args.type)
  );
  preload.handle('music-songurl', async (_, args) => song_url(args.type, args.ids, args.level));
  preload.handle('music-playlist-details', async (_, args) => playlist_details(args.type, args.id));
  preload.handle('music-playlist-song-list', async (_, args) =>
    playlist_song_list(args.type, args.id, args.offset, args.limit)
  );
}
