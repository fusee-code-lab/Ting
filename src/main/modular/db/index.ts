import { basic_close, basic_init, basic_on } from './modular/basic';
import { playlist_close, playlist_init, playlist_on } from './modular/playlist';
import { DBInstance } from './sqilte';

// 全局初始化
export async function DBInit() {
  await Promise.all([basic_init(), playlist_init()]);
}

// 全局关闭
export function DBClose() {
  basic_close();
  playlist_close();
  DBInstance.close();
}

/**
 * 监听
 */
export function DBOn() {
  basic_on();
  playlist_on();
}
