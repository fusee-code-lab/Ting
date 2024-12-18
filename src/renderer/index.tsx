import { preload, windowLoad } from '@youliso/electronic/render';
import { render } from 'solid-js/web';
import routes from './routes';
import { getThemeSource } from './common/theme';
import './views/styles';
import './views/styles/index.css';

preload.initialize();

windowLoad(async () => {
  document.documentElement.setAttribute('theme', await getThemeSource());
  const View = routes[window.customize.route!];
  render(() => <View />, document.body);
});
