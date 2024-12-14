import { preload, windowLoad } from '@youliso/electronic/render';
import { render } from 'solid-js/web';
import { HashRouter } from '@solidjs/router';
import router from './router';
import { getThemeSource } from './common/theme';
import './views/styles';

preload.initialize();

windowLoad(async () => {
  document.documentElement.setAttribute('theme', await getThemeSource());
  render(() => <HashRouter>{router(window.customize.route)}</HashRouter>, document.body);
});
