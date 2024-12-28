import { Statement } from 'better-sqlite3';
import { playlist_key } from '../keys';
import { DBInstance } from '../sqilte';
import { Playlist, PlaylistUpdate } from '@/types/playlist';
import { preload } from '@youliso/electronic/main';
import { getUUID } from '../../tools';

const playlist_list_key = 'playlist';
const playlist_list_table = `
CREATE TABLE IF NOT EXISTS ${playlist_list_key}(
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  key           TEXT       NOT NULL UNIQUE,
  name          TEXT       NOT NULL UNIQUE,
  cover         TEXT               ,
  config        TEXT               ,
  playlist_path TEXT       NOT NULL,
  songs         TEXT       NOT NULL,  
  timestamp     INTEGER    NOT NULL
);
`;

let select_playlist_list_prepare: Statement | null = null;
export function select_playlist_list(): Playlist[] | undefined {
  try {
    if (!select_playlist_list_prepare) {
      select_playlist_list_prepare = DBInstance.dbs[playlist_key].prepare(
        `SELECT key, name, cover, config, playlist_path, songs, timestamp FROM ${playlist_list_key} ORDER BY timestamp DESC`
      );
    }
    const data = select_playlist_list_prepare.all() as Playlist[];
    data.forEach((item) => {
      // @ts-ignore
      item.config = JSON.parse(item.config);
      // @ts-ignore
      item.songs = JSON.parse(item.songs);
    });
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}

let insert_playlist_list_prepare: Statement | null = null;
export function insert_playlist_list(values: Playlist[]) {
  try {
    if (!insert_playlist_list_prepare) {
      insert_playlist_list_prepare = DBInstance.dbs[playlist_key].prepare(
        `INSERT OR IGNORE INTO ${playlist_list_key} (key, name, cover, config, playlist_path, songs, timestamp) VALUES (@key, @name, @cover, @config, @playlist_path, @songs, @timestamp)`
      );
    }
    const insertMany = DBInstance.dbs[playlist_key].transaction((values: Playlist[]) => {
      for (const value of values) {
        value.key = getUUID();
        value.cover ??= '';
        value.config ??= {};
        value.songs ??= [];
        !value.timestamp && (value.timestamp = Date.now());
        // @ts-ignore
        value.config = JSON.stringify(value.config);
        // @ts-ignore
        value.songs = JSON.stringify(value.songs);
        insert_playlist_list_prepare!.run(value);
      }
    });
    insertMany(values);
  } catch (error) {
    throw error;
  }
}

export function update_playlist_list(data: PlaylistUpdate, key?: string) {
  try {
    let sql_text = `UPDATE ${playlist_key} SET `;
    let upd_keys: string[] = ['timestamp = ?'];
    let upd_values: (string | number)[] = [Date.now()];
    const upds = Object.keys(data) as (keyof PlaylistUpdate)[];
    upds.forEach((upd_key) => {
      let value = data[upd_key];
      if (value) {
        (upd_key === 'config' || upd_key === 'songs') && (value = JSON.stringify(value));
        upd_keys.push(`${upd_key} = ?`);
        upd_values.push(value as string);
      }
    });
    sql_text += upd_keys.join(', ');
    if (key) {
      sql_text += ` WHERE key = ?`;
      upd_values.push(key);
    }
    DBInstance.dbs[playlist_key].prepare(sql_text).run(...upd_values);
  } catch (error) {
    throw error;
  }
}

let delete_playlist_list_prepare: Statement | null = null;
export function delete_playlist_list(key: string) {
  try {
    if (!delete_playlist_list_prepare) {
      delete_playlist_list_prepare = DBInstance.dbs[playlist_key].prepare(
        `DELETE FROM ${playlist_list_key} WHERE key = ?`
      );
    }
    delete_playlist_list_prepare.run(key);
  } catch (error) {
    throw error;
  }
}

/**
 * 初始化
 */
export async function playlist_init() {
  await DBInstance.load(playlist_key, []);
  // 歌单
  DBInstance.dbs[playlist_key].exec(playlist_list_table);
}

/**
 * 卸载
 */
export function playlist_close() {
  select_playlist_list_prepare = null;
  insert_playlist_list_prepare = null;
  delete_playlist_list_prepare = null;
  DBInstance.close(playlist_key);
}

/**
 * 监听
 */
export function playlist_on() {
  preload.handle('playlist-list', () => select_playlist_list());
  preload.handle('playlist-insert', (_, data) => insert_playlist_list(data));
  preload.handle('playlist-update', (_, data) => update_playlist_list(data.data, data.key));
  preload.handle('playlist-delete', (_, key) => delete_playlist_list(key));
}
