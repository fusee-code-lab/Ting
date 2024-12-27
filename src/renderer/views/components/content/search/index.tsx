import { css, cx } from '@emotion/css';
import { ListData } from './list';
import { Show } from 'solid-js';
import { search_val } from '@/renderer/store/song';
import { scrollYStyle } from '@/renderer/views/styles';

const searchTitleStyle = css`
  padding: 0 30px 15px;
  font-size: var(--size-lg);
  > .em {
    font-weight: 600;
    color: var(--blue-color);
  }
`;

const SearchTitle = () => (
  <Show when={!!search_val()}>
    <div class={searchTitleStyle}>
      <span class="em">“{search_val()}”</span> 的搜索结果
    </div>
  </Show>
);

const style = css`
  position: relative;
  height: 100%;
`;

export default () => {
  return (
    <div class={cx(style, scrollYStyle)}>
      <SearchTitle />
      <ListData key="single" />
      <ListData key="playlist" />
    </div>
  );
};
