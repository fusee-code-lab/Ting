import type { Database } from 'better-sqlite3';

// 获取数据库版本
export const getDbVersion = (db: Database): number | 'not' => {
  try {
    const result = db.prepare('PRAGMA user_version').get() as Object;
    return result['user_version'];
  } catch (error) {
    return 'not';
  }
};

// 设置数据库版本
export const setDbVersion = (db: Database, version: number) => {
  try {
    db.prepare(`PRAGMA user_version = ${version}`).run();
  } catch (error) {
    throw error;
  }
};

// 数据库迭代器
export const iterationMap = {
  0: (db: Database, key: string) => {
    setDbVersion(db, 1);
    iterationMap[1](db, key);
  },
  1: (db: Database, key: string) => {
    // 已是最新版本
  }
};
