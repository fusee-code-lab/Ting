import type { Database } from 'better-sqlite3';
import BetterSqlite3 from 'better-sqlite3';
import { app } from 'electron';
import { statSync, mkdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { appDefPath } from '../device';
import { getDbVersion, iterationMap } from './iteration';

class DB {
  private static instance: DB;

  dbs: {
    [key: string]: Database;
  } = {};

  static getInstance() {
    if (!DB.instance) DB.instance = new DB();
    return DB.instance;
  }

  constructor() { }

  exitsFolder(path: string) {
    try {
      statSync(path);
    } catch (error) {
      mkdirSync(path);
    }
  }

  // 加载/创建数据库
  load(key: string, dbPath: string[]) {

    if (this.dbs[key]) return;
    let path = appDefPath;
    this.exitsFolder(path);
    dbPath.forEach((item) => {
      path = join(path, item);
      this.exitsFolder(path);
    });
    this.exitsFolder(path);
    const filePath = join(path, key);
    try {
      this.dbs[key] = new BetterSqlite3(filePath, {
        verbose: !app.isPackaged ? console.log : undefined
      });
      const version = getDbVersion(this.dbs[key]);
      console.log(`DB[${key}] Version :`, version);
      const iterationFunc = iterationMap[version];
      if (!iterationFunc) {
        throw new Error('Database version iteration failed');
      }
      iterationFunc(this.dbs[key], key, legacy_key);
    } catch (error: any) {
      if (error === 'DB rekey failed') {
        // 重建数据库
        try {
          this.close(key);
          unlinkSync(filePath);
          this.load(key, dbPath, legacy_key);
        } catch (error) {
          console.error(error);
          process.exit(1);
        }
        return;
      }
      throw error;
    }
  }

  // 断开数据库
  close(key?: string) {
    if (key && this.dbs[key]) {
      this.dbs[key].close();
      // @ts-ignore
      this.dbs[key] = null;
    } else {
      Object.keys(this.dbs).forEach((e) => this.dbs[e] && this.dbs[e].close());
      this.dbs = {};
    }
  }
}

export const DBInstance = DB.getInstance();
