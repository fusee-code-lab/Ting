import { css, cx } from '@emotion/css';
import Input from '@/renderer/views/components/basis/input';
import { search } from '@/renderer/common/music';
import { set_search_val, set_song_search_list } from '@/renderer/store/song';
import { createSignal } from 'solid-js';
import { set_content_route } from '@/renderer/store/content';

const style = css`
  > input {
    width: 100%;
    font-size: var(--size-xxxs);
    &::-webkit-input-placeholder {
      font-size: var(--size-xxxs);
    }
  }
`;

const onSearch = async (val: string) => {
  const res = await Promise.all([search(val, 5, 1, 'single'), search(val, 5, 1, 'playlist')]);
  set_search_val(val);
  res[0] && set_song_search_list('single', res[0]);
  res[1] && set_song_search_list('playlist', res[1]);
  set_content_route('search_list');
};

export default (props: { class?: string }) => {
  const [val, set_val] = createSignal('');
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    const str = val();
    str && onSearch(str);
  };

  return (
    <div class={cx(style, props.class)}>
      <Input
        placeholder="搜索"
        value={val()}
        onInput={(e) => set_val((e.currentTarget as HTMLInputElement).value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
