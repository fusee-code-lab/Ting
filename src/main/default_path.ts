import { app } from 'electron';
import { mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

export const exitsFolder = async (path: string) => {
  try {
    await stat(path);
  } catch (error) {
    await mkdir(path);
  }
};

// 默认数据文件路径
export const defFilePath = join(app.getPath('documents'), 'Ting Files');

// 默认歌单路径
export const defPlaylistPath = join(app.getPath('music'), 'Ting Sheet');

// 默认下载路径
export const defDownloadPath = join(app.getPath('downloads'));

await Promise.all([exitsFolder(defFilePath), exitsFolder(defPlaylistPath)]);
