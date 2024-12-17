import { preload, windowLoad } from '@youliso/electronic/render';
import { render } from 'solid-js/web';
import { HashRouter } from '@solidjs/router';
import routes from './router';
import { getThemeSource } from './common/theme';
import './views/styles';

preload.initialize();

windowLoad(async () => {
  window.location.hash = `#${window.customize.route}`;
  document.documentElement.setAttribute('theme', await getThemeSource());
  render(() => <HashRouter>{routes}</HashRouter>, document.body);
});
