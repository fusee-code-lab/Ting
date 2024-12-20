import { preload, windowLoad } from '@youliso/electronic/render';
import { render } from 'solid-js/web';
import routes from './routes';
import { getThemeSource } from './common/theme';
import './views/styles';
import './views/styles/index.css';
import { OS } from './store';
import { playlist_list_data_init } from './store/playlist';

preload.initialize();

document.documentElement.setAttribute('os-mode', OS);

windowLoad(async () => {
  await playlist_list_data_init();
  document.documentElement.setAttribute('theme', await getThemeSource());
  const View = routes[window.customize.route!];
  render(() => <View />, document.body);
});
