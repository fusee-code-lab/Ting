import { app } from 'electron';
import { accessSync, constants } from 'node:fs';
import { resolve, join, normalize } from 'node:path';
import { preload } from '@youliso/electronic/main';

/**
 * 获取资源文件路径
 * 不传path返回此根目录
 * 断言通过返回绝对路径 (inside 存在虚拟路径不做断言)
 * */
export function resourcesPathGet(
  type: 'platform' | 'inside' | 'extern' | 'root',
  path: string = './',
  is_arch: boolean = true
): string {
  try {
    switch (type) {
      case 'platform':
        path = normalize(
          app.isPackaged
            ? resolve(
                join(__dirname, '..', '..', 'platform', (is_arch && process.platform) || '', path)
              )
            : resolve(join('resources', 'platform', (is_arch && process.platform) || '', path))
        );
        break;
      case 'inside':
        return (path = normalize(
          app.isPackaged
            ? resolve(join(__dirname, 'inside', path))
            : resolve(join('resources', 'inside', path))
        ));
      case 'extern':
        path = normalize(
          app.isPackaged
            ? resolve(join(__dirname, '..', 'extern', path))
            : resolve(join('resources', 'extern', path))
        );
        break;
      case 'root':
        path = normalize(
          app.isPackaged
            ? resolve(join(__dirname, '..', '..', path))
            : resolve(join('resources', 'root', path))
        );
        break;
    }
    accessSync(path, constants.R_OK);
    return path;
  } catch (err) {
    throw err;
  }
}

/**
 * 监听
 */
export function resourcesOn() {
  //获取依赖路径
  preload.handle('resources-path-get', (_, args) => {
    return resourcesPathGet(args.type, args.path, args.is_arch);
  });
}
