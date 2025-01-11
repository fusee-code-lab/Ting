import type { AnyRealmObject, ObjectSchema, RealmObjectConstructor } from 'realm';
import { Realm } from 'realm';
import { defFilePath, exitsFolder } from '@/main/default_path';
import { join } from 'node:path';

export let DBs: {
  [key: string]: Realm;
} = {};

// 加载/创建数据库
export const loadDB = async (
  dbPaths: string[],
  key: string,
  schema: (RealmObjectConstructor<AnyRealmObject> | ObjectSchema)[]
) => {
  let path = defFilePath;
  for (let index = 0; index < dbPaths.length; index++) {
    path = join(path, dbPaths[index]);
    index !== dbPaths.length - 1 && (await exitsFolder(path));
  }
  const realm = await Realm.open({
    schema,
    path
  });
  DBs[key] = realm;
  return realm;
};

// 断开数据库
export const closeDB = (key?: string) => {
  if (key && DBs[key]) {
    DBs[key].close();
    delete DBs[key];
  } else {
    Object.values(DBs).forEach((db) => db && db.close());
    DBs = {};
  }
};
