import { preload } from "@youliso/electronic/render";


export const settingList = () => preload.invoke<{ key: string; data: string | number }[] | undefined>("basic-setting-list");

export const settingKey = (key: string) => preload.invoke<string | undefined>("basic-setting-key", key);

export const settingInsert = (values: { key: string; data: string | number }[]) => preload.invoke("basic-setting-insert", values);

export const settingUpdate = (key: string, data: string | number) => preload.invoke("basic-setting-update", { key, data });

export const settingDelete = (key: string) => preload.invoke("basic-setting-delete", key);  