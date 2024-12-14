import { preload } from '@youliso/electronic/render';

export const getThemeSource = () => preload.invoke<string>('theme-source-get');
