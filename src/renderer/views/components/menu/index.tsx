import { css, cx } from '@emotion/css';
import Search from './search';
import { Playlist } from './inner/playlist';
import { OS } from '@/renderer/store';
import { dragStyle } from '@/renderer/views/styles';

const style = css`
  width: var(--menu-width);
  background-color: var(--menu-bg-color);
    
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

const menuHeadStyle = css`
    height: var(--head-height);
    line-height: var(--head-height);
    padding: 0 10px;
    font-size: var(--size-xxxs);
    width: 100%;
`

export default () => {
  const isMac = OS === 'mac';

  return (
    <div class={style}>
      <div class={cx(menuHeadStyle, dragStyle)}>
        {!isMac && "Ting"}
      </div>
      <div class="content">
        <Search class="search" />
        <Playlist />
      </div>
    </div>
  );
};
