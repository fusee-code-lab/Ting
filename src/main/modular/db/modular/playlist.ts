import { preload } from '@youliso/electronic/main';
import { Realm } from 'realm';
import { closeDB, loadDB } from '../realm';
import { PlayList, playlist_name, PlayListConfig } from '../models/playlist';
import { Playlist, PlaylistUpdate } from '@/types/playlist';
import { getUUID } from '../../tools';

let db: Realm | null = null;
const playlist_key = 'playlist';

export function playlist_list() {
  const data = db?.objects<PlayList>(playlist_name);
  if (data) {
    return Realm.BSON.EJSON.deserialize(data);
  }
  return;
}

export function get_playlist(key: string) {
  const data = db?.objectForPrimaryKey<PlayList>(playlist_name, key);
  return data?.toJSON();
}

export function init_playlist(datas: Playlist[]) {
  db?.write(() => {
    datas.forEach((data) => {
      data.key = getUUID();
      db?.create(playlist_name, data);
    });
  });
}

export function upd_playlist(data: PlaylistUpdate, key?: string) {
  db?.write(() => {
    let values = [];
    if (key) {
      let value = db?.objectForPrimaryKey<PlayList>(playlist_name, key);
      value && values.push(value);
    } else {
      let value = db?.objects<PlayList>(playlist_name);
      value && values.push(...value);
    }
    if (values && values.length) {
      for (let index = 0; index < values.length; index++) {
        for (const prop in values[index]) {
          if (Object.hasOwn(data, prop)) {
            // @ts-ignore;
            values[index][prop] = data[prop];
          }
        }
      }
    }
  });
}

export function del_playlist(key: string) {
  db?.write(() => {
    const value = get_playlist(key);
    if (value) {
      db?.delete(value);
    }
  });
}

/**
 * 初始化
 */
export async function playlist_init() {
  db = await loadDB([playlist_key, 'db'], playlist_key, [PlayList, PlayListConfig]);
}

/**
 * 卸载
 */
export function playlist_close() {
  closeDB(playlist_key);
}

/**
 * 监听
 */
export function playlist_on() {
  preload.handle('playlist-list', () => {
    const data = playlist_list();
    return data;
  });
  preload.handle('playlist-insert', (_, data) => init_playlist(data));
  preload.handle('playlist-update', (_, data) => upd_playlist(data.data, data.key));
  preload.handle('playlist-delete', (_, key) => del_playlist(key));
}
