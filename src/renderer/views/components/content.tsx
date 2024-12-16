import { css } from '@emotion/css';
import Audio from './audio';
import SearchList from './search/list';

const style = css`
  position: relative;
  width: calc(100% - var(--menu-width));
  > .head {
    width: calc(100% - var(--event-width));
    height: var(--head-height);
    line-height: var(--head-height);
    padding: 0 10px;
    font-size: var(--size-xxxs);
  }
  > .content {
    height: calc(100% - var(--head-height) - var(--audio-height));
    overflow: hidden;
    overflow-y: auto;
  }
`;

export default () => {
  return (
    <div class={style}>
      <div class="head"></div>
      <div class="content">
        <SearchList />
      </div>
      <Audio />
    </div>
  );
};
