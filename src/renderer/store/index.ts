import { getAppInfo } from '@youliso/electronic/render';
import { getOS } from '../common/utils';
import { createSignal } from 'solid-js';
import { settingInsert, settingKey, settingUpdate } from '../common/db/basic';
import { playlist_list_data_init } from './playlist';
import { audio_init } from './audio';

export const OS = getOS();
export const appInfo = await getAppInfo();

// 默认下载存储路径
export const [download_path, set_download_path] = createSignal<string>();

// 设置下载存储路径
export const download_path_set = async (path: string) => {
  if (download_path()) {
    await settingUpdate('download_path', path);
  } else {
    await settingInsert([{ key: 'download_path', data: path }]);
  }
  set_download_path(path);
}


// 初始化加载
export const store_init = async () => {
  const res = await Promise.all([settingKey('download_path'), playlist_list_data_init(),audio_init()]);
  res[0] && set_download_path(res[0]);
}
