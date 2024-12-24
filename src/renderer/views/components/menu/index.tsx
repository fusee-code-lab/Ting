import { css, cx } from '@emotion/css';
import Search from './search';
import { Playlist } from './inner/playlist';
import { OS } from '@/renderer/store';
import { dragStyle } from '@/renderer/views/styles';

import setting_icon from '@/assets/icons/setting_btn.png';
import setting_icon2x from '@/assets/icons/setting_btn@2x.png';
import { set_content_route } from '@/renderer/store/content';

const style = css`
  --menu-height: 100px;
  width: var(--menu-width);
  background-color: var(--menu-bg-color);

  > .content {
    height: calc(100% - var(--head-height) - var(--menu-height));
    padding: 0 12px;
  }
  > .menu {
    padding: 0 0 20px 15px;
    height: var(--menu-height);
    display: flex;
    align-items: flex-end;
    --icon-size: 18px;
    > .icon {
      width: var(--icon-size);
      height: var(--icon-size);
      object-fit: contain;
    }
  }
`;

const menuHeadStyle = css`
  height: var(--head-height);
  line-height: var(--head-height);
  padding: 0 10px;
  font-size: var(--size-xxxs);
  width: 100%;
`;

const Setting = () => {
  return (
    <img
      class="icon"
      srcset={`${setting_icon} 1x, ${setting_icon2x} 2x`}
      src={setting_icon2x}
      onClick={() => set_content_route('setting')}
    />
  );
};

export default () => {
  const isMac = OS === 'mac';

  return (
    <div class={style}>
      <div class={cx(menuHeadStyle, dragStyle)}>{!isMac && 'Ting'}</div>
      <div class="content">
        <Search class="search" />
        <Playlist />
      </div>
      <div class="menu">
        <Setting />
      </div>
    </div>
  );
};
