import { preload, windowLoad } from '@youliso/electronic/render';
import { render } from 'solid-js/web';
import routes from './routes';
import { getThemeSource } from './common/theme';
import './views/styles';
import './views/styles/index.css';
import { OS, store_init } from './store';

preload.initialize();

document.documentElement.setAttribute('os-mode', OS);

windowLoad(async () => {
  await store_init();
  document.documentElement.setAttribute('theme', await getThemeSource());
  const View = routes[window.customize.route!];
  render(() => <View />, document.body);
});
