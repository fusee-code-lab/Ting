import { Statement } from "better-sqlite3";
import { playlist_key } from "../keys";
import { DBInstance } from "../sqilte";
import { Playlist, PlaylistUpdateOpt } from "@/types/playlist";
import { preload } from "@youliso/electronic/main";

const playlist_list_key = 'playlist';
const playlist_list_table = `
CREATE TABLE IF NOT EXISTS ${playlist_list_key}(
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  key           TEXT       NOT NULL UNIQUE,
  name          TEXT       NOT NULL,
  cover         TEXT               ,
  config        TEXT               ,
  timestamp     INTEGER    NOT NULL
);
`;

let select_playlist_list_prepare: Statement | null = null;
export function select_playlist_list(): Playlist[] | undefined {
  try {
    if (!select_playlist_list_prepare) {
      select_playlist_list_prepare = DBInstance.dbs[playlist_key].prepare(
        `SELECT key, name, cover, config, timestamp FROM ${playlist_list_key} ORDER BY timestamp DESC`
      );
    }
    return select_playlist_list_prepare.all() as Playlist[];
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
        `INSERT OR IGNORE INTO ${playlist_list_key} (key, name, cover, config, timestamp) VALUES (@key, @name, @cover, @config, @timestamp)`
      );
    }
    const insertMany = DBInstance.dbs[playlist_key].transaction((values: Playlist[]) => {
      for (const value of values) {
        value.config ??= {};
        !value.timestamp && (value.timestamp = Date.now());
        // @ts-ignore
        value.config = JSON.stringify(value.config);
        insert_playlist_list_prepare!.run(value);
      }
    })
    insertMany(values);
  } catch (error) {
    throw error;
  }
}

export function update_playlist_list(data: PlaylistUpdateOpt, key?: string) {
  try {
    let sql_text = `UPDATE ${playlist_key} SET `;
    let upd_keys: string[] = ['timestamp'];
    let upd_values: (string | number)[] = [Date.now()];
    const upds = Object.keys(data) as (keyof PlaylistUpdateOpt)[];
    upds.forEach(upd_key => {
      let value = data[upd_key];
      if (value) {
        upd_key === 'config' && (value = JSON.stringify(value))
        upd_keys.push(`${upd_key} = ?`);
        upd_values.push(value as string);
      }
    });
    sql_text += upd_keys.join(', ');
    if (key) {
      sql_text += ` AND key = ?`;
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
export function playlist_init() {
  DBInstance.load(playlist_key, []);
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