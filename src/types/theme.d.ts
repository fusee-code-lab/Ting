import type dark from '@/cfg/theme/dark';
import type light from '@/cfg/theme/light';

export type ThemeObj = (typeof dark | typeof light) & { accentColor: string };
