import { preload } from '@youliso/electronic/render';

export const settingKey = async (key: string) =>
  preload.invoke<string | undefined>('basic-setting-key', key);

export const settingSet = (key: string, data: string | number) =>
  preload.invoke<string | undefined>('basic-setting-set', { key, data });

export const settingDelete = (key: string) => preload.invoke('basic-setting-del', key);
