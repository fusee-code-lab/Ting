import { getAppInfo } from '@youliso/electronic/render';
import { getOS } from '../common/utils';
import { createSignal } from 'solid-js';
import { settingKey, settingSet } from '../common/db/basic';
import { playlist_local_init } from './playlist';
import { audio_init } from './audio';

export const OS = getOS();
export const appInfo = await getAppInfo();
export const isProduction = process.env.NODE_ENV === 'production';

// 默认下载存储路径
export const [download_path, set_download_path] = createSignal<string>();

// 设置下载存储路径
export const download_path_set = async (path: string) => {
  await settingSet('download_path', path);
  set_download_path(path);
};

// 初始化加载
export const store_init = async () => {
  const res = await Promise.all([
    settingKey('download_path'),
    playlist_local_init(),
    audio_init()
  ]);
  res[0] && set_download_path(res[0]);
};
