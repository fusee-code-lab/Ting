import { SongItem } from '@/types/music';
import { preload } from '@youliso/electronic/render';
export const menuSong = (song: SongItem, key?: string) =>
  preload.invoke<void>('menu-song', { key, song });
