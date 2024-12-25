import { getAppInfo } from '@youliso/electronic/render';
import { getOS } from '../common/utils';

export const OS = getOS();

export const appInfo = await getAppInfo();