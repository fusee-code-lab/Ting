import { preload } from '@youliso/electronic/render';

const settingInsert = (values: { key: string; data: string | number }[]) =>
  preload.invoke('basic-setting-insert', values);

const settingUpdate = (key: string, data: string | number) =>
  preload.invoke('basic-setting-update', { key, data });

export const settingList = () =>
  preload.invoke<{ key: string; data: string | number }[] | undefined>('basic-setting-list');

export const settingKey = (key: string) =>
  preload.invoke<string | undefined>('basic-setting-key', key);

export const settingDelete = (key: string) => preload.invoke('basic-setting-delete', key);

export const settingSet = async (key: string, data: string | number) => {
  const value = await settingKey(key);
  value ? await settingUpdate(key, data) : await settingInsert([{ key, data }]);
};
