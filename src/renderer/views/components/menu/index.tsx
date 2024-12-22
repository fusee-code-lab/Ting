import { css } from '@emotion/css';
import Search from './search';
import { Playlist } from './inner/playlist';
import { OS } from '@/renderer/store';

const style = css`
  width: var(--menu-width);
  background-color: var(--menu-bg-color);
    
  > .head {
    height: var(--head-height);
    line-height: var(--head-height);
    padding: 0 10px;
    font-size: var(--size-xxxs);
  }
    
  > .mac-head {
      // 在 macos 下隐藏左上角的标题，否则和红绿灯按钮冲突
      visibility: hidden;
  }
    
  > .content {
    height: calc(100% - var(--head-height));
    padding: 0 12px;
    > .search {
    }
    > .items {
      padding-top: 12px;
      > .item {
        padding-top: 10px;
      }
    }
  }
`;

export default () => {
  const isMac = OS === 'mac';

  return (
    <div class={style}>
      <div class="head" classList={{ "mac-head": isMac }}>Ting</div>
      <div class="content">
        <Search class="search" />
        <Playlist />
      </div>
    </div>
  );
};
