import { css } from '@emotion/css';
import { Item, ItemTitle } from './inner/item';
import Search from '@/renderer/views/components/search';

const style = css`
  width: var(--menu-width);
  background-color: var(--menu-bg-color);
  > .head {
    height: var(--head-height);
    line-height: var(--head-height);
    padding: 0 10px;
    font-size: var(--size-xxxs);
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
  return (
    <div class={style}>
      <div class="head">Ting</div>
      <div class="content">
        <Search class="search" />
        <div class="items">
          <ItemTitle title="常听" />
          <Item class="item" title="送你一首歌，来年多喜乐！" />
        </div>
      </div>
    </div>
  );
};
