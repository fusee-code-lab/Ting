import type { Statement } from 'better-sqlite3';
import { basic_key } from '../keys';
import { DBInstance } from '../sqilte';
import { preload } from '@youliso/electronic/main';
import { defDownloadPath, defPlaylistPath } from '@/main/default_path';

const basic_setting_key = 'settings';
const basic_setting_table = `
CREATE TABLE IF NOT EXISTS ${basic_setting_key}(
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  key           TEXT    NOT NULL UNIQUE,
  data          TEXT    NOT NULL,
  extend        TEXT            
);
`;

let select_basic_setting_list_prepare: Statement | null = null;
export function select_basic_setting_list(): { key: string; data: string | number }[] | undefined {
  try {
    if (!select_basic_setting_list_prepare) {
      select_basic_setting_list_prepare = DBInstance.dbs[basic_key].prepare(
        `SELECT key, data FROM ${basic_setting_key}`
      );
    }
    const res = select_basic_setting_list_prepare.all() as any;
    return res;
  } catch (error) {
    console.error(error);
    return;
  }
}

let select_basic_setting_prepare: Statement | null = null;
export function select_basic_setting<T>(key: string): T | undefined {
  try {
    if (!select_basic_setting_prepare) {
      select_basic_setting_prepare = DBInstance.dbs[basic_key].prepare(
        `SELECT data FROM ${basic_setting_key} WHERE key = ?`
      );
    }
    const res = select_basic_setting_prepare.get(key) as any;
    if (res && res['data']) return res['data'];
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}

let insert_basic_setting_prepare: Statement | null = null;
export function insert_basic_setting(values: { key: string; data: string | number }[]) {
  try {
    if (!insert_basic_setting_prepare) {
      insert_basic_setting_prepare = DBInstance.dbs[basic_key].prepare(
        `INSERT INTO ${basic_setting_key} (key, data) VALUES (@key, @data)`
      );
    }
    const insertMany = DBInstance.dbs[basic_key].transaction((values) => {
      for (const value of values) insert_basic_setting_prepare!.run(value);
    });
    insertMany(values);
  } catch (error) {
    throw error;
  }
}

let update_basic_setting_prepare: Statement | null = null;
export function update_basic_setting(key: string, data: string | number) {
  try {
    if (!update_basic_setting_prepare) {
      update_basic_setting_prepare = DBInstance.dbs[basic_key].prepare(
        `UPDATE ${basic_setting_key} SET data = ? WHERE key = ?`
      );
    }
    update_basic_setting_prepare.run(data, key);
  } catch (error) {
    throw error;
  }
}

let delete_basic_setting_prepare: Statement | null = null;
export function delete_basic_setting(key: string) {
  try {
    if (!delete_basic_setting_prepare) {
      delete_basic_setting_prepare = DBInstance.dbs[basic_key].prepare(
        `DELETE FROM ${basic_setting_key} WHERE key = ?`
      );
    }
    delete_basic_setting_prepare.run(key);
  } catch (error) {
    throw error;
  }
}

export function set_basic_setting(key: string, data: string | number, no_update?: boolean) {
  if (select_basic_setting(key)) {
    !no_update && update_basic_setting(key, data);
  } else {
    insert_basic_setting([{ key, data }]);
  }
}

/**
 * 初始化
 */
export async function basic_init() {
  await DBInstance.load(basic_key, []);
  // 设置
  DBInstance.dbs[basic_key].exec(basic_setting_table);

  // 初始化参数设置
  set_basic_setting('playlist_save_path', defPlaylistPath);
  set_basic_setting('download_path', defDownloadPath);
}

/**
 * 卸载
 */
export function basic_close() {
  select_basic_setting_list_prepare = null;
  select_basic_setting_prepare = null;
  insert_basic_setting_prepare = null;
  update_basic_setting_prepare = null;
  delete_basic_setting_prepare = null;
  DBInstance.close(basic_key);
}

/**
 * 监听
 */
export function basic_on() {
  preload.handle('basic-setting-list', () => select_basic_setting_list());
  preload.handle('basic-setting-key', (_, key) => select_basic_setting(key));
  preload.handle('basic-setting-set', (_, { key, data }) => set_basic_setting(key, data));
  preload.handle('basic-setting-delete', (_, key) => delete_basic_setting(key));
}
