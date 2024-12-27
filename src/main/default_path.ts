import { app } from 'electron';
import { mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const exitsFolder = (path: string) => {
  try {
    statSync(path);
  } catch (error) {
    mkdirSync(path);
  }
};

// 默认数据文件路径
export const defFilePath = join(app.getPath('documents'), 'Ting Files');

// 默认歌单路径
export const defPlaylistPath = join(app.getPath('music'), 'Ting Sheet');

// 默认下载路径
export const defDownloadPath = join(app.getPath('downloads'));

exitsFolder(defFilePath);
exitsFolder(defPlaylistPath);
