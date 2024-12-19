import { css } from '@emotion/css';
import { ListData } from './list';
import { Show } from 'solid-js';
import { search_val } from '@/renderer/store/song';

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

export default () => {
  return (
    <>
      <SearchTitle />
      <ListData key="single" />
      <ListData key="playlist" />
    </>
  );
};
