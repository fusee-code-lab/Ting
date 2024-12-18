import { netease } from '@fuseecodelab/ting-lib';
import { preload } from '@youliso/electronic/main';

const playlist_song_list = (
  id: string,
  limit: number,
  offset: number,
) => {
  return netease.playlist_song_list(id, limit, offset);
};


/**
 * 监听
 */
export function neteaseOn() {
  preload.handle('music-netease-playlist-song-list', async (_, args) => playlist_song_list(args.id, args.offset, args.limit));
}
