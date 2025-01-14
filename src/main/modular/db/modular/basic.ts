import { preload } from '@youliso/electronic/main';
import { Realm } from 'realm';
import { defDownloadPath, defPlaylistPath } from '@/main/default_path';
import { closeDB, loadDB } from '../realm';
import { Store, store_name } from '../models/store';

let db: Realm | null = null;
const basic_key = 'basic';

export function get_basic_setting(key: string) {
  const res = db?.objectForPrimaryKey<Store>(store_name, key);
  return res?.data;
}

export function init_basic_setting(key: string, data: string) {
  db?.write(() => {
    db?.create(store_name, { key, data });
  });
}

export function upd_basic_setting(key: string, data: string) {
  db?.write(() => {
    let value = db?.objectForPrimaryKey<Store>(store_name, key);
    if (value) {
      value.data = data;
    }
  });
}

export function del_basic_setting(key: string) {
  db?.write(() => {
    const value = get_basic_setting(key);
    if (value) {
      db?.delete(value);
    }
  });
}

export function set_basic_setting(key: string, data: string, no_update?: boolean) {
  if (get_basic_setting(key)) {
    !no_update && upd_basic_setting(key, data);
  } else {
    init_basic_setting(key, data);
  }
}

/**
 * 初始化
 */
export async function basic_init() {
  db = await loadDB([basic_key, 'db'], basic_key, [Store]);
  // 初始化参数设置
  set_basic_setting('playlist_save_path', defPlaylistPath);
  set_basic_setting('download_path', defDownloadPath);
}

/**
 * 卸载
 */
export function basic_close() {
  closeDB(basic_key);
}

/**
 * 监听
 */
export function basic_on() {
  preload.handle('basic-setting-key', (_, key) => get_basic_setting(key));
  preload.handle('basic-setting-set', (_, { key, data }) => set_basic_setting(key, data));
  preload.handle('basic-setting-del', (_, key) => del_basic_setting(key));
}
