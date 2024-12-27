import { preload } from '@youliso/electronic/render';

const settingInsert = (values: { key: string; data: string | number }[]) =>
  preload.invoke('basic-setting-insert', values);

const settingUpdate = (key: string, data: string | number) =>
  preload.invoke('basic-setting-update', { key, data });

export const settingList = () =>
  preload.invoke<{ key: string; data: string | number }[] | undefined>('basic-setting-list');

export const settingKey = (key: string) =>
  preload.invoke<string | undefined>('basic-setting-key', key);

export const settingSet = (key: string, data: string | number) =>
  preload.invoke<string | undefined>('basic-setting-set', { key, data });

export const settingDelete = (key: string) => preload.invoke('basic-setting-delete', key);
