import type { Database } from 'better-sqlite3';

// 获取数据库版本
export const getDbVersion = (db: Database): number | 'not' => {
  try {
    const result = db.prepare('PRAGMA user_version').get() as any;
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
export const iterationMap: { [key: string | number]: (db: Database, key: string) => void } = {
  'not': (db: Database, key: string) => {
    setDbVersion(db, 0);
    iterationMap[0](db, key);
  },
  0: (db: Database, key: string) => {
    // 已是最新版本
  }
};
